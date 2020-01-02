import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/view/index';
import Login from '@/view/login';
import Article from '@/view/article';
import Department from '@/view/department';
import Transaction from '@/view/transaction';
import User from '@/view/user';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
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
        path: '/article',
        name: 'article',
        component: Article,
        alias: ['/doc', '/news', '/introduction'],
        meta: {
            type: 'index'
        }
    }, {
        path: '/department',
        name: 'department',
        component: Department,
        meta: {
            type: 'index'
        }
    }, {
        path: '/transaction/:department',
        name: 'transaction',
        component: Transaction,
        beforeEnter: (to, from, next) => {
            next();
        },
        meta: {
            type: 'index'
        }
    }, {
        path: '/:name/:userId',
        name: 'user',
        component: User,
        meta: {
            type: 'index'
        }
    }, {
        path: '*',
        name: '404',
        component: Article,
        meta: {
            type: 'index'
        }
    }]
});

router.afterEach((to, from) => {
    document.body.style.overflow = 'auto';
});
router.beforeEach((to, from, next) => {
    next();
});

export default router;