import type { Plugin } from 'vue'
import { Auth } from './component'

export { Auth }

const plugin: Plugin = {
  install(app) {
    app.component('Auth', Auth)
  }
}

export default plugin
