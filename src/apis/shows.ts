import axiosInstance from "@/src/config/interceptor";
import axios from '@/src/config/axios.config';

export const getTicketsByShowApi = async (showId) => {
    const res = await axios.get(`/events/showings/${showId}`);
    return res.data;
}