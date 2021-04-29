import { Request, Response } from "express"
import { PathFinder, Router, Email, RepoRestActions, Typeorm, Bus } from "typexpress"
import crypto from "crypto"

class AuthRoute extends Router.Service {
	
	get defaultConfig(): any {
		return {
			...super.defaultConfig,
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

	async registerUser(req: Request, res: Response) {
		const { email:emailPath, repository } = this.state
		const { email } = req.body
		const emailService = new PathFinder(this).getNode<Email.Service>(emailPath)
		const userService = new PathFinder(this).getNode<Typeorm.Repo>(repository)
		var token = crypto.randomBytes(8).toString('hex')

		await userService.dispatch({
			type: RepoRestActions.SAVE,
			payload: {
				email: email,
				salt: token,
			}
		})

		await emailService.dispatch({
			type: Email.Actions.SEND,
			payload: {
				from: "from@test.com",
				to: "to@test.com",
				subject: "Richiesta registraziuone",
				html: `
					<div>ue ueue ti vuoi reggggistrare! he?</div> 
					<div>questo è il codice</div> 
					<div>${token}</div> 
					<a href="http://localhost:8080/api/activate?code=${token}">registrami ti prego!</a>
				`,
			}
		})

		res.sendStatus(200)
	}

	async activate(req: Request, res: Response) {
		const { repository } = this.state
		var { code, password } = req.body
		const userService = new PathFinder(this).getNode<Typeorm.Repo>(repository)

		const users = await userService.dispatch({
			type: Typeorm.Actions.FIND,
			payload: { 
				where: { salt: code } 
			}
		})

		if ( users.length==0 ) return res.sendStatus(404)
		const user = users[0]

		// Creating a unique salt for a particular user 
		user.salt = crypto.randomBytes(16).toString('hex');   
		// Hashing user's salt and password with 1000 iterations, 
		user.password = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`); 

		await userService.dispatch({
			type: RepoRestActions.SAVE,
			payload: user,
		})

		res.sendStatus(200)
	}
 
	async login(req: Request, res: Response) {
		const { repository } = this.state
		var { email, password } = req.body
		const userService = new PathFinder(this).getNode<Typeorm.Repo>(repository)

		const users = await userService.dispatch({
			type: Typeorm.Actions.FIND,
			payload: { 
				where: { email: email } 
			}
		})

		if ( users.length==0 ) return res.sendStatus(404)
		const user = users[0]

		const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`)
		const correct = hash == user.password

		if ( !correct ) return res.sendStatus(404)


		await new Bus(this, "/http/route/route-jwt").dispatch({
			type: Router.Actions.JWT.LOGIN,
			payload: { user },
		})

		res.sendStatus(200)
	}
}

export default AuthRoute