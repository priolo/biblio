import { getStore, useStore } from "@priolo/jon"



export function getStoreUrl() {
	return getStore("url")
}

export function useUrl() {
	return useStore("url")
}
