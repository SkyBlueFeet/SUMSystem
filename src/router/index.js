import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/view/index';
import Login from '@/view/login';
import Doc from '@/view/doc';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            type: 'index'
        }
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/doc/:docName',
        name: 'doc',
        component: Doc,
        meta: {
            type: 'index'
        }
    }, {
        path: '*',
        name: '404',
        component: Login
    }]
});

router.afterEach((to, from) => {
    document.body.style.overflow = 'auto';
});

export default router;