<template>
  <div class="grid grid-cols-4 h-full gap-4">
    <div
      class="sticky top-20 col-span-1 border border-primary/20 rounded-lg h-fit p-2 bg-highlight"
    >
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
      <DateTimePicker v-model="selectedDate" class="mt-2" />
    </div>
    <div class="col-span-3 space-y-2 grid grid-rows-[auto,1fr]">
      <div v-if="isLoadingReservations" class="flex justify-center py-10">
        <LoadingIcon class="animate-spin w-32 h-32" />
      </div>
      <div v-else class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <RideSnippet
          v-if="availableReservations.length > 0"
          v-for="(reservation, index) in filteredReservations"
          :ride="reservation.ride"
          :key="index"
          class="relative"
        />
        <p
          v-else="availableReservations.length > 0"
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
import { DisplayReservation, ReservationClient } from '../api'
import { LoadingIcon } from '../assets/icons'

const reservationClient: ReservationClient = inject('reservationClient') as ReservationClient

const availableReservations = ref<DisplayReservation[]>([])
const isLoadingReservations = ref<boolean>(false)
async function loadReservations() {
  isLoadingReservations.value = true
  availableReservations.value = await reservationClient.getUserReservations()
  setTimeout(() => {
    isLoadingReservations.value = false
  }, 1000)
}

const filteredReservations = computed(() => {
  const filteredDepartureStates = availableReservations.value.filter((reservation) => {
    if (selectedDeartureState.value)
      return reservation.ride.departure.includes(selectedDeartureState.value.stateName)
    else return reservation
  })
  const filteredDepartureRegions = filteredDepartureStates.filter((reservation) => {
    if (selectedDepartureRegion.value)
      return reservation.ride.destination.includes(selectedDepartureRegion.value)
    else return reservation
  })
  const filteredDestinationStates = filteredDepartureRegions.filter((reservation) => {
    if (selectedDestinationState.value)
      return reservation.ride.departure.includes(selectedDestinationState.value.stateName)
    else return reservation
  })
  const filteredDestinationRegions = filteredDestinationStates.filter((reservation) => {
    if (selectedDestinationRegion.value)
      return reservation.ride.departure.includes(selectedDestinationRegion.value)
    else return reservation
  })
  const filteredDates = filteredDestinationRegions.filter((reservation) => {
    if (selectedDate.value)
      return (
        reservation.ride.dateTime.getFullYear() === selectedDate.value.getFullYear() &&
        reservation.ride.dateTime.getMonth() === selectedDate.value.getMonth() &&
        reservation.ride.dateTime.getDate() === selectedDate.value.getDate()
      )
    else return reservation
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
  loadReservations()
})
</script>
