import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/LoginPage.vue';
import ProductList from '@/pages/Products/ProductList.vue';
import ProductView from '@/pages/Products/ProductView.vue';
import ProductNew from '@/pages/Products/ProductNew.vue';
import { useAuthStore } from '@/stores/auth.store';

const routes = [
  { path: '/login', component: Login },
  { path: '/products', component: ProductList },
  { path: '/products/new', component: ProductNew },
  { path: '/products/:id', component: ProductView },
  { path: '/', redirect: '/products' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.isAuthenticated;

  if (to.path === '/login' && isLoggedIn) {
    next('/products');
  } else if (to.path !== '/login' && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;






