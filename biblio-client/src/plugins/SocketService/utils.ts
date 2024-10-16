import { SocketOptions } from "./types";


const wsOptionBuilder = () => {
	return  {
		protocol: "ws:",
		host: "localhost",
		port: 31311,
		base: "",
	}
}

export const optionsDefault: SocketOptions = wsOptionBuilder();
