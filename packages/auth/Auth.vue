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
      :supabaseClient="supabaseClient"
      :appearance="appearance"
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
        :supabaseClient="supabaseClient"
        :appearance="appearance"
        :redirectTo="redirectTo"
        :magicLink="magicLink"
        :showLinks="showLinks"
        :i18n="i18n"
        :additionalData="additionalData"
      />
      <MagicLink
        v-if="authView === 'magic_link'"
        :supabaseClient="supabaseClient"
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
      :supabaseClient="supabaseClient"
      :appearance="appearance"
      :redirectTo="redirectTo"
      :showLinks="showLinks"
      :i18n="i18n"
    />
    <UpdatePassword
      v-if="authView === 'update_password'"
      :supabaseClient="supabaseClient"
      :appearance="appearance"
      :i18n="i18n"
    />
    <VerifyOtp
      v-if="authView === 'verify_otp'"
      :supabaseClient="supabaseClient"
      :appearance="appearance"
      :otpType="otpType"
      :i18n="i18n"
    />
  </template>
</template>

<script lang="ts" setup>
import { provide, ref, watch, computed } from 'vue'
import { I18nVariables, ViewType, en, merge } from '@supabase/auth-ui-shared'
import { createStitches } from '@stitches/core'
import cloneDeep from 'lodash.clonedeep'

import { AuthProps, AuthViewKey } from '../types'
import SocialAuthContainer from './SocialAuthContainer.vue'
import EmailAuth from './EmailAuth.vue'
import SocialAuth from './SocialAuth.vue'
import MagicLink from './MagicLink.vue'
import ForgottenPassword from './ForgottenPassword.vue'
import UpdatePassword from './UpdatePassword.vue'
import VerifyOtp from './VerifyOtp.vue'

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

const authView = ref<ViewType>(props.view)
const setAuthView = (newView: ViewType) => (authView.value = newView)

provide(AuthViewKey, {
  authView,
  setAuthView
})
/**
 * Localization support
 */
const i18n = computed<I18nVariables>(() => {
  const defaultLanguage = cloneDeep(en)
  const newlanguage = cloneDeep(props?.localization?.variables)
  return merge(defaultLanguage, newlanguage ?? {})
})

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
  const appearanceTheme = cloneDeep(props.appearance?.theme)
  const appearanceVariables = cloneDeep(props.appearance?.variables)
  return merge(
    appearanceTheme?.default ?? {},
    appearanceTheme?.[props.theme] ?? {},
    appearanceVariables?.default ?? {},
    appearanceVariables?.[props?.theme] ?? {}
  )
})
createStitches({ theme: theme.value })
watch(
  () => [props.appearance, props.theme],
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
