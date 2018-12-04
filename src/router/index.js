import Vue from 'vue'
import Router from 'vue-router'
import Table from '@/views/page/Table'
import Edit from '@/views/page/useradd';
import Aside from '@/components/aside'
import Header from '@/components/Header'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/page/table',
        name: 'Table',
        components: {
            default: Table,
            aside: Aside,
            header: Header
        }
    }, {
        path: '/page/edit',
        name: 'Edit',
        components: {
            default: Edit,
            aside: Aside,
            header: Header
        }
    }]
})