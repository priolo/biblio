import { getStore, useStore } from '@priolo/iistore'

export function getStoreDoc() {
	return getStore("doc")
}

export function useDoc() {
	return useStore("doc")
}
