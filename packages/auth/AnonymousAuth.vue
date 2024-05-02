<template>
  <form
    :id="`auth-${authView}`"
    @submit.prevent="handleSubmit"
    autoComplete="on"
    :style="{
      width: '100%'
    }"
  >
    <Container direction="vertical" gap="large" :appearance="appearance">
      <Button
        type="submit"
        color="primary"
        :loading="isLoading"
        :appearance="appearance"
      >
        {{ isLoading ? labels?.loading_button_label : labels?.button_label }}
      </Button>
    </Container>

    <Message v-if="message" :appearance="appearance">{{ message }}</Message>

    <Message v-if="error" color="danger" :appearance="appearance">
      {{ error }}
    </Message>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import {
  SignInAnonymouslyCredentials,
  SupabaseClient
} from '@supabase/supabase-js'
import { RedirectTo } from '@supabase/auth-ui-shared'

import {
  AuthViewKey,
  type Appearance,
  type AuthViewInjection,
  type AuthI18nVariables
} from '../types'
import { Button, Container, Message } from '../ui/index'
import { injectStrict } from '../utils'
import { useSupabaseUser } from './UserContextProvider'

export interface AnonymousSignInProps {
  appearance?: Appearance
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  i18n?: AuthI18nVariables
  anonymouslyCredentials?: SignInAnonymouslyCredentials
}

const props = withDefaults(defineProps<AnonymousSignInProps>(), {})

const { supabaseUser } = useSupabaseUser(props.supabaseClient)

const error = ref('')
const message = ref('')
const isLoading = ref(false)

const { authView, setAuthView } = injectStrict<AuthViewInjection>(AuthViewKey)

const labels = computed(
  () => props.i18n?.[authView.value] as AuthI18nVariables['anonymous_sign_in']
)

const handleSubmit = async (e: Event) => {
  // console.log(props)
  error.value = ''
  message.value = ''
  isLoading.value = true
  let signInError: Error | null = null

  const { data, error: err } =
    await props.supabaseClient.auth.signInAnonymously(
      props.anonymouslyCredentials
    )

  signInError = err

  if (signInError) {
    error.value = signInError.message
  }
  isLoading.value = false
}
</script>
