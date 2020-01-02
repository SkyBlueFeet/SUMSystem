import Vue from 'vue';
import Vuex from 'vuex';
import recordLogin from '@/utils/record_login';

Vue.use(Vuex);
let isLogin = false;
let user = {};
if (Object.keys(recordLogin.get()).length > 0) {
    isLogin = true;
    user = JSON.parse(recordLogin.get());
}

export default new Vuex.Store({
    state: {
        expandMenu: false,
        thisPage: [],
        isLogin: isLogin,
        user: user,
        depIndex: 'wenyi',
        dialogVisible: false,
        isLoading: false
    },
    mutations: {
        changeExpandState(state) {
            state.expandMenu = !state.expandMenu;
        }
    }
});