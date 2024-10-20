import { IClient } from "typexpress/dist/services/ws/utils.js"
import { ApplyAction } from "./SlateApplicator.js"
import { Action, ApplyActionFunction, ClientInitMessage, ClientUpdateMessage, Listener, ServerInitMessage, ServerObject, ServerUpdateMessage } from "./types.js"



export class ServerObjects {

	apply: ApplyActionFunction = ApplyAction
	onSend: (client: any, message: ServerUpdateMessage | ServerInitMessage) => Promise<void> = null
	objects: { [idObj: string]: ServerObject } = {}

	/** invia a tutti i client le azioni mancanti in maniera da aggiornarli */
	update() {
		for (const idObj in this.objects) {
			const data = this.objects[idObj]
			const lastVersion = data.actions[data.actions.length - 1]?.version ?? 0
			data.listeners.forEach(async listener => {

				/** il client è gi' aggiornato all'ultima versione */
				if (listener.lastVersion == -1 || listener.lastVersion == lastVersion) return

				/** tutti gli actions da inviare al listener */
				const actions = data.actions.filter(action => action.version > listener.lastVersion)
				const msg: ServerUpdateMessage = {
					type: "s:update",
					idObj: data.idObj,
					actions,
					//version: lastVersion
				}

				this.sendToListener(msg, listener, lastVersion)
			})
		}
	}

	private async sendToListener(msg: ServerUpdateMessage, listener: Listener, lastVersion: number) {
		let oldVersion = listener.lastVersion
		try {
			listener.lastVersion = -1
			await this?.onSend(listener.client, msg)
			listener.lastVersion = lastVersion
			console.log( "sendToListener", listener.client.remotePort, msg)
		} catch (error) {
			console.error(error)
			listener.lastVersion = oldVersion
		}
	}

	/** riceve un messaggio dal client */
	receive(messageStr: string, client: any) {
		console.log("receive", messageStr)
		
		const message = JSON.parse(messageStr)
		switch (message.type) {

			case "c:init": {
				const msgInit = message as ClientInitMessage
				const data = this.getObject(msgInit.payload.idObj, client)
				// invio lo stato iniziale
				const msg: ServerInitMessage = {
					type: "s:init",
					idObj: data.idObj,
					data: [...data.value],
					version: data.actions[data.actions.length - 1]?.version ?? 0
				}
				this.onSend(client, msg)
				break
			}

			case "c:update": {
				const msgUp = message as ClientUpdateMessage
				this.updateFromCommand(msgUp.payload.idObj, msgUp.payload.command, msgUp.payload.atVersion)
				break
			}
		}
	}
	
	/** disconnette un client */
	disconnect(client: IClient) {
		for (const idObj in this.objects) {
			const data = this.objects[idObj]
			const listener = data.listeners.find(l => l.client == client)
			if (listener) {
				data.listeners = data.listeners.filter(l => l != listener)
			}
		}
	}

	/** recupera/crea un OBJ (assegno il listener "client") */
	private getObject(idObj: string, client: any): ServerObject {
		let data = this.objects[idObj]

		if (!data) {
			data = {
				idObj,
				value: this.apply(),
				listeners: [{ client, lastVersion: 0 }],
				actions: []
			}
			this.objects[idObj] = data

		} else if (!data.listeners.some(l => l.client == client)) {
			data.listeners.push({
				client,
				lastVersion: data.actions[data.actions.length - 1]?.version ?? 0
			})
		}

		return data
	}

	/** aggiorno l'OBJ con un command (generico)*/
	private updateFromCommand(idObj: string, command: any, atVersion: number) {
		const objShared = this.objects[idObj]
		if (!objShared) return
		const act: Action = {
			command,
			atVersion,
			version: objShared.actions.length + 1
		}
		// se atVerson == version -1 allora è un comando che non non deve essere mandato a chi lo ha inviato quindi il lastversion de client che ha mandato questo messaggio lo si aggiorna a quello attuale in maniera che non lo manda appunto
		objShared.actions.push(act)
		objShared.value = this.apply(objShared.value, act)
	}
}