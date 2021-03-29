import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Index',
    redirect: '/about',
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
    path: '/myindex',
    name: 'myindex',
    component: () => import('@/views/pages/myindex'),
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