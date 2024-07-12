<template>
  <div class="flex flex-col border rounded-lg shadow-md p-4 pb-14 w-full">
    <Modal v-model="isBookRideModalOpen">
      <template #modalContent>
        <div class="bg-white p-4 rounded-lg w-96">
          <div>
            <p class="text-lg font-semibold text-primary">Nombre de place à réserver</p>
            <DropdownMenu :placement="'bottom'" :offset="[0, 0]">
              <template #activator="{ show }">
                <button
                  class="border border-secondary/20 text-left text-primary w-full px-2 py-1.5 rounded-[6px] bg-white"
                  @click="show()"
                >
                  {{ seatsToBook }}
                </button>
              </template>
              <template #content="{ hide }">
                <ul class="w-80 max-h-64 overflow-auto text-secondary font-medium text-lg">
                  <li
                    v-for="seat in ride.availableSeats"
                    :key="seat"
                    class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                    @click=";(seatsToBook = seat), hide()"
                  >
                    {{ seat }}
                  </li>
                </ul>
              </template>
            </DropdownMenu>
          </div>
          <div class="flex justify-center">
            <button
              class="bg-success text-white hover:bg-success/40 hover:text-black px-4 py-1 rounded-lg mt-4 disabled:bg-success/40 disabled:cursor-not-allowed"
              @click="bookRide()"
              :disabled="seatsToBook === 0"
            >
              Confirmer
            </button>
          </div>
        </div>
      </template>
    </Modal>
    <div class="w-full">
      <img :src="ride.carImage" alt="car" class="max-h-48 mx-auto" />
    </div>
    <div class="space-y-4">
      <p class="xl:text-2xl lg:text-lg text-2xl">
        {{ ride.departure }} {{ '---->' }} {{ ride.destination }}
      </p>
      <p class="xl:text-2xl lg:text-lg text-2xl">{{ formatDate(ride.dateTime) }}</p>
      <p class="xl:text-2xl lg:text-lg text-2xl">{{ ride.price }} TND</p>
      <div class="flex items-center gap-2 xl:text-2xl lg:text-lg text-2xl">
        <img src="/whatsapp.png" alt="whatsapp" class="w-8 h-8" />{{ ride.whatsapp }}
      </div>
      <div class="flex items-center gap-2 xl:text-2xl lg:text-lg text-2xl">
        <img src="/phone.png" alt="phone" class="w-8 h-8" />{{ ride.phone }}
      </div>
      <div class="flex items-center gap-2 xl:text-2xl lg:text-lg text-2xl">
        <img src="/email.png" alt="email" class="w-8 h-8" />{{ ride.email }}
      </div>
      <div
        class="absolute bottom-2 left-0 px-4 w-full flex justify-between items-center"
        v-if="showReservationButton"
      >
        <button
          class="bg-success text-white hover:bg-success/40 hover:text-black px-4 py-1 rounded-lg disabled:cursor-not-allowed disabled:bg-success/40 disabled:text-black"
          @click="isBookRideModalOpen = true"
          :disabled="ride.availableSeats === 0"
        >
          Réserver
        </button>
        <div class="flex justify-evenly items-end gap-2">
          <p class="text-lg text-primary">{{ ride.availableSeats }}</p>
          <AvailablesSeatsIcon class="w-8 h-8" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DisplayRide } from '../api'
import { AvailablesSeatsIcon } from '../assets/icons'
import { formatDate } from '../utils'
import { DropdownMenu, Modal, useSnackbar } from '../components'
import { inject, ref } from 'vue'
import { ReservationClient } from '../api/reservationApi'

const props = defineProps<{
  ride: DisplayRide
  showReservationButton?: boolean
}>()
const emit = defineEmits<(e: 'rideBooked') => void>()

const reservationClient: ReservationClient = inject('reservationClient') as ReservationClient

const { openSnackbar } = useSnackbar()

const isBookRideModalOpen = ref(false)
const seatsToBook = ref(0)

async function bookRide() {
  try {
    await reservationClient.creatNewReservation(props.ride.id, seatsToBook.value)
    openSnackbar('Voyage réservé avec succès', 'success')
    emit('rideBooked')
    isBookRideModalOpen.value = false
  } catch (error) {
    openSnackbar('Une erreur est survenue. Veuillez réessayer ultérieurement', 'error')
  }
}
</script>
