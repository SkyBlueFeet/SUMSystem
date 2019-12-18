import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        expandMenu: false,
        thisPage: [],
        isLogin: false
    },
    mutations: {
        changeExpandState(state) {
            state.expandMenu = !state.expandMenu;
        }
    }
});