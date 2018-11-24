import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Aside from '@/components/aside'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/home',
        name: 'Home',
        components: {
            default: Home,
            aside: Aside
        }
    }]
})