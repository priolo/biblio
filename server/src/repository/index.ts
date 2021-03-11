

const index:any = {
	name: "indexes",
	class: "typeorm/repo",
	model: {
		name: "Indexes",
		// https://typeorm.io/#/separating-entity-definition
		columns: {
			id: {type: Number, primary: true, generated: true},
			title: {type: String, default: ""},
		}
	}
}


export {
	index
}