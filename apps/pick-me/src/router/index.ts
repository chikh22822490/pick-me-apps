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
        path: '/rides',
        meta: {
          name: 'Home'
        },
        component: () => import('../views/RidesListingView.vue')
      },
      {
        path: '/reservations',
        meta: {
          name: 'Home'
        },
        component: () => import('../views/ReservationsListingView.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileSettingView.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        meta: {
          name: 'notfound'
        },
        component: () => import('../views/NotFound.vue')
      }
    ]
  })
}
