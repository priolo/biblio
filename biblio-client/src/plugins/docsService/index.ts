import { ClientObject, ClientObjects } from "@priolo/jess"
import { ApplyAction } from "@priolo/jess/dist/applicators/SlateApplicator"
import cws from "../SocketService"



export const clientObjects = new ClientObjects()
clientObjects.onSend = async (message) => {
	console.log("socket::send", message)
	cws.send(JSON.stringify(message))
}
clientObjects.apply = ApplyAction

export async function fetchDoc(docId: string): Promise<ClientObject> {
	let doc = clientObjects.objects[docId]
	if (!doc) {
		await clientObjects.init(docId, true)
		doc = clientObjects.objects[docId]
	}
	return doc
}

setInterval(() => {
	clientObjects.update()
}, 1000)