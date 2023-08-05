<template>
  <component :is="is" :class="classNames.join(' ')" :style="appearance?.style?.container">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { css } from '@stitches/core'
import { computed } from 'vue'
import { generateClassNames } from '@supabase/auth-ui-shared'

import type { Appearance } from '../types'

const containerDefaultStyles = css({
  display: 'flex',
  gap: '4px',
  variants: {
    direction: {
      horizontal: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(48px, 1fr))',
      },
      vertical: {
        flexDirection: 'column',
        margin: '8px 0',
      },
    },
    gap: {
      small: {
        gap: '4px',
      },
      medium: {
        gap: '8px',
      },
      large: {
        gap: '16px',
      },
    },
  },
})

export interface ContainerProps {
  is?: string,
  direction: 'horizontal' | 'vertical',
  gap: 'small' | 'medium' | 'large',
  appearance?: Appearance,
}

const props = withDefaults(defineProps<ContainerProps>(), { is: 'div' })

const classNames = computed(() => {
  return generateClassNames('container', containerDefaultStyles({
    direction: props.direction,
    gap: props.gap
  }), props.appearance)
})
</script>
