import { getStore, useStore } from '@priolo/iistore'

export function getMainMenu() {
	return getStore("mainMenu")
}

export function useMainMenu() {
	return useStore("mainMenu")
}
