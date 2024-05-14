
export const PORT = 5001

function buildNodeConfig() {
	return [
		{
			class: "http",
			port: PORT,
			children: [
				{
					class: "http-router",
					path: "/api",
					children: [
						{
							class: "http-router",
							path: "/test",
							routers: [
								{ method: (req, res, next) => res.json({ data: "debug:reset:ok" }) },
							]
						}
					]
				},
			]
		},
	]
}


export default buildNodeConfig