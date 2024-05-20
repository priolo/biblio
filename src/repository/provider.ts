

const repo: any = {
	name: "providers",
	class: "typeorm/repo",
	model: {
		name: "providers",
		// https://typeorm.io/#/separating-entity-definition
		columns: {
			id: { type: Number, primary: true, generated: true },
			type: { type: String, default: "" },
			token: { type: String, default: "" },
		},
		// https://typeorm.delightful.studio/interfaces/_entity_schema_entityschemarelationoptions_.entityschemarelationoptions.html
		relations: {
			user: {
				type: "many-to-one",
				target: "users",
				//cascade: true,
				onDelete: "CASCADE",
			}
		},
	},
}

export default repo