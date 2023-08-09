import { CSSProperties, InjectionKey, Ref } from 'vue'
import {
  AuthProviders,
  BaseAppearance,
  BaseAuth,
  I18nVariables,
  SocialLayout,
  ViewType
} from '@supabase/auth-ui-shared'
import { SupabaseClient } from '@supabase/supabase-js'
import type { Session, User } from '@supabase/supabase-js'

export interface Appearance extends BaseAppearance {
  style?: {
    anchor?: CSSProperties
    button?: CSSProperties
    container?: CSSProperties
    divider?: CSSProperties
    input?: CSSProperties
    label?: CSSProperties
    loader?: CSSProperties
    message?: CSSProperties
  }
}

export interface Auth extends BaseAuth {
  appearance?: BaseAppearance
}

export interface AuthProps {
  supabaseClient: SupabaseClient // Supabase Client
  socialLayout?: SocialLayout // This determines how the social providers show be displayed
  providers?: AuthProviders // This is a list of social providers to be used
  view?: ViewType // This determines the type of auth component to be shown
  redirectTo?: undefined | string // This will determine where to redirect the user to after some auth operations
  onlyThirdPartyProviders?: boolean // This will toggle if to show just the social providers without the EmailAuth component
  magicLink?: boolean // This will toggle the 'Send magic link' on the links
  showLinks?: boolean // This will toggle the links on the auth component to change the auth view
  /**
   * This will toggle on the dark variation of the theme
   */
  dark?: boolean
  /**
   * Override the labels and button text
   */
  localization?: {
    lang?: 'en' | 'zh'
    variables?: I18nVariables
  }
  appearance?: BaseAppearance
  theme?: 'default' | string
}

export type AuthProvider =
  | 'google'
  | 'facebook'
  | 'twitter'
  | 'apple'
  | 'github'
  | 'gitlab'
  | 'bitbucket'
  | 'discord'
  | 'azure'
  | 'keycloak'
  | 'linkedin'
  | 'notion'
  | 'slack'
  | 'spotify'
  | 'twitch'
  | 'workos'

export interface AuthViewInjection {
  authView: Ref<ViewType>
  setAuthView: (view: ViewType) => void
}

export interface UserContextProviderInjection {
  session: Ref<Session | null>
  user: Ref<User | null>
}

export const AuthViewKey: InjectionKey<AuthViewInjection> = Symbol('AuthView')
export const UserContextProviderKey: InjectionKey<UserContextProviderInjection> =
  Symbol('UserContextProvider')
