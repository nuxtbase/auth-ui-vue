<template>
  <component
    v-bind="attrs"
    is="span"
    :class="classNames"
    :style="appearance?.style?.message"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
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
        color: '$messageText'
      },
      danger: {
        color: '$messageTextDanger'
      }
    }
  }
})

export interface MessageProps {
  color?: 'default' | 'danger'
  appearance?: Appearance
}

const props = withDefaults(defineProps<MessageProps>(), {
  color: 'default'
})
const attrs = useAttrs()

const classNames = computed(() => {
  const names = generateClassNames(
    'message',
    messageDefaultStyles({ color: props.color }),
    props.appearance
  )
  return names.join(' ')
})
</script>
