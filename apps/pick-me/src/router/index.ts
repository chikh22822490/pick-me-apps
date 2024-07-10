import { createRouter, createWebHistory } from 'vue-router'

export default () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        meta: {
          name: 'Home'
        },
        component: () => import('../views/DashboardView.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileSettingView.vue')
      }
    ]
  })
}
