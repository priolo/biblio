import path from "path";
import { AuthRoute } from "./routers";
import fs from "fs"
import repositories  from "./repository"
import { ENV } from "./utils";
import dotenv from "dotenv"

// carico i dati del file .env
dotenv.config()


export const PORT = process.env.PORT || 3000;

function buildNodeConfig() {


	let dbPath: string = path.join(__dirname, "../db/database.test.sqlite")
	// if (process.env.NODE_ENV == ENV.TEST) {
	// 	try { if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath) }
	// 	catch (e) { console.log(e) }
	// 	dbPath = path.join(__dirname, "../db/database.test.sqlite")

	// } else if (process.env.NODE_ENV == ENV.DEV) {
	// 	dbPath = path.join(__dirname, "../db/database.dev.sqlite")
		
	// } else {
	// 	dbPath = path.join(__dirname, "../db/database.sqlite")
	// }

	
	return [
		{
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
			options: getDBConnectionOptions(),
			children: repositories,
		},
		{
			class: "jwt",
			secret: "secret_word!!!"
		},
	]
}


export default buildNodeConfig


// in base ai settaggi dell'env imposto la connessione al DB
const getDBConnectionOptions = () => {
	if (process.env.DB_DIR != null) {
		let dbPath: string
		const base = path.join(__dirname, "../", process.env.DB_DIR)

		if (process.env.NODE_ENV == ENV.TEST) {
			if (!dbPath) dbPath = path.join(base, "/database.test.sqlite")
			try { if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath) }
			catch (e) { console.log(e) }
		} else if (process.env.NODE_ENV == ENV.DEV) {
			dbPath = path.join(base, "/database.dev.sqlite")
		} else {
			dbPath = path.join(base, "/database.sqlite")
		}

		return {
			type: "sqlite",
			database: dbPath,
			synchronize: true,
			logging: true,
		}
	}
	return {
		type: "mysql",
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		synchronize: true,
	}
}