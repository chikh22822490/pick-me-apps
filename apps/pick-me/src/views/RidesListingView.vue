<template>
  <div class="grid grid-cols-4 h-full gap-4">
    <div class="fixed top-20 w-1/4 pr-4 col-span-1 flex flex-col justify-between">
      <div class="w-full col-span-1 border border-primary/20 rounded-lg p-2 bg-highlight">
        <p class="text-primary text-xl">Choisissez votre départ</p>
        <div class="grid grid-cols-[auto,1fr] w-full items-center gap-2 mt-2">
          <p class="text-primary">Ville:</p>
          <DropdownMenu :placement="'bottom'" :arrow="false" :offset="[0, 12]">
            <template #activator="{ show }">
              <button
                class="border border-secondary/20 text-left text-primary w-full px-2 py-1.5 rounded-[6px] bg-white"
                @click="show()"
              >
                {{ selectedDeartureState?.stateName || 'Ville' }}
              </button>
            </template>
            <template #content="{ hide }">
              <ul class="w-96 max-h-64 overflow-auto text-secondary font-medium text-lg">
                <li
                  class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                  @click=";(selectedDeartureState = undefined), hide()"
                >
                  Tout
                </li>
                <li
                  v-for="state in mapFilters"
                  :key="state.stateName"
                  class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                  @click=";(selectedDeartureState = state), hide()"
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
                {{ selectedDepartureRegion || 'Délégation' }}
              </button>
            </template>
            <template #content="{ hide }">
              <ul class="w-96 max-h-64 overflow-auto text-secondary font-medium text-lg">
                <li
                  class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                  @click=";(selectedDepartureRegion = undefined), hide()"
                >
                  Tout
                </li>
                <li
                  v-for="region in selectedDeartureState?.regions"
                  :key="region"
                  class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                  @click=";(selectedDepartureRegion = region), hide()"
                >
                  {{ region }}
                </li>
              </ul>
            </template>
          </DropdownMenu>
        </div>
        <p class="text-primary text-xl mt-4">Choisissez votre déstination</p>
        <div class="grid grid-cols-[auto,1fr] w-full items-center gap-2 mt-2">
          <p class="text-primary">Ville:</p>
          <DropdownMenu :placement="'bottom'" :arrow="false" :offset="[0, 12]">
            <template #activator="{ show }">
              <button
                class="border border-secondary/20 text-left text-primary w-full px-2 py-1.5 rounded-[6px] bg-white"
                @click="show()"
              >
                {{ selectedDestinationState?.stateName || 'Ville' }}
              </button>
            </template>
            <template #content="{ hide }">
              <ul class="w-96 max-h-64 overflow-auto text-secondary font-medium text-lg">
                <li
                  class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                  @click=";(selectedDestinationState = undefined), hide()"
                >
                  Tout
                </li>
                <li
                  v-for="state in mapFilters"
                  :key="state.stateName"
                  class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                  @click=";(selectedDestinationState = state), hide()"
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
                {{ selectedDestinationRegion || 'Délégation' }}
              </button>
            </template>
            <template #content="{ hide }">
              <ul class="w-96 max-h-64 overflow-auto text-secondary font-medium text-lg">
                <li
                  class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                  @click=";(selectedDestinationRegion = undefined), hide()"
                >
                  Tout
                </li>
              </ul>
            </template>
          </DropdownMenu>
        </div>

        <p class="text-primary text-xl mt-6">Choisissez une date</p>
        <DateTimePicker
          v-model="selectedDate"
          class="mt-2"
          :minDate="
            new Date(
              new Date(Date.now()).getFullYear(),
              new Date(Date.now()).getMonth(),
              new Date(Date.now()).getDate() + 1
            )
          "
        />
      </div>
      <CreateNewRideModal @rideCreated="loadRides" class="fixed bottom-4 left-4" />
    </div>
    <div></div>
    <div class="col-span-3 space-y-2 grid grid-rows-[auto,1fr] overflow-auto">
      <div v-if="isLoadingRides" class="flex justify-center py-10">
        <LoadingIcon class="animate-spin w-32 h-32" />
      </div>
      <div v-else class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto">
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
import CreateNewRideModal from './CreateNewRideModal.vue'
import { LoadingIcon } from '../assets/icons'

const rideClient: RideClient = inject('rideClient') as RideClient

const availableRides = ref<DisplayRide[]>([])
const isLoadingRides = ref<boolean>(false)
async function loadRides() {
  isLoadingRides.value = true
  availableRides.value = await rideClient.getUserRides()
  setTimeout(() => {
    isLoadingRides.value = false
  }, 1000)
}

const filteredRides = computed(() => {
  const filteredDepartureStates = availableRides.value.filter((ride) => {
    if (selectedDeartureState.value)
      return ride.departure.includes(selectedDeartureState.value.stateName)
    else return ride
  })
  const filteredDepartureRegions = filteredDepartureStates.filter((ride) => {
    if (selectedDepartureRegion.value)
      return ride.destination.includes(selectedDepartureRegion.value)
    else return ride
  })
  const filteredDestinationStates = filteredDepartureRegions.filter((ride) => {
    if (selectedDestinationState.value)
      return ride.departure.includes(selectedDestinationState.value.stateName)
    else return ride
  })
  const filteredDestinationRegions = filteredDestinationStates.filter((ride) => {
    if (selectedDestinationRegion.value)
      return ride.departure.includes(selectedDestinationRegion.value)
    else return ride
  })
  const filteredDates = filteredDestinationRegions.filter((ride) => {
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

const selectedDestinationState = ref<{
  stateName: string
  regions: string[]
}>()
const selectedDestinationRegion = ref<string>()
const selectedDeartureState = ref<{
  stateName: string
  regions: string[]
}>()
const selectedDepartureRegion = ref<string>()
const selectedDate = ref<Date>()

onMounted(() => {
  loadRides()
})

</script>
