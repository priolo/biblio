/* eslint eqeqeq: "off" */

export const DOC_STATUS = {
	FULL: 0, ICON: 1
}


const store = {
	state: {
		all: [],
		bottom: [
			
		]
	},
	getters: {
	},
	actions: {
		fetch: async (state, _, store) => {
			store.setAll([
				{
					label: "Questo è il titolo 1",
					link: "",
					expanded: false,
					children: [
						{
							label: "sub title 1.1",
							link: "",
							expanded: false,
							children: [
								{
									label: "sub sub title 1.1.1",
									link: "",
									expanded: false,
								},
							]
						},
						{
							label: "sub title 1.2",
							link: "",
							expanded: false,
						},
						{
							label: "sub title 1.3",
							link: "",
							expanded: false,
						}
					]
				},
				{
					label: "Questo è il titolo 2",
					link: "",
					expanded: false,
					children: [
						{
							label: "sub title 2.1",
							link: "",
							expanded: false,
							children: [
								{
									label: "sub sub title 2.1.1",
									link: "",
									expanded: false,
								},
								{
									label: "sub sub title 2.1.2",
									link: "",
									expanded: false,
								},
							]
						},
						{
							label: "sub title 2.2",
							link: "",
							expanded: false,
						},
						{
							label: "sub title 2.3",
							link: "",
							expanded: false,
						}
					]
				},
			])
		}
	},
	mutators: {
		setAll: (state, all) => ({ all }),
	},
}

export default store

