
export interface ServerObject {
	idObj: string
	value: any[]
	listeners: Listener[]
	actions: Action[]
}

export interface Listener {
	client: any
	lastVersion: number
}

export interface Action {
	/** qaulsiasi comando che permetta l'aggiornamento */
	command: any
	atVersion: number
	version: number
}

// MESSAGES
export interface ServerInitMessage {
	type: "s:init"
	idObj: string
	data: any[]
	version: number
}

export interface ServerUpdateMessage {
	type: "s:update"
	idObj: string
	actions: Action[]
	//version: number
}