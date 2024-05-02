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
      <Container direction="vertical" gap="large" :appearance="appearance">
        <div>
          <Label htmlFor="email" :appearance="appearance">
            {{ labels?.email_input_label }}
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            autofocus
            :placeholder="labels?.email_input_placeholder"
            :appearance="appearance"
            v-model="email"
          />
        </div>
      </Container>

      <Button
        type="submit"
        color="primary"
        :loading="isLoading"
        :appearance="appearance"
      >
        {{ isLoading ? labels?.loading_button_label : labels?.button_label }}
      </Button>

      <template v-if="showLinks">
        <Anchor
          href="#auth-sign-in"
          :appearance="appearance"
          @click.prevent="setAuthView(VIEWS.SIGN_IN)"
        >
          {{ i18n?.sign_in?.link_text }}
        </Anchor>
      </template>
    </Container>

    <Message v-if="message" :appearance="appearance">{{ message }}</Message>

    <Message v-if="error" color="danger" :appearance="appearance">
      {{ error }}
    </Message>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { SupabaseClient } from '@supabase/supabase-js'
import { RedirectTo, VIEWS } from '@supabase/auth-ui-shared'

import {
  AuthViewKey,
  type Appearance,
  type AuthViewInjection,
  type AuthI18nVariables
} from '../types'
import { Anchor, Button, Container, Input, Label, Message } from '../ui/index'
import { injectStrict } from '../utils'
import { useSupabaseUser } from './UserContextProvider'

export interface MagicLinkProps {
  appearance?: Appearance
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  showLinks?: boolean
  i18n?: AuthI18nVariables
}

const props = withDefaults(defineProps<MagicLinkProps>(), {})

const { supabaseUser } = useSupabaseUser(props.supabaseClient)

const email = ref('')
const error = ref('')
const message = ref('')
const isLoading = ref(false)

const { authView, setAuthView } = injectStrict<AuthViewInjection>(AuthViewKey)

const labels = computed(
  () => props.i18n?.[authView.value] as AuthI18nVariables['magic_link']
)

const handleSubmit = async (e: Event) => {
  // console.log(props)
  error.value = ''
  message.value = ''
  isLoading.value = true
  const isAnonymous = supabaseUser.value?.is_anonymous
  let signInError: Error | null = null
  if (isAnonymous) {
    const { error: err } = await props.supabaseClient.auth.updateUser(
      {
        email: email.value
      },
      {
        emailRedirectTo: props.redirectTo
      }
    )
    signInError = err
  } else {
    const { error: err } = await props.supabaseClient.auth.signInWithOtp({
      email: email.value,
      options: { emailRedirectTo: props.redirectTo }
    })
    signInError = err
  }

  if (signInError) {
    error.value = signInError.message
  } else {
    message.value = props.i18n?.magic_link?.confirmation_text as string
  }
  isLoading.value = false
}
</script>
