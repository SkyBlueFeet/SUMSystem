import Vue from 'vue'
import Router from 'vue-router'
import hlCreater from '@/views/hlCreater'
import Aside from '@/components/aside'
import Header from '@/components/Header'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/hlCreater',
        name: 'hlCreater',
        components: {
            default: hlCreater,
            aside: Aside,
            header: Header
        }
    }]
})