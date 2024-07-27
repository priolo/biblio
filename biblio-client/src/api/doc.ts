import ajax, { CallOptions } from "@/plugins/AjaxService"
import { About } from "@/types/About"



/** GET */
function get(id: string, opt?: CallOptions): Promise<About> {
	return ajax.get(`doc\${id}`, opt)
}

/** UPDATE */
function update(id: string, doc, opt?: CallOptions): Promise<About> {
	return ajax.patch(`doc\${id}`, doc, opt)
}


const docApi = {
	get,
}
export default docApi