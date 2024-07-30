import { NodeType } from "../stores/stacks/editor/slate/types"
import { User } from "./User"


/** è un dcumento con il suo contenuto */
export interface Doc {
	id:string
	author: string
	updateAt: number
	title: string
	children: NodeType[]
}


/** aggiornamento DOC remoto*/
export interface RemoteDoc {
	doc: Doc
	actions?: Action[]
}

/** filtro richiesto per una lista di docs */
export interface FilterDoc {
	author: User,
}


/** tipo di azione da compiere */
export enum ACTION_VERB {
	ADD,
	MODIFY,
	MOVE,
	DELETE,
	TRIM
}

/** l'informazione da trasformare */
export interface NodeWithId {
	id?: string;
}
/** un Action di trasformazione */
export interface Action {
	verb: ACTION_VERB
	node?: NodeWithId
	position?: number
}



