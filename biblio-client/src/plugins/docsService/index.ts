import { ClientMessage, ClientObject, ClientObjects, ClientUpdateMessage } from "@priolo/jess"
import { ApplyActions } from "@priolo/jess/dist/applicators/SlateApplicator"
import { normalizeBuffActions } from "../../stores/stacks/editor/utils/normalize"
import cws from "../SocketService"



export const clientObjects = new ClientObjects()

clientObjects.onSend = async (messages) => {
	const msgs: ClientMessage[] = []
	const msgsUp: { [idObj: string]: ClientUpdateMessage[] } = {}

	for (const message of messages) {
		if (message.type != "c:update") {
			msgs.push(message)
		} else {
			const idObj = message.idObj
			if (!msgsUp[idObj]) msgsUp[idObj] = []
			msgsUp[idObj].push(message)
		}
	}

	const messagesUpNorm: ClientUpdateMessage[] = []

	for (const idObj in msgsUp) {
		const messagesUp = msgsUp[idObj]
		const commands = messagesUp.map(msg => msg.action.command)
		const commandsNorm = normalizeBuffActions(commands)
		const messageUpNorm = commandsNorm.map<ClientUpdateMessage>((commandNorm, index) => ({
			type: "c:update",
			idObj: idObj,
			action: {
				idClient: messagesUp[0].action.idClient,
				counter: messagesUp[0].action.counter + index,
				command: commandNorm,
			}
		}))
		messagesUpNorm.push(...messageUpNorm)
	}

	const allMessages = msgs.concat(messagesUpNorm)
	cws.send(JSON.stringify(allMessages))

	console.log("socket::send", allMessages)
	return allMessages
}

clientObjects.apply = ApplyActions

export async function fetchDoc(docId: string): Promise<ClientObject> {
	let doc = clientObjects.objects[docId]
	if (!doc) {
		await clientObjects.init(docId, true)
		doc = clientObjects.objects[docId]
	}
	return doc
}
