import { setupStore, MultiStoreProvider } from '@priolo/iistore'
import doc from "./doc/store"
import mainMenu from "./mainMenu/store"

setupStore({ doc, mainMenu})

export default MultiStoreProvider