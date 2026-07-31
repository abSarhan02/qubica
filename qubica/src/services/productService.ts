import type { Category, Product } from "../types/product";
import { httpClient } from "./httpClient";

export const productService = {
    async getAll(): Promise<Product[]> {
        const { data } = await httpClient.get<Product[]>("/products");

        return data;
    },

    async getById(id: number): Promise<Product> {
        const { data } = await httpClient.get<Product>(
            `/products/${id}`
        );

        return data;
    },

    async getCategories(): Promise<Category[]> {
        const { data } = await httpClient.get<Category[]>(
            "/products/categories"
        );

        return data;
    },

    async getByCategory(category: Category): Promise<Product[]> {
        const encodedCategory = encodeURIComponent(category);

        const { data } = await httpClient.get<Product[]>(
            `/products/category/${encodedCategory}`
        );

        return data;
    }
};