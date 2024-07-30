import viewSetup, { ViewState, ViewStore } from "@/stores/stacks/viewBase"
import { debounce } from "@/utils/time"
import { mixStores, StoreCore } from "@priolo/jon"
import { createEditor } from "slate"
import { withHistory } from 'slate-history'
import { withReact } from "slate-react"
import { EditorState } from "../editorBase"
import { getActionsFromDocDiff } from "../../../plugins/docsService/actions"
import { NODE_TYPES, NodeType, isNodeEq } from "./slate/types"
import { Doc, RemoteDoc } from "@/types/Doc"
import { SugarEditor, withSugar } from "./slate/withSugar"
import { DragDoc } from "@priolo/jack/dist/stores/mouse/utils"
import { IdbLoadData } from "../../../utils/session/indexeddb"
import docApi from "../../../api/doc"
import { fetchDoc, updateDoc } from "../../../plugins/docsService"



const setup = {

	state: {
		/** Doc corrente in editor */
		doc: <Partial<Doc>>null,
		/** SLATE editor */
		editor: <SugarEditor>null,
		/** aggiornamento rispetto il remoto */
		remote: <RemoteDoc>null,

		//formatOpen: false,

		//#region VIEWBASE
		width: 370,
		widthMax: 1000,
		//#endregion
	},

	getters: {
		//#region VIEWBASE
		getTitle: (_: void, store?: ViewStore) => "NOTE",
		getSubTitle: (_: void, store?: ViewStore) => "Just for an ephemeral note",
		getSerialization: (_: void, store?: ViewStore) => {
			const state = store.state as TextEditorState
			return {
				...viewSetup.getters.getSerialization(null, store),
				doc: {
					...state.doc,
					children: state.editor.children
				},
			}
		},
		//#endregion
	},

	actions: {

		//#region VIEWBASE

		onDrop: (data: DragDoc, store?: ViewStore) => {
			const editorSo = store as TextEditorStore
			const editor = editorSo.state.editor
			if (!data.source?.view) return

			if (data.source.view == data.destination?.view) {
				editor.moveNodes({ at: [data.source.index], to: [data.destination.index] })

			} else {
				if (data.source.index) {
					const sourceEditor = (<TextEditorStore>data.source.view).state.editor
					if (!sourceEditor) return
					const [node] = sourceEditor.node([data.source.index])
					editor.insertNode(node, { at: [data.destination.index] })
				} else {
					// cotruisco un NODE da una VIEW
					const node = {
						type: NODE_TYPES.CARD,
						data: data.source.view.getSerialization(),
						subtitle: data.source.view.getSubTitle(),
						children: [{ text: data.source.view.getTitle() }],
					}
					editor.insertNode(node, { at: [data.destination.index] })
				}
			}
		},

		onCreated: (_: void, store?: ViewStore) => {
			const editorSo = store as TextEditorStore
			const editor: SugarEditor = withSugar(withHistory(withReact(createEditor())))
			editor.insertNodes(initValue)
			editor.view = store
			editorSo.state.editor = editor
		},

		setSerialization: (data: any, store?: ViewStore) => {
			viewSetup.actions.setSerialization(data, store)
			const state = store.state as TextEditorState
			state.doc = data.doc

			state.editor.withoutNormalizing(() => {
				state.editor.removeNodes({ at: { anchor: state.editor.start([]), focus: state.editor.end([]), } })
				state.editor.insertNodes(state.doc.children ?? [], { at: [0] })
			})

			state.doc.children = null

			// IdbLoadData(store.state.uuid).then(editorData => {
			// 	state.editor.delete({
			// 		at: { anchor: state.editor.start([]), focus: state.editor.end([]) },
			// 	});
			// 	state.editor.insertNodes(editorData, { at: [0] });
			// })
		},

		//#endregion

		fetch: async (_: void, store?: TextEditorStore) => {
			const remote: RemoteDoc = await fetchDoc(store.state.doc.id)
			store.state.editor.withoutNormalizing(() => {
				store.state.editor.removeNodes({ at: { anchor: store.state.editor.start([]), focus: store.state.editor.end([]), } })
				store.state.editor.insertNodes(remote.doc.children ?? [], { at: [0] });
			})
		},

		onValueChange: (_: void, store?: TextEditorStore) => {
			debounce("doc-change", () => {
				updateDoc({
					id: store.state.doc.id,
					children: store.state.editor.children as NodeType[]
				})
				// //console.log("handleValueChange", store.state.editor.children)
				// //const state = store.state as TextEditorState
				// //IdbSaveOrUpdateData(store.state.uuid, state.editor.children)
				// const actions = getActionsFromDocDiff(
				// 	store.state.editor.children as NodeType[],
				// 	store.state.remote.children,
				// 	isNodeEq
				// )
				// store.state.remote.actions = actions
				// //store.state.editor.children = current as Descendant[]
				// console.log(actions)
				// //console.log(store.state.editor.children)
			}, 1000)
		},

		fromLocalRemote: (_: void, store?: TextEditorStore) => {
			//store.state.editor.insertNodes(store.state.remote)
		},

	},

	mutators: {
		setFormatOpen: (formatOpen: boolean) => ({ formatOpen }),
	},
}

export type TextEditorState = typeof setup.state & ViewState & EditorState
export type TextEditorGetters = typeof setup.getters
export type TextEditorActions = typeof setup.actions
export type TextEditorMutators = typeof setup.mutators
export interface TextEditorStore extends ViewStore, StoreCore<TextEditorState>, TextEditorGetters, TextEditorActions, TextEditorMutators {
	state: TextEditorState
}
const txtEditorSetup = mixStores(viewSetup, setup)
export default txtEditorSetup

const initValue = [{ type: NODE_TYPES.TEXT, children: [{ text: "" }] }]
// const initValue = [
// 	{
// 		type: NODE_TYPES.CHAPTER,
// 		children: [{ text: "Dibattito sull'essere umano e le sue interazioni col mondo" }],
// 	},
// 	{
// 		type: NODE_TYPES.PARAGRAPH,
// 		children: [{ text: "Il primo scontro: il conetto dello spurgo" }],
// 	},
// 	{
// 		type: NODE_TYPES.TEXT,
// 		children: [{ text: "Vorrei sottolineare in questa occasione che l'alalisi è stata condotta su topi e non su veri esseri umani\nMa il concetto è lo stesso dai cioe' c'hanno entrambi la bocca no?" }],
// 	},
// 	{
// 		type: NODE_TYPES.PARAGRAPH,
// 		children: [{ text: "Raccontiamoci" }],
// 	},
// 	{
// 		type: NODE_TYPES.TEXT,
// 		children: [{ text: "In questo capitolo aaaa no è un paragrafo! Ok, in questo \"paragrafo\" mi preme qualcosa da dire ma non la dirò per evitare di attivare quel discorso che ci porterebbe al punto 23." }],
// 	},
// 	{
// 		type: NODE_TYPES.TEXT,
// 		children: [{ text: "Questo è un codice di esempio:" }],
// 	},

// 	{
// 		type: NODE_TYPES.CODE,
// 		children: [{ text: "{ pippo: 45, serafino: 'update' }" }],
// 	},

// ]

