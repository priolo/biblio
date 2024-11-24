import { createEditor } from "slate";
import { describe, expect, it } from "vitest";
import { updateEditorChildren } from "./manage";



describe('utils for SUGAR EDITOR', () => {

	it('mantieni la selezione anel contenuto', () => {
		 const editor = createEditor()
		// inserisco due righe
		editor.children =[
			{ children: [{ text: 'Hello' }] },
			{ children: [{ text: 'World' }] },
		]
		// selezion due righe
		editor.setSelection({
			anchor: { path: [0, 0], offset: 0 },
			focus: { path: [1, 0], offset: 3 }
		})
		// aggiorno a una sola riga
		updateEditorChildren(editor, [
			{ children: [{ text: 'Hello' }] },
		])


		expect(editor.selection).toEqual({
			anchor: { path: [0, 0], offset: 0 },
			focus: { path: [0, 0], offset: 0 }
		})
	})
});
