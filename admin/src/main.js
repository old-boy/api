import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios';
import router from './router'
import './assets/scss/anviz.min.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

new Vue({
    el: '#app',
    router,
    // store,
    // i18n,
    render: h => h(App)
})