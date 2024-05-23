import buildNodeConfig from "../config"
import { Bus, email, service, PathFinder, RepoRestActions, RootService, typeorm } from "typexpress"
import path from "path"
import fs from "fs"
import { ajax } from "./utils/ajax"





let root

beforeAll(async () => {
	const cnf = buildNodeConfig()
	root = await RootService.Start(cnf)
})

afterAll(async () => {
	await RootService.Stop(root)
})

test("register with email", async () => {

	const email = "test@test.com"
	const password = "123"

	const emailService = new PathFinder(root).getNode<email.Service>("/email")
	emailService.emitter.once ( service.ServiceBaseEvents.DISPATCH, (action)=> {
	})

	// mi registro
	let response = await ajax.post( `/auth/register`, { email } )
	expect(response.status).toBe(200)

	// ricavo il codice di registrazione dal db
	const userRepo = new PathFinder(root).getNode<typeorm.repo>("/typeorm/users")
	const [user] = await userRepo.dispatch({
		type: typeorm.Actions.FIND,
		payload: { where: { email } }
	})
	expect(user.salt).not.toBeNull()

	// attivo l'account
	response = await ajax.post( `/auth/activate`, { code: user.salt, password } )
	expect(response.status).toBe(200)
	expect(response.data.data).toBe('activate:ok')
	
	// eseguo il login
	response = await ajax.post( `/auth/login`, { email, password } )
	expect(response.status).toBe(200)
	expect(response.data.token).not.toBeNull()

})

