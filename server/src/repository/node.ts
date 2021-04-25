import { RepoStructActions } from "typexpress"


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
			user: {
				type: "many-to-one",
				target: "users",
				onDelete: "CASCADE",
			}
		}
	}
}


export default repo