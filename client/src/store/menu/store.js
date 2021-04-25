/* eslint eqeqeq: "off" */
import ajax from "../../plugins/AjaxService"



const store = {
	state: {
		all: [],
		bottom: [],
	},
	getters: {
	},
	actions: {
		fetch: async (state, _, store) => {
			const data = await ajax.get(`nodes`)
			store.setAll(data)
		}
	},
	mutators: {
		setAll: (state, all) => ({ all }),
	},
}

export default store