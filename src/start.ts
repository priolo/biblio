import dotenv from "dotenv";
import { RootService } from "../node_modules/typexpress/dist/core/RootService.js";
import buildNodeConfig from "./config.js";



const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

(async () => {

	console.log(`*** BUILD CONFIG ***`)
	const cnf = buildNodeConfig()
	console.log(`********************************************\n`);

	console.log(`*** START ***`)
	const root = await RootService.Start(cnf)
	console.log(`********************************************\n`)
	
})()