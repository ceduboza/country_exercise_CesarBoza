import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Home/index.vue') }],
  },
  {
    path: '/wishlist',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Wishlist/index.vue') }],
  },
  {
    path: '/country/:name',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component:() => import('pages/Country/index.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
