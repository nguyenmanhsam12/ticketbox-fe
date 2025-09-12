import axios from '@/src/config/axios.config'
import {LoginUser, RegisterUser} from "@/src/utils/interfaces/auth.interface";
import axiosInstance from "@/src/config/interceptor";

export const registerUser = async (userData: RegisterUser) => {
    const response = await axios.post('/auth/register', userData);
    return response.data;
}
export const loginUser = async (userData: LoginUser) => {
    const response = await axios.post('/auth/login', userData);
    return response.data;
}
export const getProfile = async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
}
export const logoutUser = async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
}