import type { Plugin } from 'vue'
import {
  Auth,
  ForgottenPassword,
  UpdatePassword,
  MagicLink,
  UserContextProvider,
  useSupabaseUser
} from './component'
import { injectStrict } from './utils'
import type { UserContextProviderInjection } from './types'
import { UserContextProviderKey } from './types'

export {
  Auth,
  ForgottenPassword,
  UpdatePassword,
  MagicLink,
  injectStrict,
  UserContextProvider,
  useSupabaseUser,
  UserContextProviderInjection,
  UserContextProviderKey
}

const plugin: Plugin = {
  install(app) {
    app.component('Auth', Auth)
  }
}

export default plugin
