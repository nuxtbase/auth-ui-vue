import type { CSSProperties, InjectionKey, Ref } from 'vue'
import type {
  BaseAppearance,
  I18nVariables,
  OtpType,
  ProviderScopes,
  RedirectTo,
  SocialLayout,
  ViewType
} from '@supabase/auth-ui-shared'
import type {
  Provider,
  Session,
  SupabaseClient,
  User
} from '@supabase/supabase-js'

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

interface BaseAuth {
  supabaseClient: SupabaseClient
  socialLayout?: SocialLayout
  providers?: Provider[]
  providerScopes?: Partial<ProviderScopes>
  queryParams?: {
    [key: string]: string
  }
  view?: ViewType
  redirectTo?: RedirectTo
  passwordResetRedirectTo?: RedirectTo
  onlyThirdPartyProviders?: boolean
  magicLink?: boolean
  showLinks?: boolean
  otpType?: OtpType
  additionalData?: {
    [key: string]: any
  }
  /**
   * This will toggle on the dark variation of the theme
   */
  dark?: boolean
  /**
   * Override the labels and button text
   */
  localization?: {
    variables?: I18nVariables
  }
  theme?: 'default' | string
}

export interface AuthProps extends BaseAuth {
  appearance?: Appearance
}

export type AuthProvider =
  | 'apple'
  | 'azure'
  | 'bitbucket'
  | 'discord'
  | 'facebook'
  | 'figma'
  | 'github'
  | 'gitlab'
  | 'google'
  | 'kakao'
  | 'keycloak'
  | 'linkedin'
  | 'linkedin_oidc'
  | 'notion'
  | 'slack'
  | 'spotify'
  | 'twitch'
  | 'twitter'
  | 'workos'
  | 'zoom'

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
