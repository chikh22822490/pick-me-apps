<template>
  <div v-if="isLoading" class="h-full w-full flex justify-center items-start mt-20">
    <LoadingIcon class="animate-spin mx-auto" />
  </div>
  <div v-else class="flex flex-col items-center justify-center w-fit mx-auto">
    <div class="grid lg:grid-cols-3 grid-cols-1 w-full gap-7">
      <div class="col-span-1 flex flex-col items-center h-fit w-full">
        <Card variant="outlined" class="w-full">
          <template #content>
            <div class="flex flex-col items-center justify-center space-y-2">
              <div class="relative w-52 h-52 flex flex-col items-center justify-center">
                <div
                  class="absolute left-0 top-0 h-full w-full flex justify-end opacity-0 hover:opacity-100 cursor-pointer bg-gray-500/20"
                >
                  <EditIcon class="w-5 h-5 mt-2 mr-2" />

                  <label for="avatarUpload" class="absolute cursor-pointer h-full w-full">
                    <input
                      id="avatarUpload"
                      aria-label="avatarUpload"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="(event) => validateAvatar(event)"
                    />
                  </label>
                </div>
                <img
                  v-if="userAvatarBase64String"
                  :src="userAvatarBase64String"
                  alt=""
                  class="max-h-[200px] max-w-[200px]"
                />
                <DefaultAvatar v-else class="max-h-[200px] max-w-[200px]" />
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div class="flex justify-evenly items-center space-x-6 mt-8">
                <button
                  class="w-40 bg-success/50 hover:bg-success/40 hover:bg-green-200 px-4 py-2 rounded-lg whitespace-nowrap"
                  @click="setAvatar"
                >
                  Changer Avatar
                </button>
              </div>
              <p
                class="mt-2 text-sm text-red-600"
                :class="avatarErrorMessage.length > 0 ? 'flex' : 'invisible'"
              >
                {{ avatarErrorMessage }}
              </p>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-span-1 lg:col-span-2 flex flex-col items-center h-fit w-full space-y-7">
        <Card variant="outlined" class="w-full">
          <template #title>
            <div class="w-full">
              <p class="mb-6 text-xl font-medium text-primary">Détails du profil</p>
            </div>
          </template>
          <template #content>
            <div class="px-4 space-y-4">
              <div
                class="flex flex-col justify-center lg:flex-row lg:items-center gap-4 lg:justify-between whitespace-nowrap"
              >
                <label for="firstname" class="text-sm font-medium text-primary">Prénom</label>
                <div class="w-full lg:w-1/2">
                  <input
                    id="firstname"
                    type="text"
                    v-model="user.firstName"
                    @input="validateUserFirstname"
                    class="bg-btn-background border ring-0 text-sm rounded-lg w-full p-2.5 focus:outline-none"
                    :class="
                      userFirstnameErrorMessage.length > 0
                        ? 'border-red-500'
                        : 'border-secondary focus:border-secondary'
                    "
                  />
                  <p
                    class="mt-2 text-sm text-red-600"
                    :class="userFirstnameErrorMessage.length > 0 ? 'flex' : 'invisible'"
                  >
                    {{ userFirstnameErrorMessage }}
                  </p>
                </div>
              </div>
              <div
                class="flex flex-col justify-center lg:flex-row lg:items-center gap-4 lg:justify-between whitespace-nowrap"
              >
                <label for="lastname" class="text-sm font-medium text-primary">Nom</label>
                <div class="w-full lg:w-1/2">
                  <input
                    id="lastname"
                    type="text"
                    v-model="user.lastName"
                    @input="validateUserLastname"
                    class="bg-btn-background border ring-0 text-sm rounded-lg w-full p-2.5 focus:outline-none"
                    :class="
                      userLastnameErrorMessage.length > 0
                        ? 'border-red-500'
                        : 'border-secondary focus:border-secondary'
                    "
                  />
                  <p
                    class="mt-2 text-sm text-red-600"
                    :class="userLastnameErrorMessage.length > 0 ? 'flex' : 'invisible'"
                  >
                    {{ userLastnameErrorMessage }}
                  </p>
                </div>
              </div>
              <div
                class="flex flex-col justify-center lg:flex-row lg:items-center gap-4 lg:justify-between whitespace-nowrap"
              >
                <label for="email" class="text-sm font-medium text-primary">Adresse E-mail</label>
                <div class="w-full lg:w-1/2">
                  <input
                    id="email"
                    type="email"
                    v-model="user.email"
                    @input="validateUserEmail"
                    class="bg-btn-background border ring-0 text-sm rounded-lg w-full p-2.5 focus:outline-none"
                    :class="
                      userEmailErrorMessage.length > 0
                        ? 'border-red-500'
                        : 'border-secondary focus:border-secondary'
                    "
                  />
                  <p
                    class="mt-2 text-sm text-red-600"
                    :class="userEmailErrorMessage.length > 0 ? 'flex' : 'invisible'"
                  >
                    {{ userEmailErrorMessage }}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="flex justify-evenly items-center space-x-6 mt-4">
                <button
                  class="bg-success/50 hover:bg-success/40 hover:bg-green-200 px-4 py-2 rounded-lg whitespace-nowrap disabled:opacity-40 disabled:hover:bg-success/50 disabled:cursor-not-allowed"
                  @click="updateProfile"
                  :disabled="
                    userEmailErrorMessage.length > 0 ||
                    userLastnameErrorMessage.length > 0 ||
                    userFirstnameErrorMessage.length > 0
                  "
                >
                  Mettre à jour coordonnées
                </button>
              </div>
            </div>
          </template>
        </Card>
        <Card variant="outlined" class="w-full">
          <template #title>
            <p class="mb-6 text-xl font-medium text-primary">Mot de passe</p>
          </template>
          <template #content>
            <div class="px-4 space-y-4">
              <div class="flex w-full space-x-2">
                <div
                  class="w-full flex flex-col justify-center lg:flex-row lg:items-center gap-4 lg:justify-between whitespace-nowrap"
                >
                  <label for="newPassword" class="text-sm font-medium text-primary"
                    >Nouveau mot de passe</label
                  >
                  <div class="w-full lg:w-1/2">
                    <input
                      id="newPassword"
                      :type="isNewPasswordVisible ? 'text' : 'password'"
                      v-model="newPassword"
                      class="bg-btn-background border ring-0 text-sm rounded-lg w-full p-2.5 focus:outline-none"
                      :class="
                        newPasswordErrorMessage.length > 0
                          ? 'border-red-500'
                          : 'border-secondary focus:border-secondary'
                      "
                      @input="validatePassword"
                    />
                    <p
                      class="mt-2 text-sm text-red-600"
                      :class="newPasswordErrorMessage.length > 0 ? 'flex' : 'invisible'"
                    >
                      {{ newPasswordErrorMessage }}
                    </p>
                  </div>
                </div>
                <button
                  class="h-fit mt-12 lg:mt-3"
                  @click="isNewPasswordVisible = !isNewPasswordVisible"
                >
                  <EyeIcon />
                </button>
              </div>
              <div class="flex w-full space-x-2">
                <div
                  class="w-full flex flex-col justify-center lg:flex-row lg:items-center gap-4 lg:justify-between whitespace-nowrap"
                >
                  <label for="newPasswordConfirmation" class="text-sm font-medium text-primary"
                    >Confirmation du mot de passe</label
                  >
                  <div class="w-full lg:w-1/2">
                    <input
                      id="newPasswordConfirmation"
                      :type="isNewPasswordConfirmationVisible ? 'text' : 'password'"
                      v-model="newPasswordConfirmation"
                      class="bg-btn-background border ring-0 text-sm rounded-lg w-full p-2.5 focus:outline-none"
                      :class="
                        newPasswordConfirmationErrorMessage.length > 0
                          ? 'border-red-500'
                          : 'border-secondary focus:border-secondary'
                      "
                      @input="validatePasswordConfirmation"
                    />
                    <p
                      class="mt-2 text-sm text-red-600"
                      :class="newPasswordConfirmationErrorMessage.length > 0 ? 'flex' : 'invisible'"
                    >
                      {{ newPasswordConfirmationErrorMessage }}
                    </p>
                  </div>
                </div>
                <button
                  class="h-fit mt-12 lg:mt-3"
                  @click="isNewPasswordConfirmationVisible = !isNewPasswordConfirmationVisible"
                >
                  <EyeIcon />
                </button>
              </div>
            </div>
            <div>
              <div class="flex justify-evenly items-center space-x-6 mt-4">
                <button
                  class="bg-success/50 hover:bg-success/40 px-4 py-2 rounded-lg whitespace-nowrap disabled:opacity-40 disabled:hover:bg-success/50 disabled:cursor-not-allowed"
                  @click="updatePassword"
                  :disabled="newPassword.length < 1 || newPasswordConfirmation.length < 1"
                >
                  Changer le mot de passe
                </button>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div class="mt-8">
      <button class="w-40 bg-gray-300 hover:bg-gray-200 px-4 py-2 rounded-lg" @click="resetForm">
        Réinitialiser
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, useSnackbar } from '../components'
import { AuthInstance, fileToBase64 } from '../utils'
import { inject, onMounted, ref } from 'vue'
import { LoadingIcon, EditIcon, EyeIcon, DefaultAvatar } from '../assets/icons'
import { UsersClient } from '../api/userApi'

