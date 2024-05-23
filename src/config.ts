import path from "path";
//import HttpService from "typexpress/dist/services/http";
import { Doc } from "./repository/Doc";
import { Provider } from "./repository/Provider";
import { User } from "./repository/User";
import { getDBConnectionOptions } from "./repository/connection";
import { AuthRoute } from "./routers";



//type HttpCnf = Partial<HttpService["stateDefault"]>

export const PORT = process.env.PORT || 3000;

function buildNodeConfig() {
	return [
		/*<HttpCnf>*/{
			class: "http",
			port: PORT,

			children: [
				{
					class: "http-router",
					path: "/api",
					children: [
						{
							class: "http-router",
							path: "/test",
							routers: [
								{ method: (req, res, next) => res.json({ data: "debug:reset:ok" }) },
							]
						},
						{
							class: AuthRoute,
						},
					]
				},
				{
					class: "http-static",
					path: "/app",
					dir: path.join(__dirname, "../biblio-client/dist"),
					spaFile: "index.html",
				},
			]
		},
		{
			class: "typeorm",
			options: {
				...getDBConnectionOptions(),
				//entities: repositories
			},
			children:  [
				{
					name: "users",
					class: "typeorm/repo",
					model: User,
				},
				{
					name: "providers",
					class: "typeorm/repo",
					model: Provider,
				},
				{
					name: "docs",
					class: "typeorm/repo",
					model: Doc,
				}
			
			],
		},
		{
			class: "jwt",
			secret: "secret_word!!!"
		},
	]
}

export default buildNodeConfig
