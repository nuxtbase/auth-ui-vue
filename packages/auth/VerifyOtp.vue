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
      <div v-if="['sms', 'phone_change'].includes(otpType)">
        <Label htmlFor="phone" :appearance="appearance">
          {{ labels?.phone_input_label }}
        </Label>
        <Input
          id="phone"
          name="phone"
          type="text"
          autofocus
          :placeholder="labels?.phone_input_placeholder"
          :appearance="appearance"
          v-model="phone"
        />
      </div>
      <div v-else>
        <Label htmlFor="email" :appearance="appearance">
          {{ labels?.email_input_label }}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          autofocus
          :placeholder="labels?.email_input_placeholder"
          :appearance="appearance"
          v-model="email"
        />
      </div>
      <div>
        <Label htmlFor="token" :appearance="appearance">
          {{ labels?.token_input_label }}
        </Label>
        <Input
          id="token"
          name="token"
          type="text"
          autofocus
          :placeholder="labels?.token_input_placeholder"
          :appearance="appearance"
          v-model="token"
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
import {
  EmailOtpType,
  MobileOtpType,
  SupabaseClient,
  VerifyOtpParams
} from '@supabase/supabase-js'
import { I18nVariables, OtpType, VIEWS } from '@supabase/auth-ui-shared'

import { AuthViewKey, type Appearance, type AuthViewInjection } from '../types'
import { Anchor, Button, Container, Input, Label, Message } from '../ui/index'
import { injectStrict } from '../utils'

export interface VerifyOtpProps {
  appearance?: Appearance
  supabaseClient: SupabaseClient
  otpType?: OtpType
  showLinks?: boolean
  i18n?: I18nVariables
}

const props = withDefaults(defineProps<VerifyOtpProps>(), {
  otpType: 'email',
  showLinks: false
})

const email = ref('')
const phone = ref('')
const token = ref('')
const error = ref('')
const message = ref('')
const isLoading = ref(false)

const { authView, setAuthView } = injectStrict<AuthViewInjection>(AuthViewKey)

const labels = computed(
  () => props.i18n?.[authView.value] as I18nVariables['verify_otp']
)

const handleSubmit = async (e: Event) => {
  // console.log(props)
  error.value = ''
  message.value = ''
  isLoading.value = true
  let verifyOpts: VerifyOtpParams = {
    email: email.value,
    token: token.value,
    type: props.otpType as EmailOtpType
  }
  if (['sms', 'phone_change'].includes(props.otpType)) {
    verifyOpts = {
      phone: phone.value,
      token: token.value,
      type: props.otpType as MobileOtpType
    }
  }
  const { error: signInError } = await props.supabaseClient.auth.verifyOtp(
    verifyOpts
  )
  if (signInError) {
    error.value = signInError.message
  } else {
    message.value = props.i18n?.magic_link?.confirmation_text as string
  }
  isLoading.value = false
}
</script>
