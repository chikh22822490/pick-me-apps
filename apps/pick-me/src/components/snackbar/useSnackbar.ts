import { ref } from 'vue'

const isSnackbarOpen = ref<boolean>(false)
const snackbarMessage = ref<string>('')
const snackbarVariant = ref<string>('')
const snackbarTimeout = ref()

export function useSnackbar() {
  function openSnackbar(message: string, variant: 'success' | 'info' | 'warning' | 'error') {
    if (snackbarTimeout.value) {
      clearTimeout(snackbarTimeout.value)
      closeSnackbar()
    }
    snackbarVariant.value = variant
    snackbarMessage.value = message
    isSnackbarOpen.value = true
    snackbarTimeout.value = setTimeout(() => {
      isSnackbarOpen.value = false
    }, 5000)
  }

  function closeSnackbar() {
    clearTimeout(snackbarTimeout.value)
    isSnackbarOpen.value = false
    snackbarMessage.value = ''
    snackbarVariant.value = ''
  }

  return {
    isSnackbarOpen,
    snackbarMessage,
    snackbarVariant,
    openSnackbar,
    closeSnackbar
  }
}
