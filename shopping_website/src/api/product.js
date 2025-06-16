import axios from './axios.js'

export async function getAllProducts(queryParams = {}) {
    try {
        const res = await axios.get('/products', { params: queryParams });

        if (res.data && res.data.data) {
            return res.data.data;
        }

        return res.data;
    } catch (error) {
        console.error('获取商品失败:', error);
        throw error;
    }
}

export async function getProductById(id) {
    try {
        const res = await axios.get(`/products/${id}`);

        if (res.data && res.data.data) {
            return res.data.data;
        }

        return res.data;
    } catch (error) {
        console.error(`获取商品 ${id} 失败:`, error);
        throw error;
    }
}
