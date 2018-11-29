// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import axios from './utils/axios.js'
import { post, get } from './utils/https.js'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/iconfont/iconfont.css';

Vue.prototype.$axios = axios
Vue.prototype.$post = post
Vue.prototype.$get = get

Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})