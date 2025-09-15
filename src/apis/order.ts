/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/src/config/axios.config'

export const createOrderApi = async (payload : any) => {
    const res = await axios.post('/orders/create',payload);
    return res.data;
}