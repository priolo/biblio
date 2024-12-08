import { clientObjects } from "../docsService/index.js";
import { Reconnect } from "./reconnect.js";
import { SocketOptions } from "./types.js";



/**
 * Crea una connessione WS
 */
export class SocketService {

	options: SocketOptions;
	websocket: WebSocket;
	// modulo per la riconnessione
	reconnect: Reconnect;

	constructor(options: SocketOptions) {
		this.options = options
		this.websocket = null
		this.reconnect = new Reconnect(this)
	}

	/** 
	 * tenta di aprire il socket
	 */
	connect() {
		if (this.websocket) return
		const { protocol, host, port, base } = this.options
		this.reconnect.enabled = true
		try {
			let url = `${protocol}//${host}:${port}/`
			if (base) url = `${url}/${base}`
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
	}

	/** 
	 * chiude il socket e mantiene chiuso (usato nel logout)
	 */
	disconnect() {
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
		//this.onOpen?.()
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
		console.log("socket::receive", JSON.parse(e.data))
		clientObjects.receive(e.data)
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
