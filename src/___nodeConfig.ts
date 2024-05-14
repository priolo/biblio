import { Bus, PathFinder, RepoStructActions, RootService } from "typexpress"
import path from "path"
import fs from "fs"

import repositories  from "./repository"
import {NodeRoute, UserRoute, AuthRoute, testRoute} from "./routers"
import { ENV } from "./utils"


export const PORT = 5001

function buildNodeConfig() {

	let dbPath: string
	if (process.env.NODE_ENV == ENV.TEST) {
		try { if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath) }
		catch (e) { console.log(e) }
		dbPath = path.join(__dirname, "../db/database.test.sqlite")

	} else if (process.env.NODE_ENV == ENV.DEV) {
		dbPath = path.join(__dirname, "../db/database.dev.sqlite")
		
	} else {
		dbPath = path.join(__dirname, "../db/database.sqlite")
	}

	return [
		{
			class: "http",
			port: PORT,
			children: [
				{
					class: "http-router",
					path: "/api",
					children: [

						testRoute,

						{
							class: NodeRoute,
							repository: "/typeorm/nodes",
						},
						{
							class: UserRoute,
							repository: "/typeorm/users",
						},
						{
							class: AuthRoute,
						},
						{
							class: "http-router/jwt",
							repository: "/typeorm/users",
							jwt: "/jwt",
							children: [
								{
									class: "http-router",
									path: "/user",
									routers: [
										{ path: "/me", method: (req, res, next) => res.json(req.user) },
									]
								}
							]
						},
					]
				},
				{
					class: "http-static",
					path: "/public",
					dir: path.join(__dirname, "../../biblio-client/build"),
					spaFile: "index.html",
				},	
			]
		},
		{
			class: "typeorm",
			options: {
				type: "sqlite",
				database: dbPath,
				synchronize: true,
			},
			children: repositories,
		},
		{
			class: "email",
			account: {
				// https://ethereal.email/login
				host: 'smtp.ethereal.email',
				port: 587,
				auth: {
					user: 'robin.cummerata65@ethereal.email',
					pass: 'EBnZ54KhH68uUKawGf'
				}
			},
		},
		{
			class: "jwt",
			secret: "secret_word!!!"
		},
	]
}


export default buildNodeConfig