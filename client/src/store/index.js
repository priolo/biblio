import { setupStore, MultiStoreProvider } from '@priolo/iistore'
import doc from "./doc/store"
import menu from "./menu/store"

setupStore({ doc, menu})

export default MultiStoreProvider