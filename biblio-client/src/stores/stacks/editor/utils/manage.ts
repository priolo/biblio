import { GetAllCards } from "@/stores/docs/cards";
import { forEachViews } from "@/stores/docs/utils/manage";
import { Editor, Node, Path, Point, Transforms } from "slate";
import { TextEditorStore } from "..";
import { ViewStore } from "../../viewBase";
import { NODE_TYPES, NodeType } from "../slate/types";
import { SugarEditor } from "../slate/withSugar";



export function findCardPathsByUuid(editor: SugarEditor, uuid: string) {
	if (!editor || !uuid) return []
	const match = (node: NodeType) => node.type != NODE_TYPES.CARD && node.data.uuid == uuid
	const gen = editor.nodes({ at: [], match })
	return [...gen].map(ne => ne[1])
}

type Position = {
	view: ViewStore,
	paths?: Path[],
}

export function findUuidInViews(views: ViewStore, uuid: string): Position {
	return forEachViews<Position>(
		GetAllCards(),
		view => {
			if (view.state.uuid == uuid) return { view }
			const paths = findCardPathsByUuid((<TextEditorStore>view).state.editor, uuid)
			if (paths.length > 0) return { view, paths }
			return null
		}
	)
}



/**
 * Aggiorna il contenuto di un editor con un nuovo array di children
 */
export function updateEditorChildren(editor: Editor, newChildren: any[]) {
	Editor.withoutNormalizing(editor, () => {
		editor.children = newChildren;
		if (!editor.selection) return;
		const { anchor, focus } = editor.selection;
		const adjustedAnchor = adjustPoint(editor, anchor);
		const adjustedFocus = adjustPoint(editor, focus);
		if (adjustedAnchor && adjustedFocus) {
			Transforms.select(editor, { anchor: adjustedAnchor, focus: adjustedFocus });
		}
	})
}

/**
 * mi assicuro che un Point non esca fuori dal contenuto di un Editor
 */
function adjustPoint(editor: Editor, point: Point): Point {
	const indexMax = editor.children.length - 1
	if (point.path[0] > indexMax) return {
		offset: 0,
		path: [indexMax,0]
	}
	const [node] = Editor.node(editor, point.path);
	const textLength = Node.string(node).length;
	return {
		path: point.path,
		offset: Math.min(point.offset, textLength)
	};
}