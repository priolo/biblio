import { COLOR_VAR } from "@/stores/layout"
import { Log } from "@/stores/log/utils"
import viewSetup, { ViewStore } from "@/stores/stacks/viewBase"
import { StoreCore, mixStores } from "@priolo/jon"
import { ViewState } from "../viewBase"



const setup = {

	state: {
		//#region VIEWBASE
		colorVar: COLOR_VAR.GENERIC,
		pinnable: false,
		//#endregion
	},

	getters: {
		//#region VIEWBASE
		getTitle: (_: void, store?: ViewStore) => "USER",
		getSubTitle: (_: void, store?: ViewStore) => "YOU",
		getSerialization: (_: void, store?: ViewStore) => {
			const state = store.state as UserState
			return {
				...viewSetup.getters.getSerialization(null, store),
			}
		},
		//#endregion
	},

	actions: {
		//#region VIEWBASE
		setSerialization: (data: any, store?: ViewStore) => {
			viewSetup.actions.setSerialization(data, store)
		},
		//#endregion

		select (log:Log, store?:UserStore ) {
			store.state.group.focus(store.state.group.getById(log.targetId))
		},
	},

	mutators: {
	},
}

export type UserState = typeof setup.state & ViewState
export type UserGetters = typeof setup.getters
export type UserActions = typeof setup.actions
export type UserMutators = typeof setup.mutators
export interface UserStore extends ViewStore, StoreCore<UserState>, UserGetters, UserActions, UserMutators {
	state: UserState
}
const userSetup = mixStores(viewSetup, setup)
export default userSetup


