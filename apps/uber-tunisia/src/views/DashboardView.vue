<template>
  <div class="grid grid-cols-4 h-full">
    <div class="col-span-1 bg-slate-500">filters</div>
    <div class="col-span-3 space-y-2 grid grid-rows-[auto,1fr] overflow-hidden">
      <div class="flex justify-end items-center">
        <button class="text-sm bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-300">
          Ajouter un trajet
        </button>
      </div>
      <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 overflow-auto">
        <RideSnippet v-for="(ride, index) in fakeRides" :ride="ride" :key="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RideSnippet } from '../components'
import fakeRides from '../fakeData/fakeRides'
</script>
