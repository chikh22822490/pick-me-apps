<template>
  <div
    class="fixed top-0 left-0 z-30 w-full h-full flex justify-center items-center bg-slate-500 bg-opacity-30 py-6"
    v-if="isModalOpen"
    @click.self="closeModal"
  >
    <div class="relative max-h-full max-w-full">
      <slot name="modalContent" class="relative max-h-full max-w-full" />
      <button
        @click="closeModal"
        class="absolute flex items-center justify-center right-2 top-2 hover:bg-btn-background"
      >
        <CloseModalIcon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CloseModalIcon } from '../assets/icons'
const props = withDefaults(
  defineProps<{
    isCloasable?: boolean
  }>(),
  {
    isCloasable: true
  }
)
const isModalOpen = defineModel<boolean>({ default: false })

function closeModal() {
  if (props.isCloasable) isModalOpen.value = false
}
</script>
