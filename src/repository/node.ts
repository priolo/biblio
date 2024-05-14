

const repo: any = {
	name: "nodes",
	class: "typeorm/repo",
	model: {
		name: "nodes",
		columns: {
			id: { type: Number, primary: true, generated: true },
			label: { type: String, default: "" },
		},
		// https://typeorm.delightful.studio/interfaces/_entity_schema_entityschemarelationoptions_.entityschemarelationoptions.html
		relations: {
			parent: {
				type: "many-to-one",
				target: "nodes",
				nullable: true,
				onDelete: "CASCADE",
			},
			user: {
				type: "many-to-one",
				target: "users",
				nullable: true,
				onDelete: "CASCADE",
			}
		}
	}
}


export default repo