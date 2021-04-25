import { getStore, useStore } from '@priolo/jon'

export function getStoreDoc() {
	return getStore("doc")
}

export function useDoc() {
	return useStore("doc")
}

export const DOC_STATUS = {
	FULL: 0, 
	ICON: 1
}

export const DOC_TYPE = {
	DOC: "doc", 
	LOGIN: "login", 
	REGISTER: "register",
	ACTIVATE: "activate",
	MENU: "menu",
}

export const DocDefault = {
	type: DOC_TYPE.DOC,
	author: "",
	date: Date.now(),
	options: {
		status: DOC_STATUS.FULL,	
		singletone: false,
	},
	title: "",
	body: "",
}
