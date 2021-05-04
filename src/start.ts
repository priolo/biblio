import { Bus, PathFinder, RepoStructActions, RootService } from "typexpress"
import path from "path"

import repositories  from "./repository"
import NodeRoute from "./routers/NodeRoute"
import AuthRoute from "./routers/AuthRoute"
import { Biblio } from "./global"


RootService.Start([
	{
		class: "http",
		port: 8080,
		children: [
			{
				class: "http-router",
				path: "/api",
				children: [
					Biblio.inDebug() ? {
						class: "http-router",
						path: "/debug",
						routers: [
							{ path: "/reset", verb:"post", method: async function (req, res, next) {
								await new Bus(this, "/typeorm/nodes").dispatch({ type: RepoStructActions.SEED })
								await new Bus(this, "/typeorm/users").dispatch({ type: RepoStructActions.SEED })
								res.json({ data: "debug:reset:ok" })
							}},
						]
					} : null,
					{
						class: NodeRoute,
						repository: "/typeorm/nodes",
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
			database: path.join(__dirname, "../db/database.sqlite"),
			//migrations: ["migration/*.js"],
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
])


