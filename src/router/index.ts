import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { useFirebaseAuth } from '@/composables/useFirebaseAuth';


const localStorage = useLocalStorage();
const { getCurrentUser } = useFirebaseAuth();
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import("@/views/AuthPage.vue"),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import("@/views/DashboardView.vue"),
  },
  {
    path: '/storage',
    name: 'storage',
    component: () => import("@/views/HomePage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-product',
    name: 'add product',
    component: () => import("@/components/storage-components/AddProductToStorage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/take-product',
    name: 'take product',
    component: () => import("@/components/storage-components/TakeProductFromStorage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/product-page/:id',
    name: 'Product Page',
    component: () => import("@/components/storage-components/ProductDescription.vue"),
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await checkIfUserIsAuthenticated();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next()
    } else if (to.name !== 'auth') {
      next('/auth')
    }
  } else {
    next()
  }
});

const checkIfUserIsAuthenticated = async () => {
  if (localStorage.getLocalStorageItem("uid")) {
    return true;
  } 
  const authResp = await getCurrentUser();
  if (authResp !== undefined && authResp && authResp.uid) {
    localStorage.setLocalStorageItem('uid', (authResp.uid));
  }
  return authResp !== undefined;
}
export default router
