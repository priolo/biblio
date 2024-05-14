

const repo: any = {
	name: "users",
	class: "typeorm/repo",
	model: {
		name: "users",
		// https://typeorm.io/#/separating-entity-definition
		columns: {
			id: { type: Number, primary: true, generated: true },
			email: { type: String, default: "" },
			name: { type: String, default: "" },
			password: { type: String, default: "" },
			salt: { type: String, default: "" },
		},
		// https://typeorm.delightful.studio/interfaces/_entity_schema_entityschemarelationoptions_.entityschemarelationoptions.html
		relations: {
			nodes: {
				type: "one-to-many",
				target: "nodes",
				cascade: true,
				inverseSide: 'user',
			}
		},
	},
}

export default repo