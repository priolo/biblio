
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



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//type HttpCnf = Partial<HttpService["stateDefault"]>

interface SharedMem {
	[sharedArrayId: string]: SharedArray
}

interface SharedArray {
	id: string
	listeners: IClient[]
	ActionsBuffer: CwsAction[]
}

interface CwsAction {
	type: string
	index: number
}

interface CwsMessage {
	action: CwsAction
}



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
					onConnect: function (client) {
						console.log("ws/route onConnect")
					},
					// un client ha una qualche richiesta
					onMessage: async function (client, message) {
						const action = message.action
						this.sendToAll(message)
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
