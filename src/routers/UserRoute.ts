import { httpRouter } from "typexpress"


export default class UserRoute extends httpRouter.repo {
	
	get stateDefault(): any {
		return {
			...super.stateDefault,
			path: "/users",
			routers: [
				{ path: "/", verb: "get", method: "_getAll" },
				{ path: "/:id", verb: "get", method: "_getById" },
				// { path: "/", verb: "post", method: "_save" },
				// { path: "/:id", verb: "delete", method: "_delete" },
			]
		}
	}

}
