import axios from "axios";

export const httpClient = axios.create({
    baseURL: "https://fakestoreapi.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});