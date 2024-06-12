import { Request, Response } from "express"
import { Bus, RepoRestActions, httpRouter } from "typexpress"
import { HttpRouterRestRepoServiceConf } from "typexpress/dist/services/http-router/rest/HttpRouterRestRepoService"



export default class DocRoute extends httpRouter.Service {

	get stateDefault(): HttpRouterRestRepoServiceConf {
		return {
			...super.stateDefault,
			path: "/docs",
			repository: "/typeorm/docs",
			routers: [
				{ path: "/", verb: "get", method: "getAll" },
				{ path: "/:id", verb: "get", method: "getById" },
				{ path: "/", verb: "post", method: "save" },
				{ path: "/:id", verb: "delete", method: "delete" },
				{ path: "/update", verb: "post", method: "update"}
			]
		}
	}

	async getAll(req: Request, res: Response) {
		const docs = await new Bus(this, this.state.repository).dispatch({
			type: RepoRestActions.ALL
		})
		res.json(docs)
	}

	async getById(req: Request, res: Response) {
		const id = req.params["id"]
		const user = await new Bus(this, this.state.repository).dispatch({
			type: RepoRestActions.GET_BY_ID,
			payload: id
		})
		res.json(user)
	}

	async save(req: Request, res: Response) {
		const doc = req.body
		const docDB = await new Bus(this, this.state.repository).dispatch({
			type: RepoRestActions.SAVE,
			payload: doc,
		})
		res.json(docDB)
	}

	async delete(req: Request, res: Response) {
		const id = req.params["id"]
		const doc = await new Bus(this, this.state.repository).dispatch({
			type: RepoRestActions.DELETE,
			payload: id
		})
		res.json(doc)
	}

	async update(req: Request, res: Response) {
		const id = req.params["id"]
		const doc = await new Bus(this, this.state.repository).dispatch({
			type: RepoRestActions.DELETE,
			payload: id
		})
		res.json(doc)
	}

}