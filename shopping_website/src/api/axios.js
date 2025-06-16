import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(config => {
    const fullUrl = `${config.baseURL}${config.url}`
    console.log(`[AXIOS] 请求发送: ${config.method.toUpperCase()} ${fullUrl}`)
    console.log('请求配置:', config)
    return config
}, error => {
    console.error('[AXIOS] 请求错误:', error)
    return Promise.reject(error)
})

instance.interceptors.response.use(response => {
    console.log(`[AXIOS] 响应接收: ${response.status} ${response.config.url}`)
    return response
}, error => {
    console.error('[AXIOS] 响应错误:', error)
    if (error.response) {
        console.error('错误详情:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
        })
    } else {
        console.error('错误信息:', error.message)
    }
    return Promise.reject(error)
})

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error('认证失败，请重新登录');
            } else if (error.response.status === 403) {
                console.error('没有访问权限');
            }
        }
        return Promise.reject(error);
    }
);

export default instance
