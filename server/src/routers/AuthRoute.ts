import { Request, Response } from "express"
import { PathFinder, Router, Email, RepoRestActions, Typeorm } from "typexpress"
import crypto from "crypto"

class AuthRoute extends Router.Service {
	
	get defaultConfig(): any {
		return {
			...super.defaultConfig,
			path: "/auth",
			email: "/email",
			repository: "/typeorm/users",
			routers: [
				{ path: "/register", verb: "post", method: "registerUser" },
			]
		}
	}

	async registerUser(req: Request, res: Response) {
		const { email:emailPath, repository } = this.state
		const { email } = req.body
		const emailService = new PathFinder(this).getNode<Email.Service>(emailPath)
		const userService = new PathFinder(this).getNode<Typeorm.Repo>(repository)
		var token = crypto.randomBytes(16).toString('hex')

		await userService.dispatch({
			type: RepoRestActions.SAVE,
			payload: {
				email: email,
				activationToken: token,
			}
		})

		await emailService.dispatch({
			type: Email.Actions.SEND,
			payload: {
				from: "from@test.com",
				to: "to@test.com",
				subject: "Richiesta registraziuone",
				html: `
					<div>ue ueue ti vuoi reggggistrare! he? allora clicca qua!</div> 
					<div>Il tuo codice è: <span>${token}</span></div>
					<a href="http://localhost:8080/public/regiterme?tkn=${token}">registrami ti prego!</a>
				`,
			}
		})

		res.sendStatus(200)
	}
}

export default AuthRoute