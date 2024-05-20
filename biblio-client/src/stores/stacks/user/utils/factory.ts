import { buildStore } from "@/stores/docs/utils/factory";
import { DOC_TYPE } from "@/types";
import { UserState, UserStore } from "..";



export function buildUserCard() {
	const store = buildStore({
		type: DOC_TYPE.USER,
	} as UserState) as UserStore
	return store;
}
