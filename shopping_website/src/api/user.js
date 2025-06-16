import axios from './axios.js'

export async function registerUser(userData) {
    try {
        const res = await axios.post('/users/register', userData);
        return res.data;
    } catch (error) {
        console.error('注册失败:', error.response?.data?.message || error.message);
        throw error;
    }
}

export async function loginUser(credentials) {
    try {
        const res = await axios.post('/users/login', credentials);
        return res.data;
    } catch (error) {
        console.error('登录失败:', error.response?.data?.message || error.message);
        throw error;
    }
}
