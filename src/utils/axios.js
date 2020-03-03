import axios from 'axios'; // 注意先安装哦
import qs from 'qs'; // 序列化请求数据，视服务端的要求
import { Message } from 'element-ui';
import router from '@/app/router';

/**
 * axios封装
 * 源地址: https://juejin.im/post/5ae432aaf265da0b9c1063c8
 */

const axiosConfig = {
    method: 'post',
    baseURL: process.env !== 'production' ? '/api' : '',
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    /**
     * Json解析返回数据
     */
    JSONParse: true,
    methodParse: ['put', 'delete'],
    // 参数
    data: {},
    // 设置超时时间
    timeout: 8000,
    // 携带凭证
    withCredentials: false,
    // 返回数据类型
    responseType: 'json'
};
// process.env !== 'production' ? axiosConfig.baseURL = '/api' : void 0;

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: axiosConfig.baseURL,
            headers: axiosConfig.headers,
            method: axiosConfig.method,
            withCredentials: axiosConfig.withCredentials,
            transformResponse: [function (data) { }]
        });

        // request 拦截器
        instance.interceptors.request.use(
            config => {
                // Tip: 1
                // 请求开始的时候可以开启 loading 动画
                // isShowLoading(true);

                // Tip: 2
                // 带上 token , 可以结合 vuex 或者重 localStorage
                // if (store.getters.token) {
                //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
                // } else {
                //     // 重定向到登录页面
                // }

                // Tip: 3
                // 序列化请求参数,qs用来防止跨域导致的options请求
                let method = config.method.toLocaleLowerCase();
                if (axiosConfig.methodParse.includes(method) && config.withCredentials) {
                    config.data = qs.stringify(config.data);
                }
                return config;
            },
            error => {
                // 请求错误时做些事(接口错误、超时等)
                // Tip: 4
                // 关闭loadding
                // isShowLoading(false);
                // console.log('request:', error);
                Message.error(error);

                //  1.判断请求超时
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    // console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案');
                    Message.error('请求超时');
                    // return service.request(originalRequest);//例如再重复请求一次
                }
                //  2.需要重定向到错误页面
                const errorInfo = error.response;
                if (errorInfo) {
                    // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                    const errorStatus = errorInfo.status; // 404 403 500 ... 等
                    Message.error(`请求错误：${errorStatus}`);
                    // router.push({
                    //     path: `/error/${errorStatus}`
                    // });
                }
                return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
            }
        );

        // response 拦截器
        instance.interceptors.response.use(response => {
            let data;
            // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
            if (response.data === undefined) {
                data = response.request.responseText;
            } else {
                data = response.data;
            }
            // 根据返回的code值来做不同的处理（和后端约定）
            // switch (data.code) {
            //     case '':
            //         break;
            //     default:
            // }
            let rootPath = router.mode === 'history' ? '/' : '/#/';
            let message = '';

            if (response.request.responseText && typeof JSON.parse(response.request.responseText) === 'object' && 'key' in JSON.parse(response.request.responseText)) {
                switch (JSON.parse(response.request.responseText).key) {
                    case 400:
                        message = '请求错误';
                        break;

                    case 401:
                        message = '登录已失效,请重新登录';
                        break;

                    case 403:
                        message = '拒绝访问';
                        break;

                    case 404:
                        message = `请求地址出错: ${response.config.url}`;
                        break;

                    case 408:
                        message = '请求超时';
                        break;

                    case 500:
                        message = '服务器内部错误';
                        break;

                    case 501:
                        message = '服务未实现';
                        break;

                    case 502:
                        message = '网关错误';
                        break;

                    case 503:
                        message = '服务不可用';
                        break;

                    case 504:
                        message = '网关超时';
                        break;

                    case 505:
                        message = 'HTTP版本不受支持';
                        break;

                    default:
                }
            }

            if (message !== '') Message.error(message);

            // 若不是正确的返回code，且已经登录，就抛出错误
            // const err = new Error(data.description)

            // err.data = data
            // err.response = response

            // throw err
            return data;
        },
            err => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误';
                            break;

                        case 401:
                            err.message = '登录已失效,请重新登录';
                            break;

                        case 403:
                            err.message = '拒绝访问';
                            break;

                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`;
                            break;

                        case 408:
                            err.message = '请求超时';
                            break;

                        case 500:
                            err.message = '服务器内部错误';
                            break;

                        case 501:
                            err.message = '服务未实现';
                            break;

                        case 502:
                            err.message = '网关错误';
                            break;

                        case 503:
                            err.message = '服务不可用';
                            break;

                        case 504:
                            err.message = '网关超时';
                            break;

                        case 505:
                            err.message = 'HTTP版本不受支持';
                            break;

                        default:
                    }
                }
                Message.error(err.message);
                return Promise.reject(err); // 返回接口返回的错误信息
            }
        );

        // 请求处理
        instance(options)
            .then(res => {
                // 数据Json解析
                try {
                    res = JSON.parse(res);
                } catch (error) {
                    res = res.toString();
                }

                resolve(res);

                return false;
            })
            .catch(error => {
                reject(error);
            });
    });
}