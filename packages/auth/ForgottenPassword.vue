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
      <div>
        <Label htmlFor="email" :appearance="appearance">
          {{ labels?.email_label }}
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
import { I18nVariables, RedirectTo, VIEWS } from '@supabase/auth-ui-shared'

import { AuthViewKey, type Appearance, type AuthViewInjection } from '../types'
import { Anchor, Button, Container, Input, Label, Message } from '../ui/index'
import { injectStrict } from '../utils'

export interface ForgottenPasswordProps {
  appearance?: Appearance
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  showLinks?: boolean
  i18n?: I18nVariables
}

const props = withDefaults(defineProps<ForgottenPasswordProps>(), {})

const email = ref('')
const error = ref('')
const message = ref('')
const isLoading = ref(false)

const { authView, setAuthView } = injectStrict<AuthViewInjection>(AuthViewKey)

const labels = computed(
  () => props.i18n?.[authView.value] as I18nVariables['forgotten_password']
)

const handleSubmit = async (e: Event) => {
  console.log(props)
  error.value = ''
  message.value = ''
  isLoading.value = true
  const { error: signInError } =
    await props.supabaseClient.auth.resetPasswordForEmail(email.value, {
      redirectTo: props.redirectTo
    })
  if (signInError) {
    error.value = signInError.message
  } else {
    message.value = props.i18n?.forgotten_password?.confirmation_text as string
  }
  isLoading.value = false
}
</script>

<style scoped></style>
