<template>
  <div class="fixed bottom-4 left-4 w-1/4 flex justify-center pr-4">
    <button
      class="bg-primary text-white p-2 w-full rounded-lg hover:bg-primary/20 hover:text-black mt-4"
      @click="isNewRideModalOpen = true"
    >
      Ajouter un voyage
    </button>
  </div>
  <Modal v-model="isNewRideModalOpen">
    <template #modalContent>
      <form class="bg-white w-[500px] rounded-lg p-4">
        <p class="text-xl font-semibold text-primary">Ajouter un nouveau voyage</p>
        <div class="grid grid-cols-[auto,1fr,1fr] gap-2 items-center mt-4">
          <label for="destination">Départ</label>
          <DropdownMenu :placement="'bottom'" :arrow="false" :offset="[0, 12]">
            <template #activator="{ show }">
              <button
                class="border border-secondary/20 text-left text-primary w-full px-2 py-1.5 rounded-[6px] bg-white"
                @click.prevent="show()"
              >
                {{ selectedDeartureState?.stateName || 'Ville' }}
              </button>
            </template>
            <template #content="{ hide }">
              <ul class="w-52 max-h-64 overflow-auto text-secondary font-medium text-lg">
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
          <DropdownMenu :placement="'bottom'" :arrow="false" :offset="[0, 12]">
            <template #activator="{ show }">
              <button
                class="border border-secondary/20 text-left text-primary w-full px-2 py-1.5 rounded-[6px] bg-white"
                @click.prevent="show()"
              >
                {{ selectedDepartureRegion || 'Délégation' }}
              </button>
            </template>
            <template #content="{ hide }">
              <ul class="w-52 max-h-64 overflow-auto text-secondary font-medium text-lg">
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
        <div class="grid grid-cols-[auto,1fr,1fr] gap-2 items-center mt-2">
          <label for="destination">Déstination</label>
          <DropdownMenu :placement="'bottom'" :arrow="false" :offset="[0, 12]">
            <template #activator="{ show }">
              <button
                class="border border-secondary/20 text-left text-primary w-full px-2 py-1.5 rounded-[6px] bg-white"
                @click.prevent="show()"
              >
                {{ selectedDestinationState?.stateName || 'Ville' }}
              </button>
            </template>
            <template #content="{ hide }">
              <ul class="w-52 max-h-64 overflow-auto text-secondary font-medium text-lg">
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
          <DropdownMenu :placement="'bottom'" :arrow="false" :offset="[0, 12]">
            <template #activator="{ show }">
              <button
                class="border border-secondary/20 text-left text-primary w-full px-2 py-1.5 rounded-[6px] bg-white"
                @click.prevent="show()"
              >
                {{ selectedDestinationRegion || 'Délégation' }}
              </button>
            </template>
            <template #content="{ hide }">
              <ul class="w-52 max-h-64 overflow-auto text-secondary font-medium text-lg">
                <li
                  v-for="region in selectedDestinationState?.regions"
                  :key="region"
                  class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                  @click=";(selectedDestinationRegion = region), hide()"
                >
                  {{ region }}
                </li>
              </ul>
            </template>
          </DropdownMenu>
        </div>
        <div class="grid grid-cols-[1fr,1fr] gap-2 items-center mt-2">
          <p>Date</p>
          <DateTimePicker
            v-model="selectedDate"
            selectText="Confirmer"
            isTime
            format="dd/MM/yyyy, HH:mm"
            :minDate="
              new Date(
                new Date(Date.now()).getFullYear(),
                new Date(Date.now()).getMonth(),
                new Date(Date.now()).getDate() + 1
              )
            "
          />
        </div>
        <div class="grid grid-cols-[1fr,1fr] gap-2 items-center mt-2">
          <p>Nombre de places disponibles</p>
          <DropdownMenu :placement="'bottom'" :arrow="false" :offset="[0, 12]">
            <template #activator="{ show }">
              <button
                class="border border-secondary/20 text-left text-primary w-full px-2 py-1.5 rounded-[6px] bg-white"
                @click.prevent="show()"
              >
                {{ availableSeats }}
              </button>
            </template>
            <template #content="{ hide }">
              <ul class="w-96 max-h-64 overflow-auto text-secondary font-medium text-lg">
                <li
                  v-for="i = 1 in 8"
                  :key="i"
                  class="hover:bg-btn-background px-4 py-2 hover:cursor-pointer"
                  @click=";(availableSeats = i), hide()"
                >
                  {{ i }}
                </li>
              </ul>
            </template>
          </DropdownMenu>
        </div>
        <div class="grid grid-cols-[1fr,1fr] gap-2 items-center mt-2">
          <label for="price">Prix (en TND)</label>
          <input
            type="number"
            name="price"
            id="price"
            class="border border-secondary/20 rounded p-1.5 outline-none"
            v-model="price"
          />
        </div>
        <div class="grid grid-cols-[1fr,1fr] gap-2 items-center mt-2">
          <label for="carModel">Modèle de voiture</label>
          <input
            type="text"
            name="carModel"
            id="carModel"
            class="border border-secondary/20 rounded p-1.5 outline-none"
            v-model="carModel"
          />
        </div>
        <div class="grid grid-cols-[1fr,1fr] gap-2 items-center mt-2">
          <label for="carImage">Photo de voiture</label>
          <input
            type="file"
            name="carImage"
            id="carImage"
            class="border border-secondary/20 rounded p-1.5 outline-none"
            @change="(event: Event) => {
                const target = event.target as HTMLInputElement
                carImage = target.files![0]}"
          />
        </div>
        <div class="grid grid-cols-[1fr,1fr] gap-2 items-center mt-2">
          <label for="email">Adresse E-Mail</label>
          <input
            type="email"
            name="email"
            id="email"
            class="border border-secondary/20 rounded p-1.5 outline-none"
            v-model="email"
          />
        </div>
        <div class="grid grid-cols-[1fr,1fr] gap-2 items-center mt-2">
          <label for="phone">Contact Tel.</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="xx xxx xxx"
            pattern="[0-9]{2} [0-9]{3} [0-9]{3}"
            class="border border-secondary/20 rounded p-1.5 outline-none"
            v-model="phone"
          />
        </div>
        <div class="grid grid-cols-[1fr,1fr] gap-2 items-center mt-2">
          <label for="whatsapp">Contact whatsapp</label>
          <input
            type="text"
            name="whatsapp"
            id="whatsapp"
            class="border border-secondary/20 rounded p-1.5 outline-none"
            v-model="whatsapp"
          />
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="px-4 py-2 mt-4 bg-success text-white hover:bg-success/40 hover:text-black rounded-lg disabled:cursor-not-allowed disabled:bg-success/40"
            @click.prevent="createNewRide"
            :disabled="!isNewRideFormValid"
          >
            Créer un nouvaue voyage
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { Modal, DropdownMenu, DateTimePicker, useSnackbar } from '../components'
import { mapFilters } from '../utils'
import { RideClient } from '../api'

