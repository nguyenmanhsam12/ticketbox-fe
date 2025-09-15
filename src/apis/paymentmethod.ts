import axiosPublic from "../config/axiosPublic";

export const fetchPaymentMethodApi = async () => {
    const response = await axiosPublic.get('/payment-methods');
    return response.data;
}