import { Router } from "typexpress"


class NodeRoute extends Router.Repo {
	
	get defaultConfig(): any {
		return {
			...super.defaultConfig,
			path: "/nodes",
			routers: [
				{ path: "/", verb: "get", method: "_getAll" },
				{ path: "/:id", verb: "get", method: "_getById" },
				// { path: "/", verb: "post", method: "_save" },
				// { path: "/:id", verb: "delete", method: "_delete" },
			]
		}
	}

}

export default NodeRoute