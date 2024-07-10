<template>
  <div
    class="p-4 rounded-xl"
    :class="variant === 'outlined' ? 'border border-secondary/20' : 'bg-primary/[7%]'"
  >
    <div class="flex justify-between items-start">
      <slot name="title"></slot>
      <slot name="icon"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant?: string
}>()
</script>
