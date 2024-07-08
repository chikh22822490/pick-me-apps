<template>
  <div class="h-screen w-screen overflow-hidden">
    <AppNav />
    <RouterView class="p-4" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { AppNav } from './components'
</script>
