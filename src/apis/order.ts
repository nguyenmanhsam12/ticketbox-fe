/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/src/config/axios.config'
import axiosInstance from "@/src/config/interceptor";

export const createOrderApi = async (payload : any) => {
    const res = await axios.post('/orders/create',payload);
    return res.data;
}

export const getOrderApi = async (orderCode : string) => {
    const res = await axios.get(`/orders/${orderCode}`);
    return res.data;
}


//get order success
export async function getOrderStatus(status : string , timeline : 'upcoming' | 'ended'){
    const res = await axiosInstance.get(`/orders?status=${status}&timeline=${timeline}`);
    return res.data;
}
