<template>
  <div class="flex flex-col gap-y-4 border rounded-lg shadow-md p-4 w-full">
    <div class="w-full">
      <img :src="ride.carImage" alt="car" class="max-h-48 mx-auto" />
    </div>
    <div class="space-y-4">
      <p class="xl:text-2xl lg:text-lg text-2xl">
        {{ ride.departure }} {{ '---->' }} {{ ride.destination }}
      </p>
      <p class="xl:text-2xl lg:text-lg text-2xl">{{ formatDate(ride.dateTime) }}</p>
      <p class="xl:text-2xl lg:text-lg text-2xl">{{ ride.price }} TND</p>
      <div class="flex justify-center">
        <button
          class="bg-success text-white hover:bg-success/40 hover:text-black px-4 py-1 rounded-lg"
        >
          Plus d'infos
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DisplayRide } from '../api'
import { formatDate } from '../utils'
defineProps<{
  ride: DisplayRide
}>()
</script>
