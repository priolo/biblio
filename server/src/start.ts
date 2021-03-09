const {RootService} = require("typexpress")
const path = require("path")

RootService.Start([
	{
		class: "http",
		port: 8080,
		children: [
			{
				class: "http-static",
				dir: path.join(__dirname, "../../client/build"),
				path: "/",
				spaFile: "index.html",
			}
		]
	}
])
