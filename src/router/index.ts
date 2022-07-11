import { createRouter, createWebHistory } from 'vue-router';
export const constantRoutes = [
  {
    path: '/',
    redirect: '/edit'
  },
  {
    name: 'edit',
    path: '/edit',
    component: () => import('../views/edit/index.vue')
  },
  {
    name: 'preview',
    path: '/preview',
    component: () => import('../views/preview/index.vue')
  }
];
const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: constantRoutes
});

export default router;
