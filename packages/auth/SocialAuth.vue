<template>
  <template v-if="providers && providers.length > 0">
    <Container gap="large" direction="vertical" :appearance="appearance">
      <Container
        :direction="verticalSocialLayout ? 'vertical' : 'horizontal'"
        :gap="verticalSocialLayout ? 'small' : 'medium'"
        :appearance="appearance"
      >
        <template v-for="provider in providers" :key="provider">
          <Button
            color="default"
            :loading="isLoading"
            @click.prevent="() => handleProviderSignIn(provider)"
            :appearance="appearance"
          >
            <template #icon>
              <Icons :name="provider" />
            </template>
            <template v-if="verticalSocialLayout">
              {{
                template(
                  labels?.social_provider_text?.replace('_oidc', '') as string,
                  {
                    provider: capitalize(provider.replace('_oidc', ''))
                  }
                )
              }}
            </template>
          </Button>
        </template>
      </Container>
    </Container>
    <Divider :appearance="appearance" v-if="!onlyThirdPartyProviders" />
  </template>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Provider, SupabaseClient } from '@supabase/supabase-js'
import {
  ProviderScopes,
  SocialLayout,
  template
} from '@supabase/auth-ui-shared'

import {
  AuthViewKey,
  type Appearance,
  type AuthViewInjection,
  type AuthI18nVariables
} from '../types'
import { Divider, Button, Container } from '@/ui'
import { Icons } from '@/icons'
import { injectStrict } from '../utils'
import { useSupabaseUser } from './UserContextProvider'

type RedirectTo = undefined | string

export interface SocialAuthProps {
  supabaseClient: SupabaseClient
  socialLayout?: SocialLayout
  providers?: Provider[]
  providerScopes?: Partial<ProviderScopes>
  queryParams?: { [key: string]: string }
  redirectTo?: RedirectTo
  onlyThirdPartyProviders?: boolean
  view?: 'sign_in' | 'sign_up' | 'magic_link'
  i18n?: AuthI18nVariables
  appearance?: Appearance
}

const props = withDefaults(defineProps<SocialAuthProps>(), {
  socialLayout: 'vertical',
  providers: () => ['github', 'google', 'azure'],
  onlyThirdPartyProviders: true,
  view: 'sign_in'
})

const { supabaseUser } = useSupabaseUser(props.supabaseClient)

const error = ref('')
const isLoading = ref(false)
const { authView } = injectStrict<AuthViewInjection>(AuthViewKey)

const verticalSocialLayout = computed(() => {
  return props.socialLayout === 'vertical' ? true : false
})

const currentView = computed(() => {
  return authView.value === 'magic_link' ? 'sign_in' : authView.value
})

const labels = computed(
  () =>
    props.i18n?.[currentView.value] as AuthI18nVariables['sign_in' | 'sign_up']
)

const handleProviderSignIn = async (provider: Provider) => {
  error.value = ''
  isLoading.value = true

  const isAnonymous = supabaseUser.value?.is_anonymous
  const options = {
    redirectTo: props.redirectTo,
    scopes: props.providerScopes?.[provider],
    queryParams: props.queryParams
  }

  let signInError: Error | null = null

  if (isAnonymous) {
    const { data, error: err } = await props.supabaseClient.auth.linkIdentity({
      provider,
      options
    })
    signInError = err
  } else {
    const { data, error: err } =
      await props.supabaseClient.auth.signInWithOAuth({
        provider,
        options
      })
    signInError = err
  }

  // console.log(data)
  if (signInError) error.value = signInError.message
  isLoading.value = false
}

function capitalize(word: string) {
  const lower = word.toLowerCase()
  return word.charAt(0).toUpperCase() + lower.slice(1)
}
</script>