const emit = defineEmits<(e: 'rideCreated') => void>()
const rideClient: RideClient = inject('rideClient') as RideClient
const { openSnackbar } = useSnackbar()

const isNewRideModalOpen = ref(false)

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
const availableSeats = ref<number>(0)
const price = ref<number>(0)
const carModel = ref<string>()
const carImage = ref<File>()
const email = ref<string>()
const phone = ref<string>()
const whatsapp = ref<string>()

const isNewRideFormValid = computed(() => {
  if (!selectedDeartureState.value) return false
  if (!selectedDepartureRegion.value) return false
  if (!selectedDestinationState.value) return false
  if (!selectedDestinationRegion.value) return false
  if (!selectedDate.value) return false
  if (!availableSeats.value || availableSeats.value < 1) return false
  if (!price.value || price.value < 0) return false
  if (!carModel.value) return false
  if (!carImage.value) return false
  if (!email.value) return false
  if (!phone.value) return false
  if (!whatsapp.value) return false
  return true
})
async function createNewRide() {
  if (!isNewRideFormValid.value) return
  try {
    await rideClient.creatNewRide(
      selectedDeartureState.value!.stateName,
      selectedDepartureRegion.value!,
      selectedDestinationState.value!.stateName,
      selectedDestinationRegion.value!,
      selectedDate.value!,
      availableSeats.value,
      price.value,
      carModel.value!,
      carImage.value!,
      email.value!,
      phone.value!,
      whatsapp.value!
    )
    emit('rideCreated')
    openSnackbar('Voyage créé avec succès', 'success')
    resetForm()
  } catch (error) {
    openSnackbar(
      'Une erreur est survenue. Veuillez réessayer ultérieurement',
      'error'
    )
  }
}

function resetForm() {
  selectedDeartureState.value = undefined
  selectedDepartureRegion.value = undefined
  selectedDestinationState.value = undefined
  selectedDestinationRegion.value = undefined
  selectedDate.value = undefined
  availableSeats.value = 0
  price.value = 0
  carModel.value = undefined
  carImage.value = undefined
  email.value = undefined
  phone.value = undefined
  whatsapp.value = undefined
}
</script>
