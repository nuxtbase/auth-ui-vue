<template>
  <input
    v-bind="attrs"
    :type="type"
    :class="classNames"
    :style="appearance?.style?.input"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event?.target as HTMLInputElement).value)
    "
  />
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'

import { Appearance } from '../types'

const inputDefaultStyles = css({
  fontFamily: '$inputFontFamily',
  background: '$inputBackground',
  borderRadius: '$inputBorderRadius',
  padding: '$inputPadding',
  cursor: 'text',
  borderWidth: '$inputBorderWidth',
  borderColor: '$inputBorder',
  borderStyle: 'solid',
  fontSize: '$baseInputSize',
  width: '100%',
  color: '$inputText',
  boxSizing: 'border-box',
  '&:hover': {
    borderColor: '$inputBorderHover',
    outline: 'none'
  },
  '&:focus': {
    borderColor: '$inputBorderFocus',
    outline: 'none'
  },
  '&::placeholder': {
    color: '$inputPlaceholder',
    letterSpacing: 'initial'
  },
  transitionProperty: 'background-color, border',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '100ms',
  variants: {
    type: {
      default: {
        letterSpacing: '0px'
      },
      password: {
        letterSpacing: '6px'
      }
    }
  }
})

export interface InputProps {
  type: 'text' | 'password' | 'email'
  appearance?: Appearance
  modelValue: string
}

const props = withDefaults(defineProps<InputProps>(), {})
const attrs = useAttrs()
defineEmits(['update:modelValue'])

const classNames = computed(() => {
  const names = generateClassNames(
    'input',
    inputDefaultStyles({
      type: props.type === 'password' ? 'password' : 'default'
    }),
    props.appearance
  )
  return names.join(' ')
})
</script>
