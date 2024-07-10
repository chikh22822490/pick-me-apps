<template>
  <div class="grid grid-cols-4 h-full gap-4">
    <div class="col-span-1 border border-primary/20 rounded-lg h-fit p-2 bg-highlight">
      <p class="text-primary text-xl">Choisissez votre déstination</p>
      <div class="grid grid-cols-[auto,1fr] w-full items-center gap-2 mt-2">
        <p class="text-primary">Ville:</p>
        <DropdownMenu :placement="'bottom'" :arrow="false" :offset="[0, 12]">
          <template #activator="{ show }">
            <button
              class="border border-secondary/20 text-left text-primary w-full px-2 py-1.5 rounded-[6px] bg-white"
              @click="show()"
            >
              {{ selectedState?.stateName || 'Ville' }}
            </button>
          </template>
          <template #content="{ hide }">
            <ul class="w-96 max-h-64 overflow-auto text-secondary font-medium text-lg">
              <li
                v-for="state in mapFilters"
                :key="state.stateName"
                class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                @click=";(selectedState = state), hide()"
              >
                {{ state.stateName }}
              </li>
            </ul>
          </template>
        </DropdownMenu>
      </div>
      <div class="grid grid-cols-[auto,1fr] w-full items-center gap-2 mt-2">
        <p class="text-primary">Délégation:</p>
        <DropdownMenu :placement="'bottom'" :arrow="false" :offset="[0, 12]">
          <template #activator="{ show }">
            <button
              class="border border-secondary/20 text-left text-primary w-full px-2 py-1.5 rounded-[6px] bg-white"
              @click="show()"
            >
              {{ selectedRegion || 'Délégation' }}
            </button>
          </template>
          <template #content="{ hide }">
            <ul class="w-96 max-h-64 overflow-auto text-secondary font-medium text-lg">
              <li
                v-for="region in selectedState?.regions"
                :key="region"
                class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                @click=";(selectedRegion = region), hide()"
              >
                {{ region }}
              </li>
            </ul>
          </template>
        </DropdownMenu>
      </div>

      <p class="text-primary text-xl mt-6">Choisissez une date</p>
      <DateTimePicker v-model="selectedDate" class="mt-2" />
    </div>
    <div class="col-span-3 space-y-2 grid grid-rows-[auto,1fr] overflow-hidden">
      <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto">
        <RideSnippet
          v-if="availableRides.length > 0"
          v-for="(ride, index) in filteredRides"
          :ride="ride"
          :key="index"
        />
        <p
          v-else="availableRides.length > 0"
          class="col-span-3 text-primary text-2xl font-semibold text-center"
        >
          Aucun voyage disponible
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import { DateTimePicker, RideSnippet } from '../components'
import DropdownMenu from '../components/DropdownMenu.vue'
import { mapFilters } from '../utils'
import { DisplayRide, RideClient } from '../api'

const rideClient: RideClient = inject('rideClient') as RideClient

const availableRides = ref<DisplayRide[]>([])
const isLoadingRides = ref<boolean>(false)
async function loadRides() {
  isLoadingRides.value = true
  availableRides.value = await rideClient.getAllRides()
  isLoadingRides.value = false
}

const filteredRides = computed(() => {
  const filteredStates = availableRides.value.filter((ride) => {
    if (selectedState.value) return ride.departure.includes(selectedState.value.stateName)
    else return ride
  })
  const filteredRegions = filteredStates.filter((ride) => {
    if (selectedRegion.value) return ride.departure.includes(selectedRegion.value)
    else return ride
  })
  const filteredDates = filteredRegions.filter((ride) => {
    if (selectedDate.value)
      return (
        ride.dateTime.getFullYear() === selectedDate.value.getFullYear() &&
        ride.dateTime.getMonth() === selectedDate.value.getMonth() &&
        ride.dateTime.getDate() === selectedDate.value.getDate()
      )
    else return ride
  })
  return filteredDates
})

const selectedState = ref<{
  stateName: string
  regions: string[]
}>()
const selectedRegion = ref('')
const selectedDate = ref<Date>()

onMounted(() => {
  loadRides()
})
</script>
