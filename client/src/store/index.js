import { setupStore, MultiStoreProvider } from '@priolo/jon'

import doc from "./doc/store"
import menu from "./menu/store"
import url from "./url/store"
import layout from "./layout/store"
import auth from "./auth/store"
import node from "./node/store"

setupStore({ doc, menu, url, layout, auth, node})

export default MultiStoreProvider