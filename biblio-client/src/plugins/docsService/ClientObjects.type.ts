
export interface Action {
	/** qaulsiasi comando che permetta l'aggiornamento */
	command: any
	atVersion: number
	version: number
}


export interface ClientObject {
	idObj: string
	value: any[]
	version: number
}

// MESSAGES
export interface ClientInitMessage {
	type: "c:init"
	payload: {
		idObj: string
	}
}

export interface ClientUpdateMessage {
	type: "c:update"
	payload: {
		idObj: string, // id dell'Obj
		atVersion: number,
		command: any,
	}
}



export type ApplyActionFunction = (data: any[], action: Action) => any[];