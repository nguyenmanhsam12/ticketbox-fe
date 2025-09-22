import axiosInstance from "@/src/config/interceptor";

export const updateProfile = async (payload) => {
    const res = await axiosInstance.patch(`users/update-profile`,payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
}