<template>
  <SocialAuthContainer
    direction="horizontal"
    gap="small"
    v-if="isSignView"
    :theme="props.theme"
    :appearance="appearance"
  >
    <SocialAuth
      v-if="isSignView"
      :appearance="appearance"
      :supabaseClient="supabaseClient"
      :providers="providers"
      :providerScopes="providerScopes"
      :queryParams="queryParams"
      :socialLayout="socialLayout"
      :redirectTo="redirectTo"
      :onlyThirdPartyProviders="onlyThirdPartyProviders"
      :i18n="i18n"
    />
    <template v-if="!onlyThirdPartyProviders">
      <EmailAuth
        v-if="authView === 'sign_in' || authView === 'sign_up'"
        :supabase-client="supabaseClient"
        :appearance="appearance"
        :redirectTo="redirectTo"
        :magicLink="magicLink"
        :showLinks="showLinks"
        :i18n="i18n"
        :additionalData="additionalData"
      />
      <MagicLink
        v-if="authView === 'magic_link'"
        :supabase-client="supabaseClient"
        :appearance="appearance"
        :redirectTo="redirectTo"
        :showLinks="showLinks"
        :i18n="i18n"
      />
    </template>
  </SocialAuthContainer>
  <template v-else>
    <ForgottenPassword
      v-if="authView === 'forgotten_password'"
      :supabase-client="supabaseClient"
      :appearance="appearance"
      :redirectTo="redirectTo"
      :showLinks="showLinks"
      :i18n="i18n"
    />
    <UpdatePassword
      v-if="authView === 'update_password'"
      :supabase-client="supabaseClient"
      :appearance="appearance"
      :i18n="i18n"
    />
    <VerifyOtp
      v-if="authView === 'verify_otp'"
      :supabase-client="supabaseClient"
      :appearance="appearance"
      :otpType="otpType"
      :i18n="i18n"
    />
  </template>
</template>

<script lang="ts" setup>
import { provide, ref, watch, computed } from 'vue'
import { Provider, SupabaseClient } from '@supabase/supabase-js'
import {
  I18nVariables,
  OtpType,
  ProviderScopes,
  RedirectTo,
  SocialLayout,
  ViewType,
  en,
  merge
} from '@supabase/auth-ui-shared'
import { createStitches } from '@stitches/core'

import { Appearance, AuthViewKey } from './types'
import SocialAuthContainer from './auth/SocialAuthContainer.vue'
import EmailAuth from './auth/EmailAuth.vue'
import SocialAuth from './auth/SocialAuth.vue'
import MagicLink from './auth/MagicLink.vue'
import ForgottenPassword from './auth/ForgottenPassword.vue'
import UpdatePassword from './auth/UpdatePassword.vue'
import VerifyOtp from './auth/VerifyOtp.vue'

interface AuthProps {
  supabaseClient: SupabaseClient
  socialLayout?: SocialLayout
  providers?: Provider[]
  providerScopes?: Partial<ProviderScopes>
  queryParams?: {
    [key: string]: string
  }
  view?: ViewType
  redirectTo?: RedirectTo
  appearance?: Appearance
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

const props = withDefaults(defineProps<AuthProps>(), {
  view: 'sign_in',
  socialLayout: 'vertical',
  onlyThirdPartyProviders: false,
  magicLink: false,
  showLinks: true,
  dark: false,
  theme: 'default',
  otpType: 'email'
})

const authView = ref<ViewType>('sign_in')
const setAuthView = (newView: ViewType) => (authView.value = newView)

provide(AuthViewKey, {
  authView,
  setAuthView
})
/**
 * Localization support
 */
const i18n: I18nVariables = merge(en, props?.localization?.variables ?? {})

/**
 * Simple boolean to detect if authView 'sign_in' or 'sign_up' or 'magic_link' is used
 *
 * @returns boolean
 */
const isSignView = computed(() => {
  return (
    authView.value === 'sign_in' ||
    authView.value === 'sign_up' ||
    authView.value === 'magic_link'
  )
})

const theme = computed(() => {
  return merge(
    props?.appearance?.theme?.default ?? {},
    props?.appearance?.theme?.[props.theme] ?? {},
    props?.appearance?.variables?.default ?? {},
    props?.appearance?.variables?.[props?.theme] ?? {}
  )
})
createStitches({ theme: theme.value })
watch(
  () => props.appearance,
  () => {
    createStitches({ theme: theme.value })
  },
  { deep: true }
)

watch(
  () => props.view,
  (newView) => {
    /**
     * Overrides the authview if it is changed externally
     */
    const { data: authListener } = props.supabaseClient.auth.onAuthStateChange(
      (event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setAuthView('update_password')
        } else if (event === 'USER_UPDATED') {
          setAuthView('sign_in')
        }
      }
    )
    setAuthView(newView)

    return () => authListener.subscription.unsubscribe()
  },
  { deep: true }
)
</script>
