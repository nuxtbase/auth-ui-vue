<template>
  <button
    :class="`h-10 w-10 rounded-full border border-2 transition hover:scale-105 ${
      selected === defaultValue
        ? 'ring-neutral-50 ring-2 drop-shadow-lg !border-neutral-700'
        : ''
    } ${className}`"
    :style="{
      backgroundColor: selected === defaultValue ? color : backgroundColor,
      borderColor: color
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

interface Props {
  className?: string
  color?: string
  defaultValue: string
  selected: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'white',
  defaultValue: '',
  className: '',
  selected: ''
})
const emit = defineEmits(['update:selected'])

const backgroundColor = computed(() => {
  return props.color.replace('rgb', 'rgba').replace(')', ', .2)')
})
</script>

<style scoped></style>
