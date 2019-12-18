// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/base.css';
// import element from 'element-ui';
import { Icon } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import axios from '@/utils/axios';

Vue.use(Icon);

Vue.prototype.$axios = axios;

Vue.config.productionTip = true;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
});