const authInstance: AuthInstance = inject('authInstance') as AuthInstance
const userClient = inject('userClient') as UsersClient
const { openSnackbar } = useSnackbar()
const isLoading = ref(false)
const user = ref({
  firstName: '',
  lastName: '',
  fullname: '',
  email: ''
})

const userFirstnameErrorMessage = ref('')
const userLastnameErrorMessage = ref('')
const userEmailErrorMessage = ref('')

function validateUserFirstname() {
  if (user.value.firstName.length < 1) {
    userFirstnameErrorMessage.value = 'Veuillez saisir un nouveau mot de passe'
  } else {
    userFirstnameErrorMessage.value = ''
  }
}
function validateUserLastname() {
  if (user.value.lastName.length < 1) {
    userLastnameErrorMessage.value = 'Veuillez saisir un nouveau mot de passe'
  } else {
    userLastnameErrorMessage.value = ''
  }
}
function validateUserEmail() {
  if (user.value.email.length < 1) {
    userEmailErrorMessage.value = 'Veuillez saisir un nouveau mot de passe'
  } else {
    userEmailErrorMessage.value = ''
  }
}
async function updateProfile() {
  validateUserFirstname()
  validateUserLastname()
  validateUserEmail()
  if (
    userFirstnameErrorMessage.value.length === 0 &&
    userLastnameErrorMessage.value.length === 0 &&
    userEmailErrorMessage.value.length === 0
  ) {
    try {
      await updateUser(user.value.firstName, user.value.lastName, user.value.email)
      openSnackbar('Profil mis à jour avec succes', 'success')
      setTimeout(() => {
        openSnackbar('Actualisez la page pour appliquer les nouveaux changements', 'info')
      }, 5000)
    } catch (error) {
      openSnackbar('Une erreur est survenu lors de la mise à jour du profil', 'error')
    }
  }
}

