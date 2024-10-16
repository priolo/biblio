import { BaseOperation, createEditor, Descendant, withoutNormalizing } from "slate"
import { NODE_TYPES } from "../../stores/stacks/editor/slate/types"

/** normalizzo un array di ACTIONs 
 * set_selection 
 * 		se ci sono solo selezioni non mandare nulla
 * 		elimina tutte le selezioni a parte l'ultima
 * insert_text
 * 		accorpare tutti gli insert-text in serie
 * remove_text 
 * 		eliminare la proprietà "text"
*/
export function normalizeBuffActions(actions: BaseOperation[]) {
	if (!actions) return []
	let norm = []
	let indexLastSelection = -1

	for (let index = 0; index < actions.length; index++) {
		const action = actions[index]
		const prevAction: any = actions[index - 1]
		const lastNorm = norm[norm.length - 1]

		switch (action.type) {
			// se anche il precedente era un "insert_text" allora mergio
			case "insert_text":
				if (lastNorm?.type == "insert_text" && action.path[0] == lastNorm?.path?.[0] /*&& action.offset+1 == lastNorm.offset*/) {
					lastNorm.text += action.text
					continue
				}
				break
			
			// se è una "set_selection" allora la salvo come ultima
			case "set_selection":
				indexLastSelection = norm.length
				break

			// se anche il precedente era un "remove_text" allora mergio
			case "remove_text":
				if (lastNorm?.type == "remove_text" && action.path[0] == prevAction?.path[0] /*&& action.offset+1 == lastNorm.offset*/) {
					// sto effettuando una cancellazione all'indietro
					if (action.offset + 1 == prevAction.offset) {
						lastNorm.offset = action.offset
						lastNorm.text = action.text + lastNorm.text
						continue
					}
					if (action.offset == prevAction.offset) {
						lastNorm.text = lastNorm.text + action.text
						continue
					}
				}

				break
		}

		norm.push({ ...action })
	}

	// semplifico le selezioni. mantengo solo l'ultima
	if (indexLastSelection != -1) {
		norm[indexLastSelection].properties = null
		norm = norm.filter((action, index) => action.type != "set_selection" || index == indexLastSelection)
	}

	return norm
}

/** applico una serie di operazioni ai "children" di un doc */
export function applyOperations(actions: BaseOperation[], initialValue?: Descendant[]): Descendant[] {
	const editor = createEditor();
	editor.children = initialValue ?? [{ type: NODE_TYPES.TEXT, children: [{ text: "" }] }];
	withoutNormalizing(editor, () => {
		actions.forEach(op => {
			editor.apply(op);
		})
	})
	return editor.children;
}

//https://docs.slatejs.org/v/v0.47/slate-core/operation#invert      