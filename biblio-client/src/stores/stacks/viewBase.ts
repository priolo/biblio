import { viewSetup, ViewStore } from "@priolo/jack"
import { buildStore } from "../docs/utils/factory"
import { LISTENER_CHANGE } from "@priolo/jon"
import { DOC_TYPE } from "../docs/types"
import { socketPool } from "../../plugins/SocketService/pool"
export type { ViewState, ViewStore, ViewMutators } from "@priolo/jack"



const setSerializationBase = viewSetup.actions.setSerialization

viewSetup.actions.setSerialization = (state: any, store?: ViewStore) => {
	setSerializationBase(state, store)

	// recursion
	const linkedState = state.linked
	if (!!state.linked) delete state.linked
	if (linkedState) {
		const linkedStore = buildStore({ type: linkedState.type, group: store.state.group })
		linkedStore.setSerialization(linkedState)
		store.setLinked(linkedStore)
		linkedStore.onLinked()
	}
}

// viewSetup.onListenerChange = (store: ViewStore, type: LISTENER_CHANGE) => {
// 	if (store._listeners.size == 1 && type == LISTENER_CHANGE.ADD) {
// 		const cnnId = store.state.type == DOC_TYPE.CONNECTION ? store.state["connection"]?.id : store.state["connectionId"]
// 		if (cnnId) socketPool.create(`global::${cnnId}`, cnnId)
// 	} else if (store._listeners.size == 0) {
// 		const cnnId = store.state.type == DOC_TYPE.CONNECTION ? store.state["connection"]?.id : store.state["connectionId"]
// 		if (cnnId) socketPool.destroy(`global::${cnnId}`)
// 		store["fetchAbort"]?.()
// 	}
// }

export default viewSetup

