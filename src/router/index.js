import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import navMenu from '@/components/navMenu';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'HelloWorld',
        components: {
            default: HelloWorld,
            navMenu: navMenu
        }
    }]
});