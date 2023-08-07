<template>
  <component v-bind="attrs" is="div" :class="classNames.join(' ')">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { css } from '@stitches/core'
import { PREPENDED_CLASS_NAMES } from '@supabase/auth-ui-shared'
import { CssComponent } from '@stitches/core/types/styled-component'

const containerDefaultStyles = css({
  borderRadius: '12px',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  width: '360px',
  padding: '28px 32px'
})

interface Card {
  className?: string | CssComponent
}

export interface DividerProps {
  appearance?: Card
}

const props = withDefaults(defineProps<DividerProps>(), {})
const attrs = useAttrs()

const classNames = computed(() => {
  return [
    `${PREPENDED_CLASS_NAMES}_ui-card`,
    containerDefaultStyles(),
    props.appearance?.className
  ]
})
</script>
