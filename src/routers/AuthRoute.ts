import { Request, Response } from "express"
import crypto from "crypto"
import { ENV } from "../utils"

import { 
	PathFinder, RepoRestActions,
	email as emailNs, typeorm, httpRouter 
} from "typexpress"



class AuthRoute extends httpRouter.Service {

	get stateDefault(): any {
		return {
			...super.stateDefault,
			path: "/auth",
			email: "/email",
			repository: "/typeorm/users",
			jwt: "/jwt",
			routers: [
				{ path: "/register", verb: "post", method: "registerUser" },
				{ path: "/activate", verb: "post", method: "activate" },
				{ path: "/login", verb: "post", method: "login" },
			]
		}
	}

	/**
	 * Grazie all'"email" registra un nuovo utente
	 */
	async registerUser(req: Request, res: Response) {
		const { email: emailPath, repository } = this.state
		const { email } = req.body
		const emailService = new PathFinder(this).getNode<emailNs.Service>(emailPath)
		const userService = new PathFinder(this).getNode<typeorm.repo>(repository)

		// creo il codice segreto da inviare per email
		const code = process.env.NODE_ENV == ENV.TEST ? "AAA" : crypto.randomBytes(8).toString('hex')

		// creo un utente temporaneo con il codice da attivare
		await userService.dispatch({
			type: RepoRestActions.SAVE,
			payload: {
				email,
				salt: code,
			}
		})

		// invio l'email per l'attivazione del codice
		await emailService.dispatch({
			type: emailNs.Actions.SEND,
			payload: {
				from: "from@test.com",
				to: "to@test.com",
				subject: "Richiesta registraziuone",
				html: `
					<div>ue ueue ti vuoi reggggistrare! he?</div> 
					<div>questo è il codice</div> 
					<div>${code}</div> 
					<a href="http://localhost:8080/api/activate?code=${code}">registrami ti prego!</a>
				`,
			}
		})

		res.status(200).json({ data: "activate:ok" })
	}

	/**
	 * Permette di attivare un utente confermado con il "code" e la "password"
	 */
	async activate(req: Request, res: Response) {
		const { repository } = this.state
		var { code, password } = req.body
		const userService = new PathFinder(this).getNode<typeorm.repo>(repository)

		const users = await userService.dispatch({
			type: typeorm.Actions.FIND,
			payload: { where: { salt: code } }
		})

		if (users.length == 0) return res.status(404).json({ error: "activate:code:not_found" })
		const user = users[0]

		// Creating a unique salt for a particular user 
		user.salt = crypto.randomBytes(16).toString('hex');
		// Hashing user's salt and password with 1000 iterations, 
		user.password = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);

		await userService.dispatch({
			type: RepoRestActions.SAVE,
			payload: user,
		})

		res.status(200).json({ data: "activate:ok" })
	}

	/**
	 * eseguo il login grazie a "email" e "password"
	 */
	async login(req: Request, res: Response) {
		const { repository } = this.state
		var { email, password } = req.body
		const userService = new PathFinder(this).getNode<typeorm.repo>(repository)

		// get user
		const users = await userService.dispatch({
			type: typeorm.Actions.FIND,
			payload: { where: { email } }
		})
		if (users.length == 0) return res.sendStatus(404)
		const user = users[0]

		// check password
		const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`)
		const correct = hash == user.password
		if (!correct) return res.status(404).json({ error: "login:account:not_found" })

		// inserisco user nel payload jwt
		const jwtService = new PathFinder(this).getNode<httpRouter.jwt.Service>("/http/route/route-jwt")
		const token = await jwtService.putPayload(user, res)
		res.json({ token })
	}
}

export default AuthRoute