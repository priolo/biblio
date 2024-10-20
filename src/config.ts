
import { getDBConnectionConfig } from "./repository/dbConfig.js";
import UserRoute from "./routers/UserRoute.js";
import AuthRoute from "./routers/AuthRoute.js";
import DocRoute from "./routers/DocRoute.js";
import { User } from "./repository/User.js";
import { Provider } from "./repository/Provider.js";
import { Doc } from "./repository/Doc.js";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { httpRouter, http, httpStatic, ws, typeorm } from "typexpress"
import { IClient } from "typexpress/dist/services/ws/utils.js";
import { ServerObjects } from "./shared/ServerObjects.js";
import { ApplyAction } from "./shared/SlateApplicator.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const PORT = process.env.PORT || 3000;



function buildNodeConfig() {
	return [
		<http.conf>{
			class: "http",
			port: PORT,

			children: [
				<httpRouter.conf>{
					class: "http-router",
					path: "/api",
					cors: {
						"origin": "*",
						// "allowedHeaders": "*",
						// "credentials": true,
					},
					children: [
						{ class: UserRoute },
						{ class: DocRoute },
						{ class: AuthRoute },
						{
							class: "http-router",
							path: "/test",
							routers: [
								{ method: (req, res, next) => res.json({ data: "debug:reset:ok" }) },
							]
						},

					]
				},
				<httpStatic.conf>{
					class: "http-static",
					path: "/app",
					dir: path.join(__dirname, "../biblio-client/dist"),
					spaFile: "index.html",
				},
				<ws.SocketServerConf>{
					class: "ws",
					// un povero client s'e' connesso
					onConnect: function (c) {
						console.log("ws/route onConnect")
					},
				}
			]
		},
		<typeorm.conf>{
			class: "typeorm",
			options: {
				...getDBConnectionConfig(),
				//entities: repositories
			},
			children: [
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
				// userRepo,
				// providerRepo,
				// docRepo,
			],
		},
		{
			class: "jwt",
			secret: "secret_word!!!"
		},
		{
			class: "log"
		}
	]
}



export default buildNodeConfig

