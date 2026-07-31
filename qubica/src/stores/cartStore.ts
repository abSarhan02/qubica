import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

const CART_STORAGE_KEY = "vitrina-cart";

function loadStoredCart(): CartItem[] {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
        return [];
    }

    try {
        const parsedCart: unknown = JSON.parse(storedCart);

        if (!Array.isArray(parsedCart)) {
            return [];
        }

        return parsedCart as CartItem[];
    } catch (error: unknown) {
        console.error(
            "Errore durante la lettura del carrello:",
            error
        );

        return [];
    }
}

export const useCartStore = defineStore("cart", () => {
    const items = ref<CartItem[]>(loadStoredCart());

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
            localStorage.setItem(
                CART_STORAGE_KEY,
                JSON.stringify(newItems)
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