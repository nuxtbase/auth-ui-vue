<template>
  <component
    v-bind="attrs"
    is="div"
    :class="classNames"
    :style="appearance?.style?.loader"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'

import { Appearance } from '../types'

const loaderDefaultStyles = css({
  borderRadius: '50%',
  width: '10em',
  height: '10em',
  margin: '60px auto',
  fontSize: '10px',
  position: 'relative',
  textIndent: '-9999em',

  borderTop: '1.1em solid rgba(255, 255, 255, 0.2)',
  borderRight: '1.1em solid rgba(255, 255, 255, 0.2)',
  borderBottom: '1.1em solid rgba(255, 255, 255, 0.2)',
  borderLeft: '1.1em solid #ffffff',

  '-webkit-transform': 'translateZ(0)',
  '-ms-transform': 'translateZ(0)',
  transform: 'translateZ(0)',
  '-webkit-animation': 'load8 1.1s infinite linear',
  animation: 'load8 1.1s infinite linear',

  '&:after': {
    borderRadius: '50%',
    width: '10em',
    height: '10em'
  }
})

export interface LoaderProps {
  appearance?: Appearance
}

const props = withDefaults(defineProps<LoaderProps>(), {})
const attrs = useAttrs()

const classNames = computed(() => {
  const names = generateClassNames(
    'loader',
    loaderDefaultStyles(),
    props.appearance
  )
  return names.join(' ')
})
</script>
