import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

import type { Product } from "../types/product";

import {
    loadFromStorage,
    saveToStorage
} from "../utils/storage";

const WISHLIST_STORAGE_KEY = "vitrina-wishlist";

export const useWishlistStore = defineStore(
    "wishlist",
    () => {
        const products = ref<Product[]>(
            loadFromStorage<Product[]>(
                WISHLIST_STORAGE_KEY,
                []
            )
        );

        const totalItems = computed<number>(() => {
            return products.value.length;
        });

        const isEmpty = computed<boolean>(() => {
            return products.value.length === 0;
        });

        function contains(productId: number): boolean {
            return products.value.some(
                product => product.id === productId
            );
        }

        function addProduct(product: Product): void {
            if (contains(product.id)) {
                return;
            }

            products.value.push(product);
        }

        function removeProduct(productId: number): void {
            products.value = products.value.filter(
                product => product.id !== productId
            );
        }

        function toggleProduct(product: Product): void {
            if (contains(product.id)) {
                removeProduct(product.id);
                return;
            }

            addProduct(product);
        }

        function clearWishlist(): void {
            products.value = [];
        }

        watch(
            products,
            newProducts => {
                saveToStorage(
                    WISHLIST_STORAGE_KEY,
                    newProducts
                );
            },
            {
                deep: true
            }
        );

        return {
            products,
            totalItems,
            isEmpty,
            contains,
            addProduct,
            removeProduct,
            toggleProduct,
            clearWishlist
        };
    }
);