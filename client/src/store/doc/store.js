/* eslint eqeqeq: "off" */

export const DOC_STATUS = {
	FULL: 0, ICON: 1
}


const store = {
	state: {
		// docs
		all: [],
		// visible docs
		views: [],
	},
	getters: {
	},
	actions: {
		fetch: async (state, _, store) => {
			store.setAll([
				{
					id: "1",
					title: "Questo è il titolo 1",
					type: "doc",
					author: "Ivano Iorio",
					date: "2021/04/09",
					status: DOC_STATUS.FULL,
					body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sapien massa. Nulla ornare, augue sed vestibulum feugiat, mi quam tempus tortor, in hendrerit libero leo in nisl. Nam molestie mauris non nunc fermentum, eget pellentesque turpis porttitor. Pellentesque vestibulum facilisis ligula, ut pulvinar diam porttitor nec. In vulputate molestie ante at vestibulum. Pellentesque gravida eros in ligula hendrerit egestas. Etiam quis purus elementum, semper nibh sed, ultrices lacus. In ultricies rutrum suscipit. Vestibulum in sollicitudin enim. Curabitur eget imperdiet urna, eu facilisis neque. Nunc nibh sapien, congue et urna et, ullamcorper hendrerit mauris. Maecenas et sagittis mauris. Praesent quis tortor turpis. Vivamus maximus leo vel dignissim pretium. Donec tempor purus vel neque gravida, at tempus orci condimentum."
				},
				{
					id: "2",
					title: "Questo è il titolo 2",
					type: "doc",
					author: "Ivano Iorio",
					date: "2021/04/09",
					body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sapien massa. Nulla ornare, augue sed vestibulum feugiat, mi quam tempus tortor, in hendrerit libero leo in nisl. Nam molestie mauris non nunc fermentum, eget pellentesque turpis porttitor. Pellentesque vestibulum facilisis ligula, ut pulvinar diam porttitor nec. In vulputate molestie ante at vestibulum. Pellentesque gravida eros in ligula hendrerit egestas. Etiam quis purus elementum, semper nibh sed, ultrices lacus. In ultricies rutrum suscipit. Vestibulum in sollicitudin enim. Curabitur eget imperdiet urna, eu facilisis neque. Nunc nibh sapien, congue et urna et, ullamcorper hendrerit mauris. Maecenas et sagittis mauris. Praesent quis tortor turpis. Vivamus maximus leo vel dignissim pretium. Donec tempor purus vel neque gravida, at tempus orci condimentum."
				},
				{
					id: "3",
					title: "Questo è il titolo 3",
					type: "doc",
					author: "Ivano Iorio",
					date: "2021/04/09",
					body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sapien massa. Nulla ornare, augue sed vestibulum feugiat, mi quam tempus tortor, in hendrerit libero leo in nisl. Nam molestie mauris non nunc fermentum, eget pellentesque turpis porttitor. Pellentesque vestibulum facilisis ligula, ut pulvinar diam porttitor nec. In vulputate molestie ante at vestibulum. Pellentesque gravida eros in ligula hendrerit egestas. Etiam quis purus elementum, semper nibh sed, ultrices lacus. In ultricies rutrum suscipit. Vestibulum in sollicitudin enim. Curabitur eget imperdiet urna, eu facilisis neque. Nunc nibh sapien, congue et urna et, ullamcorper hendrerit mauris. Maecenas et sagittis mauris. Praesent quis tortor turpis. Vivamus maximus leo vel dignissim pretium. Donec tempor purus vel neque gravida, at tempus orci condimentum."
				},
			])
		},
		// inserisce un doc in coda
		open: async ( state, doc, store) => {
			if ( !doc.id ) doc.id = "tmp_" + Math.round(999*Math.random())
			const docs = [...state.all, doc]
			store.setAll(docs)
		},
		close: async ( state, id, store) => {

		}

	},
	mutators: {
		setAll: (state, all) => ({ all }),
	},
}

export default store

