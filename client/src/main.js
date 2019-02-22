import Vue from 'vue';
import VueRouter from 'vue-router';
import Customer from './Customer.vue';
import Support from './Support.vue';
import App from './App.vue';

import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import './App.css';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Customer },
  { path: '/support', component: Support },
];

const router = new VueRouter({
  routes,
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
