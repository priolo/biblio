import docApi from "../../api/doc";
import { isNodeEq, NodeType } from "../../stores/stacks/editor/slate/types";
import { getActionsFromDocDiff } from "./actions";
import { Doc, RemoteDoc } from "../../types/Doc";



const library: { [id: string]: RemoteDoc } = {}



export async function fetchDoc(id: string): Promise<RemoteDoc> {
	let remote: RemoteDoc = library[id]
	if (!!remote) return remote
	const doc = (await docApi.get(id))?.data
	if (!doc) return null
	return library[id] = remote = { doc }
}


export async function updateDoc(local: Partial<Doc>) {
	const remote = await fetchDoc(local.id)
	const actions = getActionsFromDocDiff(
		local.children as NodeType[],
		remote.doc.children,
		isNodeEq
	)
	//store.state.remote.actions = actions
	//store.state.editor.children = current as Descendant[]
	console.log(actions)
}

