/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Router from 'vue-router';

import menuRoute from './menuRoute';

Vue.use(Router);

// 按需加载
const _import = (file) => () =>
  import('@/views/' + file + '.vue').then((m) => m.default); // 首页

//  公用路由
const publicRoute = [
  {
    path: '/',
    redirect: '/login',
    hidden: true,
  },
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true,
  },
  {
    path: '/forget',
    component: _import('login/forget'),
    hidden: true,
  },
];

const constRouteMap = [...publicRoute, ...menuRoute];

export default new Router({
  mode: 'history',
  // base: process.env.VUE_APP_URL,
  // routes: constMap,
  routes: constRouteMap,
});
