<template>
  <component
    v-bind="attrs"
    is="a"
    :class="classNames"
    :style="appearance?.style?.anchor"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'

import { Appearance } from '../types'

const anchorDefaultStyles = css({
  fontFamily: '$bodyFontFamily',
  fontSize: '$baseBodySize',
  marginBottom: '$anchorBottomMargin',
  color: '$anchorTextColor',
  display: 'block',
  textAlign: 'center',
  textDecoration: 'underline',
  '&:hover': {
    color: '$anchorTextHoverColor'
  }
})

export interface AnchorProps {
  appearance?: Appearance
}

const props = withDefaults(defineProps<AnchorProps>(), {})
const attrs = useAttrs()

const classNames = computed(() => {
  const names = generateClassNames(
    'anchor',
    anchorDefaultStyles(),
    props.appearance
  )
  return names.join(' ')
})
</script>
