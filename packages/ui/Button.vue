<template>
  <button
    v-bind="attrs"
    :class="classNames.join(' ')"
    :style="appearance?.style?.button"
    :disabled="loading"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import type { Component } from 'vue'
import { computed, watch, useAttrs } from 'vue'
import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'

import { Appearance } from '../types'

const buttonDefaultStyles = css({
  fontFamily: '$buttonFontFamily',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '$borderRadiusButton',
  fontSize: '$baseButtonSize',
  padding: '$buttonPadding',
  cursor: 'pointer',
  borderWidth: '$buttonBorderWidth',
  borderStyle: 'solid',
  width: '100%',

  transitionProperty: 'background-color',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '100ms',
  '&:disabled': {
    opacity: 0.7,
    cursor: 'unset'
  },
  variants: {
    color: {
      default: {
        backgroundColor: '$defaultButtonBackground',
        color: '$defaultButtonText',
        borderColor: '$defaultButtonBorder',
        '&:hover:not(:disabled)': {
          backgroundColor: '$defaultButtonBackgroundHover'
        }
      },
      primary: {
        backgroundColor: '$brand',
        color: '$brandButtonText',
        borderColor: '$brandAccent',
        '&:hover:not(:disabled)': {
          backgroundColor: '$brandAccent'
        }
      }
    }
  }
})

export interface ButtonProps {
  appearance?: Appearance
  icon?: Component
  color?: 'default' | 'primary'
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'default',
  loading: false
})
const attrs = useAttrs()

const classNames = computed(() => {
  return generateClassNames(
    'button',
    buttonDefaultStyles({ color: props.color }),
    props.appearance
  )
})
</script>
