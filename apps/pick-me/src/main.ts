import { createApp } from 'vue'
import AppVue from './App.vue'
import createRouter from './router'
import './assets/styles.css'
import { AuthInstance } from './utils'
import axios from 'axios'
import { UsersClient } from './api/userApi'

const axiosInstance = axios.create({})
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await authInstance.GetAccesToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: Error) => {
    return Promise.reject(error)
  }
)

const authInstance = new AuthInstance({
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  url: import.meta.env.VITE_KEYCLOAK_URL,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
})
authInstance.CallLogin(main)

async function main() {
  const app = createApp(AppVue)
  const userClient: UsersClient = new UsersClient(axiosInstance)

  app.use(createRouter())
  app.provide('authInstance', authInstance)
  app.provide('userClient', userClient)
  app.mount('#app')
}
