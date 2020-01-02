import axios from './axios';
import { Message } from 'element-ui';
//modifyDepartment

export default async function() {
    let deps = await axios({
        url: '/app/json',
        method: 'get',
        params: {
            name: 'department.json'
        }
    });
    let result = await axios({
        url: '/app/modifyDepartment',
        method: 'post',
        data: {
            type: 'init',
            data: deps
        }
    });
    if (result.key === 200) {
        Message.success('初始化成功');
    } else {
        Message.error('初始化失败');
    }
}