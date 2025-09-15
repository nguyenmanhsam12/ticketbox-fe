/* eslint-disable @typescript-eslint/no-explicit-any */
// import axiosInstance from "@/src/config/interceptor";
import axios from '@/src/config/axios.config'


export const createCartApi = async (payload: any) => {
    const response = await axios.post('/carts/add', payload);
    return response.data;
}

export const fetchCartByBookingCodeApi = async (booking_code: string | null, showId: string) => {
    const response = await axios.get(`/carts/quote/?booking_code=${booking_code}&show_id=${showId}`);
    return response.data;
}

export const cancelCartApi = async (booking_code: string) => {
    const response = await axios.delete(`/carts/delete/${booking_code}`);
    return response.data;
}

export const updateCartStepApi = async (booking_code: string | null, showId: string, step: string) => {
    const res = await axios.patch(`/carts/update-step/?booking_code=${booking_code}&show_id=${showId}`, { step })
    return res.data;
}