import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

import type { Product } from "../types/product";

export const useWishlistStore = defineStore("wishlist", () => {
    const savedWishlist = localStorage.getItem("vitrina-wishlist");

    const products = ref<Product[]>(
        savedWishlist ? JSON.parse(savedWishlist) : []
    );

    const totalItems = computed(() => {
        return products.value.length;
    });

    const isEmpty = computed(() => {
        return products.value.length === 0;
    });

    function contains(productId: number): boolean {
        return products.value.some(
            product => product.id === productId
        );
    }

    function toggleProduct(product: Product): void {
        if (contains(product.id)) {
            removeProduct(product.id);
        } else {
            products.value.push(product);
        }
    }

    function removeProduct(productId: number): void {
        products.value = products.value.filter(
            product => product.id !== productId
        );
    }

    function clearWishlist(): void {
        products.value = [];
    }

    watch(
        products,
        () => {
            localStorage.setItem(
                "vitrina-wishlist",
                JSON.stringify(products.value)
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
        toggleProduct,
        removeProduct,
        clearWishlist
    };
});