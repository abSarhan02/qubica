import type { Category, Product } from "../types/product";
import { httpClient } from "./httpClient";

export const productService = {
  async getAll(): Promise<Product[]> {
    const response = await httpClient.get<Product[]>("/products");

    return response.data;
  },

  async getById(id: number): Promise<Product> {
    const response = await httpClient.get<Product>(`/products/${id}`);

    return response.data;
  },

  async getCategories(): Promise<Category[]> {
    const response = await httpClient.get<Category[]>("/products/categories");

    return response.data;
  },

  async getByCategory(category: Category): Promise<Product[]> {
    const encodedCategory = encodeURIComponent(category);

    const response = await httpClient.get<Product[]>(
      `/products/category/${encodedCategory}`,
    );

    return response.data;
  },
};
