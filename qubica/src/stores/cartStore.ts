import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

import {
    loadFromStorage,
    saveToStorage
} from "../utils/storage";

const CART_STORAGE_KEY = "vitrina-cart";

export const useCartStore = defineStore("cart", () => {
    const items = ref<CartItem[]>(
        loadFromStorage<CartItem[]>(
            CART_STORAGE_KEY,
            []
        )
    );

    const totalItems = computed<number>(() => {
        return items.value.reduce(
            (total, item) => total + item.quantity,
            0
        );
    });

    const totalPrice = computed<number>(() => {
        return items.value.reduce(
            (total, item) =>
                total + item.product.price * item.quantity,
            0
        );
    });

    const isEmpty = computed<boolean>(() => {
        return items.value.length === 0;
    });

    function addItem(product: Product): void {
        const existingItem = items.value.find(
            item => item.product.id === product.id
        );

        if (existingItem) {
            existingItem.quantity++;
            return;
        }

        items.value.push({
            product,
            quantity: 1
        });
    }

    function increaseQuantity(productId: number): void {
        const item = items.value.find(
            item => item.product.id === productId
        );

        if (!item) {
            return;
        }

        item.quantity++;
    }

    function decreaseQuantity(productId: number): void {
        const item = items.value.find(
            item => item.product.id === productId
        );

        if (!item) {
            return;
        }

        if (item.quantity <= 1) {
            removeItem(productId);
            return;
        }

        item.quantity--;
    }

    function removeItem(productId: number): void {
        items.value = items.value.filter(
            item => item.product.id !== productId
        );
    }

    function clearCart(): void {
        items.value = [];
    }

    watch(
        items,
        newItems => {
            saveToStorage(
                CART_STORAGE_KEY,
                newItems
            );
        },
        {
            deep: true
        }
    );

    return {
        items,
        totalItems,
        totalPrice,
        isEmpty,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart
    };
});