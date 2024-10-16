import logSo from "@/stores/log/index.js";
import { Reconnect } from "./reconnect.js";
import { MSG_TYPE, Payload, PayloadError, PayloadMessage, PayloadStatus, SocketMessage, SocketOptions } from "./types.js";
import { MESSAGE_TYPE } from "@/stores/log/utils.js";
import { optionsDefault } from "./utils.js";



/**
 * Crea una connessione WS
 * gestisce le riconnessioni
 * gestisce la tabella dei COMMANDS
 */
export class SocketService {

	options: SocketOptions;
	websocket: WebSocket;
	// l'ultimo id connection utilizzato per la connessione WS
	cnnId: string = null
	// modulo per la riconnessione
	reconnect: Reconnect;

	// callback su apertura connessione
	onOpen: () => void = null
	// callback su arrivo messaggio
	onMessage?: (message: PayloadMessage) => void
	onStatus?: (payload: PayloadStatus) => void
	onError?: (error: PayloadError) => void

	constructor(options: SocketOptions = {}) {
		this.options = { ...optionsDefault, ...options }
		this.websocket = null
		this.reconnect = new Reconnect(this)
	}

	/** 
	 * tenta di aprire il socket
	 */
	connect(connId: string = this.cnnId) {
		if (this.websocket) return
		this.cnnId = connId
		const { protocol, host, port, base } = this.options
		this.reconnect.enabled = true
		try {
			let url = `${protocol}//${host}:${port}/`
			if (base) url = `${url}/${base}`
			if (connId) url = `${url}?id=${connId}`
			this.websocket = new WebSocket(url);
		} catch (error) {
			this.reconnect.start()
			console.error(error)
			return
		}

		this.websocket.onopen = this.handleOpen.bind(this);
		this.websocket.onclose = this.handleClose.bind(this);
		this.websocket.onmessage = this.handleMessage.bind(this);
		this.websocket.onerror = this.handleError.bind(this);
	}

	/** 
	 * libera tutte le risorse
	 */
	clear(newCnnId: string = null) {
		if (!this.websocket) return
		this.websocket.close()
		this.websocket = null
		if (newCnnId) this.cnnId = newCnnId
	}

	/** 
	 * chiude il socket e mantiene chiuso (usato nel logout)
	 */
	disconnect() {
		this.cnnId = null
		this.reconnect.enabled = false
		this.reconnect.stop()
		this.clear()
	}

	/** 
	 * invia un messaggio al server
	 */
	send(msg: string) {
 		this.websocket.send(msg)
	}


	//#region SOCKET EVENT

	handleOpen(_: Event) {
		//console.log("socket:open")
		this.reconnect.stop()
		this.reconnect.tryZero()
		this.onOpen?.()
		//changeConnectionStatus(this.cnnId, CNN_STATUS.RECONNECTING)
	}

	handleClose(_: CloseEvent) {
		//console.log("socket:close")
		this.clear()
		this.reconnect.start()
		//changeConnectionStatus(this.cnnId, CNN_STATUS.RECONNECTING)
	}

	/** ricevo un messaggio dal BE */
	handleMessage(e: MessageEvent) {
		const message = JSON.parse(e.data)
		
	}

	handleError(e: Event) {
	}

	//#endregion
}


const cws = new SocketService({
	protocol: window.location.protocol == "http:" ? "ws:" : "wss:",
	host: window.location.hostname,
	port: 3000, //import.meta.env.VITE_API_WS_PORT ?? window.location.port,
	base: "",
})
cws.connect()
export default cws



interface SharedMem {
	[sharedArrayId: string]: SharedArray
}

interface SharedArray {
	value: any[]
	id: string
	ActionsBuffer: CwsAction[]
}

interface CwsAction {
	type: string
	index: number
}

interface CwsMessage {
	action: CwsAction
}

const sharedMem: SharedMem = {}