import { Operation } from "slate"
import { ReactEditor } from "slate-react"
import { TextEditorStore } from ".."
import { sendCommands } from "../../../../plugins/docsService"
import { NODE_TYPES, NodeType } from "./types"



/** Implementazione specifca dell'editor SLATE **/
let updateTimeout: NodeJS.Timeout | null = null;

export const withSugar = (editor: ReactEditor) => {
	const se = editor as SugarEditor
	se.actionsDisabled = false
	/** lo store che contiene questo editor */
	se.store = null
	const { apply } = editor;

	editor.apply = (operation: Operation) => {
		// sincronizza con il server 
		sendCommands(se.store.state.docId, operation)
		apply(operation);
	};

	se.setTypeOnSelect = (type: NODE_TYPES) => {
		// Non fare nulla se non c'è una selezione o se la selezione è collassata
		if (!editor.selection) return;
		editor.setNodes<NodeType>({ type })
	}

	return se
}

export interface SugarEditor extends ReactEditor {
	store?: TextEditorStore
	actionsDisabled?: boolean
	setTypeOnSelect: (type: NODE_TYPES) => void
}