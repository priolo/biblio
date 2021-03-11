import  {RootService} from "typexpress"
import path from "path"

import {index} from "./repository"

RootService.Start([
	{
		class: "http",
		port: 8080,
		children: [
			{
				class: "http-static",
				dir: path.join(__dirname, "../../client/build"),
				path: "/",
				spaFile: "index.html",
			},
			
		]
	},
	{
		class: "typeorm",
		typeorm: {
			type: "sqlite",
			database: path.join(__dirname, "../db/database.sqlite"),
			synchronize: true
		},
		children: [index]
	}
])
