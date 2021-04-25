import { RootService } from "typexpress"
import path from "path"

import repositories  from "./repository"
import NodeRoute from "./routers/NodeRoute"
import AuthRoute from "./routers/AuthRoute"



RootService.Start([
	{
		class: "http",
		port: 8080,
		children: [
			{
				class: "http-router",
				path: "/api",
				children: [
					{
						class: NodeRoute,
						repository: "/typeorm/nodes",
					},
					{
						class: AuthRoute,
					},
				]
			},
			{
				class: "http-static",
				path: "/public",
				dir: path.join(__dirname, "../../client/build"),
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
])
