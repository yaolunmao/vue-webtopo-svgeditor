import { createRouter, createWebHistory } from 'vue-router';
export const constantRoutes = [
  {
    path: '/',
    component: () => import('../views/demo/index.vue')
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
  },
  {
    name: 'edit-load',
    path: '/edit-load',
    component: () => import('../views/demo/edit-load.vue')
  },
  {
    name: 'custom-toolbar',
    path: '/custom-toolbar',
    component: () => import('../views/demo/custom-toolbar.vue')
  },
  {
    name: 'preview-test',
    path: '/preview-test',
    component: () => import('../views/demo/preview-test.vue')
  },
  {
    name: 'set-node-attr',
    path: '/set-node-attr',
    component: () => import('../views/demo/set-node-attr.vue')
  }
];
const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: constantRoutes
});

export default router;
