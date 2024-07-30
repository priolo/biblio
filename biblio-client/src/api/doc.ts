import ajax, { CallOptions } from "@/plugins/AjaxService"
import { About } from "@/types/About"
import { Doc, FilterDoc, RemoteDoc } from "../types/Doc"



/** INDEX */
function index(filter?: FilterDoc, opt?: CallOptions): Promise<{ data: any }> {
	return ajax.get(`docs`, opt)
}


/** GET */
function get(id: string, opt?: CallOptions): Promise<{ data: Doc }> {
	return ajax.get(`docs/${id}`, opt)
}

/** UPDATE */
function update(id: string, doc, opt?: CallOptions): Promise<any> {
	return ajax.patch(`docs/${id}`, doc, opt)
}


const docApi = {
	index,
	get,
}
export default docApi