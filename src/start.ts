import { RootService } from "typexpress"
import buildNodeConfig from "./nodeConfig"


const cnf = buildNodeConfig()
console.log(cnf)
RootService.Start(cnf)