<template>
  <component v-bind="attrs" is="span" :class="classNames.join(' ')" :style="appearance?.style?.message">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'

import { Appearance } from '../types'

const messageDefaultStyles = css({
  fontFamily: '$bodyFontFamily',
  fontSize: '$baseBodySize',
  marginBottom: '$labelBottomMargin',
  display: 'block',
  textAlign: 'center',
  variants: {
    color: {
      default: {
        color: '$messageText',
      },
      danger: {
        color: '$messageTextDanger',
      },
    },
  },
})

export interface MessageProps {
  color?: 'default' | 'danger'
  appearance?: Appearance
}

const props = withDefaults(defineProps<MessageProps>(), {})
const attrs = useAttrs()

const classNames = computed(() => {
  return generateClassNames(
    'message',
    messageDefaultStyles({ color: props.color }),
    props.appearance
  )
})
</script> 
