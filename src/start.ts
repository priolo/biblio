import { Bus, RepoStructActions, RootService } from "typexpress";
import buildNodeConfig from "./config.js";
import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });



(async () => {

	const cnf = buildNodeConfig()
	console.log(`*** CONGIF *********************************`)
	console.log(JSON.stringify(cnf, null, "\t"))
	console.log(`********************************************`);

	const root = await RootService.Start(cnf)
	// console.log(`*** ENVIROMENT ${process.env.NODE_ENV} **************************`)
	// console.log('Process Environment Variables:', process.env);
	// console.log(`********************************************`)

	// console.log("*** SEEDING ****************************************************")
	// new Bus(root, "/typeorm/users").dispatch({
	// 	type: RepoStructActions.SEED,
	// 	payload: [
	// 		{ type: RepoStructActions.TRUNCATE },
	// 		{ email: "pippoburrasca@gmail.com", name: "Pippo", docs: [{ label: "pippo1 - cipolla" }, { label: "pippo1 - diometrario" }] },
	// 		{ email: "gianf.dionisio@libero.com", name: "Gianfranco", docs: [{ label: "gianf - sincopato" }] },
	// 		{ email: "pap.interruptus@gmail.com", name: "Papa", docs: [{ label: "pap - pallisco" }] },
	// 	]
	// })
	// console.log(`********************************************`)

})()