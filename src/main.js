import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import VueToast from 'vue-toast-notification';
import router from './router'
import { store } from './store/store';
import Vuex from 'vuex';
import './index.css'
createApp(App)
  .use(store)
  .use(router)
  .use(Vuex)
  .use(VueToast, {
  position: 'bottom'
}).mount('#app')
