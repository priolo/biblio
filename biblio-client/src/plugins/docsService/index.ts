import cws from "../SocketService"
import { ClientObjects } from "./ClientObjects"
import { ClientObject } from "./ClientObjects.type"
import { ApplyAction } from "./SlateApplicator"



export const clientObjects = new ClientObjects()
clientObjects.onSend = async (message) => {
	console.log("socket::send", message)
	cws.send(JSON.stringify(message))
}
clientObjects.apply = ApplyAction

export async function fetchDoc(docId: string): Promise<ClientObject> {
	let doc = clientObjects.objects[docId]
	if (!doc) {
		await clientObjects.init(docId)
		doc = clientObjects.objects[docId]
	}
	return doc
}
