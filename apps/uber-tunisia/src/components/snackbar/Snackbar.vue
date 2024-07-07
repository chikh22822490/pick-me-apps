<template>
  <Transition name="fade-slide">
    <div
      v-if="isSnackbarOpen"
      class="absolute w-full left-0 bottom-5 z-50 flex justify-center"
      @click="closeSnackbar"
      :key="snackbarMessage + snackbarVariant"
    >
      <div
        class="relative w-snackbar flex items-center py-3 px-4 rounded-lg bg-opacity-80 mx-auto"
        :class="{
          'bg-success': snackbarVariant === 'success',
          'bg-info': snackbarVariant === 'info',
          'bg-warning': snackbarVariant === 'warning',
          'bg-error': snackbarVariant === 'error'
        }"
      >
        <div class="flex justify-center items-center">
          <SuccessIcon v-if="snackbarVariant === 'success'" />
          <WarningIcon v-else-if="snackbarVariant === 'warning'" />
          <ErrorIcon v-else-if="snackbarVariant === 'error'" />
          <InfoIcon v-else-if="snackbarVariant === 'info'" />
        </div>
        <div class="flex justify-center items-center mr-auto px-2">
          {{ snackbarMessage }}
        </div>
        <div class="flex justify-end items-center ml-auto">
          <button @click="closeSnackbar" class="hover:bg-btn-background">
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#004452"
                d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSnackbar } from './index'
import { SuccessIcon, WarningIcon, ErrorIcon, InfoIcon } from '../../assets/icons'

const { isSnackbarOpen, snackbarMessage, snackbarVariant, closeSnackbar } = useSnackbar()
const isSmallerThanTabletScreen = ref<boolean>(window.innerWidth < 1280)
window.addEventListener('resize', onResize)
function onResize() {
  isSmallerThanTabletScreen.value = window.innerWidth < 1280
}
</script>

<style scoped>
.fade-slide-enter-from {
  opacity: 0%;
  transform: translateY(50%);
}
.fade-slide-leave-to {
  opacity: 0%;
  transform: translateY(-50%);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 100%;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
