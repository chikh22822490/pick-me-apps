<template>
  <div class="sticky top-0 bg-white z-10 border-b flex justify-between h-16">
    <div class="flex items-center">
      <RouterLink
        to="/"
        class="hover:underline underline-offset-8 hover:bg-highlight h-full flex items-center px-6"
      >
        <img src="/pick-me-logo.png" alt="logo" class="h-14 w-14" />
        Acceuil
      </RouterLink>
      <RouterLink
        to="/reservations"
        class="hover:underline underline-offset-8 hover:bg-highlight h-full flex items-center px-4"
      >
        Mes réservations
      </RouterLink>
      <RouterLink
        to="/rides"
        class="hover:underline underline-offset-8 hover:bg-highlight h-full flex items-center px-4"
      >
        Mes voyages
      </RouterLink>
    </div>
    <div class="w-60 border-l h-full">
      <DropdownMenu :placement="'bottom-end'" :arrow="false" :offset="[0, 0]">
        <template #activator="{ show }">
          <button
            type="button"
            class="px-4 h-full w-full flex justify-between items-center gap-3 hover:bg-highlight"
            @click="show()"
            aria-label="profile menu"
          >
            <img
              v-if="userAvatar"
              alt="user avatar"
              :src="userAvatar"
              class="h-10 w-10 rounded-full"
            />
            <DefaultAvatar v-else class="w-10 h-10" />
            <p
              class="font-normal text-base text-primary leading-5 underline tabletScreenOrSmaller:hidden whitespace-nowrap"
            >
              {{ userFullName }}
            </p>
            <ChevronDown class="tabletScreenOrSmaller:hidden" />
          </button>
        </template>
        <template #content>
          <div class="min-w-[250px] divide-y divide-gray-100">
            <RouterLink
              to="/profile"
              class="flex items-center gap-2 p-2 w-full text-left rounded text-secondary text-sm font-medium hover:bg-btn-background"
            >
              <AccountIcon class="w-5 h-5" />
              Mon compte
            </RouterLink>
            <button
              @click="logout"
              class="flex items-center gap-2 p-2 w-full text-left rounded text-secondary text-sm font-medium hover:bg-btn-background"
            >
              <LogoutIcon class="w-5 h-5" />
              Se déconnecter
            </button>
          </div>
        </template>
      </DropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import DropdownMenu from './DropdownMenu.vue'
import { DefaultAvatar, LogoutIcon, ChevronDown, AccountIcon } from '../assets/icons'
import { inject, onMounted, ref } from 'vue'
import { AuthInstance } from '../utils'
import { UserClient } from '../api/userApi'

const authInstance: AuthInstance = inject('authInstance') as AuthInstance
const userClient = inject('userClient') as UserClient

const emits = defineEmits<{ (e: 'logout'): void; (e: 'redirectToAdminDashboard'): void }>()

function logout() {
  authInstance.CallLogOut()
}

const userFullName = ref('')
const userAvatar = ref('')
onMounted(async () => {
  userFullName.value = (await authInstance.GetUserInfo()).fullname
  userAvatar.value = await userClient.getUserAvatar()
})
</script>
