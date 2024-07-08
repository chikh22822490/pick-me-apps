<template>
  <div class="flex flex-col gap-y-4 border rounded-lg shadow-md p-4 w-full">
    <div class="w-full">
      <img :src="ride.image" alt="car" />
    </div>
    <div class="space-y-4">
      <p class="xl:text-2xl lg:text-lg text-2xl">
        Départ, région {{ '---->' }} Destination, région
      </p>
      <p class="xl:text-2xl lg:text-lg text-2xl">{{ formatDate(ride.date) }}</p>
      <p class="xl:text-2xl lg:text-lg text-2xl">{{ ride.price }} TND</p>
      <div class="flex justify-center">
        <button
          class="bg-green-700 text-white hover:bg-green-400 hover:text-black px-4 py-1 rounded-lg"
        >
          Plus d'infos
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatDate } from '../utils'
defineProps<{
  ride: { image: string; date: Date; price: number }
}>()
</script>
