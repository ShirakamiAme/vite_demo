import axios from './axios';

export function fetchCartByUserId(userId) {
    return axios.get(`/cart/${userId}`);
}
