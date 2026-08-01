import axios from "axios";

export const httpClient = axios.create({
    baseURL: "https://fakestoreapi.com",
    timeout: 5000
});