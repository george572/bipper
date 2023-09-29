import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import("@/views/LoginPage.vue"),

  },
  {
    path: '/storage',
    name: 'storage',
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: '/manage-products',
    name: 'manage-products',
    component: () => import("@/views/StorageProductsManagement.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
