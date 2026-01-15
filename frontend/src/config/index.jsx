import axios from "axios";


export const clientServer = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,
});