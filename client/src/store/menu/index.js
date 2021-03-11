import { getStore, useStore } from '@priolo/iistore'

export function getMenu() {
	return getStore("menu")
}

export function useMenu() {
	return useStore("menu")
}
