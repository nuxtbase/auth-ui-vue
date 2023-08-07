<template>
  <component
    v-bind="attrs"
    is="div"
    :class="classNames"
    :style="appearance?.style?.divider"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'

import { Appearance } from '../types'

const dividerDefaultStyles = css({
  background: '$dividerBackground',
  display: 'block',
  margin: '16px 0',
  height: '1px',
  width: '100%'
})

export interface DividerProps {
  appearance?: Appearance
}

const props = withDefaults(defineProps<DividerProps>(), {})
const attrs = useAttrs()

const classNames = computed(() => {
  const names = generateClassNames(
    'divider',
    dividerDefaultStyles(),
    props.appearance
  )
  return names.join(' ')
})
</script>
