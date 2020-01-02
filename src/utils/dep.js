import recordLogin from './record_login';
import axios from '@/utils/axios';
import { Message } from 'element-ui';

export default async function(user) {
    user = user || JSON.parse(recordLogin.get());

    let res = await axios({
        url: '/app/dep',
        method: 'post',
        data: undefined
    });
    let navList = [];
    if (res.key === 200) {
        navList = res.data.department;
    } else {
        Message.error('部门列表请求失败');
    }

    if (user.alevel === 9) {
        return navList;
    } else if (user.alevel === 5 && user.department !== 'OTHERS') {
        return navList.filter((dep, index, list) => {
            return dep.name === user.department;
        });
    } else {
        return [];
    }
}