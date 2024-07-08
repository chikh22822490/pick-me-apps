<template>
  <div>
    <VueDatePicker
      :uid="inputId"
      v-model="selectedDate"
      format="dd/MM/yyyy"
      :clearable="clearable"
      :allowed-dates="availableDates"
      :range="isRange"
      :max-date="maxDate ?? new Date(Date.now())"
      :min-date="minDate"
      :start-time="startTime"
      :enable-time-picker="isTime"
      :locale="locale"
      :select-text="selectText"
      :cancel-text="cancelText"
      input-class-name="dp-custom-input"
      :teleport-center="teleportCenter"
      :teleport="teleport"
      :auto-position="autoPosition"
      :alt-position="altPosition"
    >
      <template #action-preview=""></template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'

withDefaults(
  defineProps<{
    availableDates?: string[] | Date[]
    maxDate?: Date
    minDate?: Date
    isRange?: boolean
    isTime?: boolean
    format?: string
    locale?: string
    clearable?: boolean
    teleport?: boolean
    teleportCenter?: boolean
    autoPosition?: boolean
    selectText?: string
    cancelText?: string
    altPosition?: any
    inputId?: string
  }>(),
  {
    isRange: false,
    isTime: false,
    clearable: false,
    teleport: false,
    teleportCenter: false,
    autoPosition: false,
    selectText: 'Filtrer',
    cancelText: 'Annuler',
    format: 'dd/MM/yyyy',
    locale: 'fr-FR',
    inputId: 'dateTimePicker'
  }
)
const selectedDate = defineModel<Date | Date[]>()
const startTime = ref({ hours: 0, minutes: 0, seconds: 0 })
</script>

<style>
.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #00728a;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #00728a;
  --dp-primary-disabled-color: #86888a;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #96959586;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #004452;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #4ade80;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #00728a;
  --dp-danger-color: #ef4444;
  --dp-marker-color: #ef4444;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: #edf5f7;
}

:root {
  --dp-border-radius: 6px;
}
</style>
