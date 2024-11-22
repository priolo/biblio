import { createEditor, Operation, Transforms, withoutNormalizing } from "slate";
import { Action } from "./types.js";



export function ApplyAction(data?: any[], action?: Action): any[] {
	const editor = createEditor();
	if (!data || data.length === 0) data = [{ children: [{ text: '' }] }];
	editor.children = data;
	if (!action) return editor.children;

	withoutNormalizing(editor, () => {
		//actions.forEach(op => {
		if (Operation.isSelectionOperation(action.command)) {
			console.log("discard", action.command)
			return
		}
		// if (action.command.type === 'set_selection' && !editor.selection) {
		// 	// Imposta una selezione di default se non c'è una selezione corrente
		// 	Transforms.select(editor, { anchor: { path: [0, 0], offset: 0 }, focus: { path: [0, 0], offset: 0 } });
		// 	return
		// }
		editor.apply(action.command);
		//})
	})
	return editor.children;
}