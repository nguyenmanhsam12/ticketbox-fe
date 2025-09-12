
import axios from "@/src/config/axios.config";

export const fetchAllCategoryApi = async () => {
    const response = await axios.get('/categories');
    return response.data;
}