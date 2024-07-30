import { BaseOperation, Editor, Element, Node, Range, Transforms } from "slate"
import { NODE_TYPES, NodeType } from "./types"
import { ReactEditor } from "slate-react"
import { ViewStore } from "../../viewBase"
import { generateUUID } from "../../../../utils/object"

/**

 */
export const withSugar = (editor: ReactEditor) => {

	//const { onChange/*normalizeNode, isInline, isVoid*/ } = editor
	//const { insertNode, insertFragment } = editor;
	//const { insertData } = editor
	const se = editor as SugarEditor


	const { apply } = editor;

	editor.apply = operation => {
		switch (operation.type) {
			case "insert_node":
				(operation.node as NodeType).id = generateUUID()
				break
			case "split_node":
				if (operation.position == 1 && operation.path?.length == 1) {
					(<Partial<NodeType>>operation.properties).id = generateUUID()
				}
				break
		}
		console.log(operation)
		apply(operation);
	};

	// const { normalizeNode } = editor

	// editor.normalizeNode = entry => {
	// 	const [node, path] = entry

	// 	// // If the element is a paragraph, ensure its children are valid.
	// 	if (Element.isElement(node)) {
	// 		console.log(entry)
	// 		const nodeType = node as NodeType
	// 		if (nodeType.id == null) nodeType.id = generateUUID()
	// 		// 	for (const [child, childPath] of Node.children(editor, path)) {
	// 		// 		if (Element.isElement(child) && !editor.isInline(child)) {
	// 		// 			Transforms.unwrapNodes(editor, { at: childPath })
	// 		// 			return
	// 		// 		}
	// 		// 	}
	// 	}

	// 	// Fall back to the original `normalizeNode` to enforce other constraints.
	// 	normalizeNode(entry)
	// }

	// se.onChange =  (
	// 	options?: {operation?: BaseOperation}
	// ) => {
	// 	onChange(options)
	// }

	/**
	 * Elimino i BLOCKs selezionati, li unisco in un unico TYPE e li reinserisco
	 */
	se.setTypeOnSelect = (type: NODE_TYPES) => {
		// Non fare nulla se non c'è una selezione o se la selezione è collassata
		if (!editor.selection) return;

		const selectA = editor.selection.anchor.path[0]
		const selectB = editor.selection.focus.path[0]
		const split = type != NODE_TYPES.TEXT
		const onlySelect = type == NODE_TYPES.TEXT
		const merge = type == NODE_TYPES.CODE

		// non devo eseguire il merge...
		if (!merge) {
			const node: Partial<NodeType> = { type }
			Transforms.setNodes(
				editor,
				node,
				{
					match: n => !Editor.isEditor(n) && Element.isElement(n),
					split,
					at: onlySelect ? undefined : [selectA]
				},
			)
			return
		}

		// prendo tutti i TEXT presenti nella selection
		const textsGen = Node.texts(editor, {
			from: [Math.min(selectA, selectB)],
			to: [Math.max(selectA, selectB)],
		})
		// se true prende del NODE solo la proprietà "text" altrimenti tutto
		const onlyText = type == NODE_TYPES.CODE //|| type == BLOCK_TYPE.IMAGE
		// mergio tutti i TEXT
		const texts = [...textsGen].map((textEntry, index, array) => {
			const textNode = textEntry[0]
			const endline = index < array.length - 1 ? "\n" : ""
			const text = `${textNode.text}${endline}`
			return { ...(onlyText ? {} : textNode), text }
		})
		// creo il nuovo node
		const node = { type, children: texts }
		// rimuovo i vecchi NODE
		Transforms.removeNodes(editor)
		// inserisco al loro posto il nuovo NODE
		Transforms.insertNodes(editor, node, {
			select: true, hanging: true, voids: true, mode: "highest",
		})
	}


	// editor.insertData = (data) => {
	// 	const fnOrigin = insertData(data)
	// 	// if (!fnOrigin) return null

	// 	// const text = data.getData('text/plain')
	// 	// if (eq.isUrl(text)) {
	// 	// 	Editor.insertNode(editor, {
	// 	// 		type: BLOCK_TYPE.TEXT, 
	// 	// 		children: [{ 
	// 	// 			link: true,
	// 	// 			text: text, 
	// 	// 			url: text,
	// 	// 		}]
	// 	// 	})
	// 	// 	return null
	// 	// }
	// 	return fnOrigin
	// }

	// editor.insertNode = (node) => {
	// 	debugger
	// 	//if (node.type === 'paragraph') {
	// 		node.id = null; // Set the id to null for new paragraph nodes
	// 	//}
	// 	insertNode(node);
	// };

	// editor.insertFragment = (fragment) => {
	// 	debugger
	// 	fragment.forEach(node => {
	// 		//if (node.type === 'paragraph') {
	// 			node.id = null; // Set the id to null for new paragraph nodes
	// 		//}
	// 	});
	// 	insertFragment(fragment);
	// };

	return se
}


export interface SugarEditor extends ReactEditor {
	view?: ViewStore
	setTypeOnSelect: (type: NODE_TYPES) => void
}