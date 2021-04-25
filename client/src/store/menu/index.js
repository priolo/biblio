import { getStore, useStore } from '@priolo/jon'

export function getMenu() {
	return getStore("menu")
}

export function useMenu() {
	return useStore("menu")
}
