import axios from "axios";
import { SERVER_URL } from "@/src/utils/const/config.const";

export default axios.create({
    baseURL: SERVER_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});