const userAvatarFile = ref<File>()
const userAvatarBase64String = ref<string>('')
const avatarValidated = ref(true)
const avatarErrorMessage = ref('')
async function validateAvatar(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files?.length === 0) {
    avatarErrorMessage.value = 'Veuillez sélectionner un fichier image'
    avatarValidated.value = false
    return
  }
  avatarErrorMessage.value = ''
  userAvatarFile.value = target.files![0]
  const base64Data = await fileToBase64(userAvatarFile.value)
  userAvatarBase64String.value = 'data:image/*;base64,' + base64Data
  avatarValidated.value = true
}
async function setAvatar() {
  if (!userAvatarFile.value) {
    avatarErrorMessage.value = 'Veuillez sélectionner un fichier image'
    avatarValidated.value = false
  }
  if (avatarValidated.value && userAvatarFile.value && !avatarErrorMessage.value)
    try {
      await setUserAvatar(userAvatarFile.value)
      openSnackbar('Avatar mis à jour avec succes', 'success')
      setTimeout(() => {
        openSnackbar('Actualisez la page pour appliquer les nouveaux changements', 'info')
      }, 5000)
    } catch (error) {
      openSnackbar("Une erreur est survenu lors de la mise à jour de l'avatar", 'error')
    }
}

const newPassword = ref('')
const newPasswordErrorMessage = ref('')
const newPasswordConfirmation = ref('')
const newPasswordConfirmationErrorMessage = ref('')
const isNewPasswordVisible = ref(false)
const isNewPasswordConfirmationVisible = ref(false)

function validatePassword() {
  if (newPassword.value.length < 1) {
    newPasswordErrorMessage.value = 'Veuillez saisir un nouveau mot de passe'
  } else {
    newPasswordErrorMessage.value = ''
  }
}
function validatePasswordConfirmation() {
  if (newPasswordConfirmation.value.length < 1) {
    newPasswordConfirmationErrorMessage.value = 'Veuillez confirmer le nouveau mot de passe'
  } else {
    newPasswordConfirmationErrorMessage.value = ''
  }
}
async function updatePassword() {
  validatePassword()
  validatePasswordConfirmation()
  if (newPasswordConfirmation.value !== newPassword.value) {
    newPasswordConfirmationErrorMessage.value = "Mot de passe saisi n'est pas conforme"
  }
  if (
    newPasswordErrorMessage.value.length === 0 &&
    newPasswordConfirmationErrorMessage.value.length === 0
  ) {
    try {
      await updateUserPassword(newPassword.value)
      openSnackbar('Mot de passe mis à jour avec succes', 'success')
      newPassword.value = ''
      newPasswordConfirmation.value = ''
      isNewPasswordVisible.value = false
      isNewPasswordConfirmationVisible.value = false
    } catch (error) {
      openSnackbar('Une erreur est survenu lors de la mise à jour du mot de passe', 'error')
    }
  }
}

async function resetForm() {
  isLoading.value = true
  authInstance.GetUserInfo().then((info) => (user.value = info))
  getUserAvatar().then((avatar) => (userAvatarBase64String.value = avatar))
  isNewPasswordVisible.value = false
  isNewPasswordConfirmationVisible.value = false
  isLoading.value = false
}

onMounted(async () => {
  await resetForm()
})

async function updateUser(firstName: string, lastName: string, email: string): Promise<void> {
  try {
    await userClient.updateUser(firstName, lastName, email)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

async function updateUserPassword(newPassword: string): Promise<void> {
  try {
    await userClient.updateUserCredentials(newPassword)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

async function setUserAvatar(avatar: File): Promise<void> {
  try {
    await userClient.setUserAvatar(avatar)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

async function getUserAvatar(): Promise<string> {
  try {
    const avatarBase64String = await userClient.getUserAvatar()
    return avatarBase64String
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}
</script>
