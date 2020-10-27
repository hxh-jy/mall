import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from "./store";

import toast from 'components/common/toast/index'

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
Vue.use(toast)
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()


FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
