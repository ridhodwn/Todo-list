import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue';
import DetailView from '../views/DetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    }
  ]
});

export default router;
