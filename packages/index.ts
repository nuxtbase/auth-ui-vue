import type { Plugin } from 'vue'
import { Auth, UserContextProvider, useSupabaseUser } from './component'

export { Auth, UserContextProvider, useSupabaseUser }

const plugin: Plugin = {
  install(app) {
    app.component('Auth', Auth)
  }
}

export default plugin
