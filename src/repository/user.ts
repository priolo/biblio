import { Biblio } from "../global"
import { RepoStructActions } from "typexpress"


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
	seeds: Biblio.inDebug() && [
		{ type: RepoStructActions.TRUNCATE },
		{
			email: "ivano@test.com",
			name: "Ivano",
			password: "111",
			nodes: [
				{ label: "cap 1" },
				{ label: "cap 2" },
				{ label: "cap 3" },
			]
		},
		{
			email: "marina@test.com",
			name: "Marina",
			password: "111",
			nodes: [
				{ label: "root" },
				{ label: "benessere" },
				{ label: "cap lavoro" },
			]
		},
		{
			email: "mattia@test.com",
			name: "Mattia",
			password: "111",
			nodes: [
				{ label: "sport" },
				{ label: "generale" },
			]
		},
	]
}

export default repo