/*
 * @Author: Quinn
 * @Date: 2021-03-26 14:41:20
 * @LastEditTime: 2021-03-30 11:48:38
 * @LastEditors: quinn
 * @Description:  
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Index',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/errortimeline',
    name: 'ErrorTimeLine',
    component: () => import('@/components/TimeLine'),
  },
  {
    path: '/quinn',
    name: 'quinn',
    component: () => import('@/views/pages/quinn'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;