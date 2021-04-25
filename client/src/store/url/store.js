/* eslint eqeqeq: "off"*/


const store = {
	state: {
		url: "",
	},
	getters: {

		getSearchUrl: (state, name, store) => {
			const searchParams = new URLSearchParams(window.location.search)
			return (searchParams.get(name) ?? "")
		},

		getHash: (state, _, store) => {
			const hash = window.location.hash
			return hash.slice(1)
		},

	},
	actions: {
	},
	mutators: {
		setSearchUrl: (state, { name, value }, store) => {
			const queryParams = new URLSearchParams(window.location.search)
			if (value && value.toString().length > 0) {
				queryParams.set(name, value)
			} else {
				queryParams.delete(name)
			}
			window.history.replaceState(null, null, "?" + queryParams.toString())
			return { url: queryParams.toString() }
		},

		setHash: (state, hash, store) => {
			window.location.hash = `#${hash}`
			return { url: window.location.href }
		},
	},
}

export default store

