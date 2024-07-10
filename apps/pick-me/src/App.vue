<template>
  <Snackbar />
  <div class="h-screen grid grid-rows-[auto,1fr] overflow-hidden">
    <AppNav />
    <RouterView class="p-4" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { AppNav, Snackbar } from './components'
</script>
