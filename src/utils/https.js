import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui';
Vue.component(Message)
export function post(url, data, error) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res)
        }, err => {
            err = error ? error : err
            this.$message({
                showClose: true,
                message: '连接错误',
                type: 'error'
            });
        })
    })
}
export function get(url, data, error) {
    return new Promise((resolve, reject) => {
        axios.post(url, {
            data: data
        }).then(res => {
            resolve(res)
        }, err => {
            err = error ? error : err
            this.$message({
                showClose: true,
                message: '连接错误',
                type: 'error'
            });
        })
    })
}