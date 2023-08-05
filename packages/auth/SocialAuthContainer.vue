<template>
  <component v-bind="attrs" is="div" :class="classNames">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { createTheme } from '@stitches/core'
import { merge } from '@supabase/auth-ui-shared'
import { CssComponent } from '@stitches/core/types/styled-component'
import { Appearance } from '@/types'

interface AuthContainerProps {
  theme: 'default' | string
  className?: string | CssComponent
  appearance?: Appearance
}

const props = withDefaults(defineProps<AuthContainerProps>(), {})
const attrs = useAttrs()

const classNames = computed(() => {
  return props.theme !== 'default'
    ? createTheme(
        merge(
          props.appearance?.theme?.[props.theme],
          props.appearance?.variables?.[props.theme] ?? {}
        )
      ).className
    : ''
})
</script>
