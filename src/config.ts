
import { getDBConnectionOptions } from "./repository/connection.js";
import UserRoute from "./routers/UserRoute.js";
import AuthRoute from "./routers/AuthRoute.js";
import DocRoute from "./routers/DocRoute.js";
import { User } from "./repository/User.js";
import { Provider } from "./repository/Provider.js";
import { Doc } from "./repository/Doc.js";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { ws } from "typexpress"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//type HttpCnf = Partial<HttpService["stateDefault"]>

export const PORT = process.env.PORT || 3000;

function buildNodeConfig() {
	return [
		/*<HttpCnf>*/{
			class: "http",
			port: PORT,

			children: [
				// {
				// 	class: "http-router",
				// 	path: "/api",
				// 	cors: {
				// 		"origin": "*",
				// 		// "allowedHeaders": "*",
				// 		// "credentials": true,
				// 	},
				// 	children: [
				// 		{ class: UserRoute },
				// 		{ class: DocRoute },
				// 		{ class: AuthRoute },
				// 		{
				// 			class: "http-router",
				// 			path: "/test",
				// 			routers: [
				// 				{ method: (req, res, next) => res.json({ data: "debug:reset:ok" }) },
				// 			]
				// 		},

				// 	]
				// },
				// {
				// 	class: "http-static",
				// 	path: "/app",
				// 	dir: path.join(__dirname, "../biblio-client/dist"),
				// 	spaFile: "index.html",
				// },
				<ws.SocketServerConf>{
					class: "ws",
					children: [
						<ws.SocketRouteConf>{
							class: "ws/route",
							onConnect: (client) => {
								console.log("CONNECT")
							},
							onMessage: async function (client, message) {
								await this.dispatch({
									type: ws.SocketRouteActions.SEND,
									payload: { client, message }
								})
								await this.dispatch({
									type: ws.SocketRouteActions.DISCONNECT,
									payload: client
								})
							},
						}
					],
				}
			]
		},
		// {
		// 	class: "typeorm",
		// 	options: {
		// 		...getDBConnectionOptions(),
		// 		//entities: repositories
		// 	},
		// 	children: [
		// 		{
		// 			name: "users",
		// 			class: "typeorm/repo",
		// 			model: User,
		// 		},
		// 		{
		// 			name: "providers",
		// 			class: "typeorm/repo",
		// 			model: Provider,
		// 		},
		// 		{
		// 			name: "docs",
		// 			class: "typeorm/repo",
		// 			model: Doc,
		// 		}
		// 		// userRepo,
		// 		// providerRepo,
		// 		// docRepo,
		// 	],
		// },
		// {
		// 	class: "jwt",
		// 	secret: "secret_word!!!"
		// },
		{
			class: "log"
		}
	]
}

export default buildNodeConfig
