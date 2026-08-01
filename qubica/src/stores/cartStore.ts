import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

export const useCartStore = defineStore("cart", () => {
    const savedCart = localStorage.getItem("vitrina-cart");

    const items = ref<CartItem[]>(
        savedCart ? JSON.parse(savedCart) : []
    );

    const totalItems = computed(() => {
        return items.value.reduce(
            (total, item) => total + item.quantity,
            0
        );
    });

    const totalPrice = computed(() => {
        return items.value.reduce(
            (total, item) => {
                return total + item.product.price * item.quantity;
            },
            0
        );
    });

    const isEmpty = computed(() => {
        return items.value.length === 0;
    });

    function addItem(product: Product): void {
        const existingItem = items.value.find(
            item => item.product.id === product.id
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            items.value.push({
                product,
                quantity: 1
            });
        }
    }

    function increaseQuantity(productId: number): void {
        const item = items.value.find(
            item => item.product.id === productId
        );

        if (item) {
            item.quantity++;
        }
    }

    function decreaseQuantity(productId: number): void {
        const item = items.value.find(
            item => item.product.id === productId
        );

        if (!item) {
            return;
        }

        if (item.quantity === 1) {
            removeItem(productId);
        } else {
            item.quantity--;
        }
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
        () => {
            localStorage.setItem(
                "vitrina-cart",
                JSON.stringify(items.value)
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