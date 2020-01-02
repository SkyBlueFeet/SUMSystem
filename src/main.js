import Vue from 'vue';
import App from './App';
import router from '@/app/router';
import store from '@/app/store';
import 'element-ui/lib/theme-chalk/base.css';
import { Icon, Loading, MessageBox, Notification, Message } from 'element-ui';

import axios from '@/utils/axios';
import * as db from '@/apis/feild';

Vue.use(Icon);
Vue.use(Loading.directive);

Vue.prototype.$axios = axios;

Vue.prototype.$db = db;

Vue.config.productionTip = true;

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
});