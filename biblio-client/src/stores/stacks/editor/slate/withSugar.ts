import { Operation } from "slate"
import { ReactEditor } from "slate-react"
import { TextEditorStore } from ".."
import { clientObjects } from "../../../../plugins/docsService"
import { NODE_TYPES, NodeType } from "./types"



/** Implementazione specifca dell'editor SLATE **/
let updateTimeout: NodeJS.Timeout | null = null;

export const withSugar = (editor: ReactEditor) => {
	const se = editor as SugarEditor
	se.actionsDisabled = false
	/** lo store che contiene questo editor */
	se.store = null
	const { apply} = editor;

	editor.apply = (operation:Operation) => {
		// sincronizza tutto quello che NON è un operazione di selezione
		if ( !Operation.isSelectionOperation(operation) ) {
			console.log("operation:", operation)
			clientObjects.command(se.store?.state.docId, operation)

			if (updateTimeout) clearTimeout(updateTimeout)
			updateTimeout = setTimeout(() => clientObjects.update(), 1000)
		}
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