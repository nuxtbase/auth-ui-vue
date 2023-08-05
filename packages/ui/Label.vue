<template>
  <component v-bind="attrs" is="label" :class="classNames.join(' ')" :style="appearance?.style?.label">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'

import { Appearance } from '../types'

const labelDefaultStyles = css({
  fontFamily: '$labelFontFamily',
  fontSize: '$baseLabelSize',
  marginBottom: '$labelBottomMargin',
  color: '$inputLabelText',
  display: 'block',
})

export interface LabelProps {
  appearance?: Appearance
}

const props = withDefaults(defineProps<LabelProps>(), {})
const attrs = useAttrs()

const classNames = computed(() => {
  return generateClassNames(
    'label',
    labelDefaultStyles(),
    props.appearance
  )
})
</script> 
