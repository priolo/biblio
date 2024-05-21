import { RootService } from "typexpress"
import buildNodeConfig from "./nodeConfig"

import dotenv from "dotenv"
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const cnf = buildNodeConfig()
console.log(cnf)
RootService.Start(cnf)



console.log('Environment:', process.env.NODE_ENV);
// Stampa tutte le variabili d'ambiente per debug
console.log('Process Environment Variables:', process.env);