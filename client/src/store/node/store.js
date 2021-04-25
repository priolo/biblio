/* eslint eqeqeq: "off" */
import ajax from "../../plugins/AjaxService";


const store = {
	state: {
		all: [],
	},
	getters: {
	},
	actions: {
		async fetchAll(state, payload, store) {
			const response = await ajax.get("nodes");
			debugger
			store.setRoot(response)
		},
		// async fetchById(state, id, store) {
		// 	const response = await ajax.get(`node/${id}`)
		// 	store.setSelect(response)
		// },
	},
	mutators: {
		setAll: (state, all) => ({ all }),
	},
}

export default store

