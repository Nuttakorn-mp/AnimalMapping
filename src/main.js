import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import routes from './router/routes';

import Notifications from 'vue-notification/dist/ssr.js'
Vue.use(Notifications)
Vue.use(VueRouter);

const router = new VueRouter({mode: 'history',routes});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
