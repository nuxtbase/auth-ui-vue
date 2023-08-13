<template>
  <button
    :class="`h-10 w-10 rounded-full border border-2 transition hover:scale-105 ${
      selected === defaultValue
        ? 'ring-neutral-500 dark:ring-neutral-50 ring-2 drop-shadow-lg !border-neutral-300 !dark:border-neutral-700'
        : ''
    } ${className}`"
    :style="{
      backgroundColor: selected === defaultValue ? color : backgroundColor,
      borderColor: borderColor
    }"
    @click.prevent="
      () => {
        emit('update:selected', defaultValue)
      }
    "
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { isDark } from '~/composables/useDarkmode'

interface Props {
  className?: string
  color?: string
  defaultValue: string
  selected: string
}

const props = withDefaults(defineProps<Props>(), {
  color: '',
  defaultValue: '',
  className: '',
  selected: ''
})
const emit = defineEmits(['update:selected'])

const borderColor = computed(() => {
  if (props.color) return props.color
  return isDark.value ? 'white' : 'rgba(115, 115, 115)'
})

const backgroundColor = computed(() => {
  const opacity = isDark.value ? '.2' : '.48'
  return props.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)
})
</script>

<style scoped></style>
