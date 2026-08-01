<script setup lang="ts">
import { storeToRefs } from "pinia";

import CartItem from "../components/cart/CartItem.vue";
import { useCartStore } from "../stores/cartStore";

const cartStore = useCartStore();

const {
    items,
    totalItems,
    totalPrice,
    isEmpty
} = storeToRefs(cartStore);

const {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart
} = cartStore;
</script>

<template>
    <section class="cart-view">
        <div class="cart-header">
            <div>
                <p class="eyebrow">
                    Your order
                </p>

                <h1>Cart</h1>

                <p v-if="!isEmpty">
                    {{ totalItems }}
                    {{ totalItems === 1 ? "prodotto" : "prodotti" }}
                </p>
            </div>

            <button
                v-if="!isEmpty"
                class="clear-cart-button"
                type="button"
                @click="clearCart"
            >
                <i
                    class="bi bi-trash3"
                    aria-hidden="true"
                ></i>

                Clear cart
            </button>
        </div>

        <div
            v-if="isEmpty"
            class="empty-cart"
        >
            <i
                class="bi bi-cart-x"
                aria-hidden="true"
            ></i>

            <h2>The cart is empty </h2>

            <p>
                Add products to your cart to start an order.
            </p>

            <RouterLink
                :to="{ name: 'catalog' }"
                class="catalog-link"
            >
                Vai al catalogo
            </RouterLink>
        </div>

        <div
            v-else
            class="cart-layout"
        >
            <div class="cart-items">
                <CartItem
                    v-for="item in items"
                    :key="item.product.id"
                    :item="item"
                    @increase="increaseQuantity"
                    @decrease="decreaseQuantity"
                    @remove="removeItem"
                />
            </div>

            <aside class="cart-summary">
                <h2>Order summary</h2>

                <div class="summary-row">
                    <span>Products</span>
                    <span>{{ totalItems }}</span>
                </div>

                <div class="summary-row">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>

                <div class="summary-total">
                    <span>Total</span>

                    <strong>
                        {{
                            totalPrice.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "EUR"
                            })
                        }}
                    </strong>
                </div>

                
            </aside>
        </div>
    </section>
</template>
<style scoped>
.cart-view {
    width: 100%;
}

/* ==========================
   HEADER
========================== */

.cart-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: var(--space-xl);
    margin-bottom: var(--space-xl);
}

.eyebrow {
    margin: 0 0 var(--space-sm);

    color: var(--color-primary);

    font-size: var(--font-size-sm);
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 1.2;
    text-transform: uppercase;
}

.cart-header h1 {
    margin: 0 0 var(--space-sm);

    color: var(--color-text);

    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
}

.cart-header p {
    margin: 0;

    color: var(--color-text-muted);

    font-size: var(--font-size-md);
    line-height: 1.6;
}

/* ==========================
   CLEAR CART BUTTON
========================== */

.clear-cart-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);

    border: 1px solid transparent;
    border-radius: var(--radius-md);

    background-color: transparent;
    color: var(--color-error);

    font-family: inherit;
    font-size: var(--font-size-sm);
    font-weight: 700;

    cursor: pointer;

    transition:
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        transform var(--transition-fast);
}

.clear-cart-button:hover {
    transform: translateY(-1px);

    border-color: rgb(198 40 40 / 15%);
    background-color: var(--color-error-soft);
}

.clear-cart-button:active {
    transform: translateY(0);
}

.clear-cart-button:focus-visible {
    outline: 3px solid rgb(198 40 40 / 20%);
    outline-offset: 3px;
}

/* ==========================
   CART LAYOUT
========================== */

.cart-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 21.25rem;
    align-items: start;

    gap: var(--space-xl);
}

.cart-items {
    display: flex;
    flex-direction: column;

    gap: var(--space-md);
}

/* ==========================
   CART SUMMARY
========================== */

.cart-summary {
    position: sticky;
    top: 6.25rem;

    padding: var(--space-lg);

    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);

    background-color: var(--color-surface);
    box-shadow: var(--shadow-sm);
}

.cart-summary h2 {
    margin: 0 0 var(--space-lg);

    color: var(--color-text);

    font-size: var(--font-size-l);
    font-weight: 800;
    letter-spacing: -0.02em;
}

.summary-row,
.summary-total {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: var(--space-md);
}

.summary-row {
    margin-bottom: var(--space-md);

    color: var(--color-text-muted);

    font-size: var(--font-size-sm);
}

.summary-row:last-of-type {
    margin-bottom: 0;
}

.summary-total {
    margin-top: var(--space-lg);
    padding-top: var(--space-lg);

    border-top: 1px solid var(--color-divider);

    color: var(--color-text);

    font-size: var(--font-size-lg);
    font-weight: 800;
}

.summary-row span:last-child,
.summary-total span:last-child {
    color: var(--color-text);
    font-weight: 700;
    white-space: nowrap;
}

/* ==========================
   CHECKOUT BUTTON
========================== */

.checkout-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 3.125rem;
    margin-top: var(--space-lg);
    padding: var(--space-md) var(--space-lg);

    border: 1px solid transparent;
    border-radius: var(--radius-md);

    background-color: var(--color-primary);
    color: var(--color-text-inverse);

    box-shadow: var(--shadow-sm);

    font-family: inherit;
    font-size: var(--font-size-sm);
    font-weight: 800;

    cursor: pointer;

    transition:
        background-color var(--transition-fast),
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
}

.checkout-button:hover {
    transform: translateY(-2px);

    background-color: var(--color-primary-hover);
    box-shadow: var(--shadow-md);
}

.checkout-button:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
}

.checkout-button:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;
}

/* ==========================
   EMPTY CART
========================== */

.empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 28rem;
    padding: var(--space-2xl);

    text-align: center;
}

.empty-cart i {
    margin-bottom: var(--space-md);

    color: var(--color-primary);

    font-size: 4rem;
    line-height: 1;
}

.empty-cart h2 {
    margin: 0 0 var(--space-sm);

    color: var(--color-text);

    font-size: var(--font-size-xl);
    font-weight: 800;
}

.empty-cart p {
    max-width: 32rem;
    margin: 0 0 var(--space-lg);

    color: var(--color-text-muted);

    font-size: var(--font-size-md);
    line-height: 1.7;
}

/* ==========================
   CATALOG LINK
========================== */

.catalog-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: var(--space-sm);
    padding: 0.9rem var(--space-lg);

    border: 1px solid transparent;
    border-radius: var(--radius-md);

    background-color: var(--color-primary);
    color: var(--color-text-inverse);

    box-shadow: var(--shadow-sm);

    font-size: var(--font-size-sm);
    font-weight: 800;
    text-decoration: none;

    transition:
        background-color var(--transition-fast),
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
}

.catalog-link:hover {
    transform: translateY(-2px);

    background-color: var(--color-primary-hover);
    box-shadow: var(--shadow-md);
}

.catalog-link:active {
    transform: translateY(0);
}

.catalog-link:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;
}

/* ==========================
   TABLET
========================== */

@media (max-width: 950px) {
    .cart-layout {
        grid-template-columns: 1fr;
    }

    .cart-summary {
        position: static;
    }
}

/* ==========================
   MOBILE
========================== */

@media (max-width: 600px) {
    .cart-header {
        flex-direction: column;
        align-items: flex-start;

        gap: var(--space-md);
        margin-bottom: var(--space-lg);
    }

    .cart-header h1 {
        font-size: clamp(2rem, 12vw, 2.75rem);
    }

    .clear-cart-button {
        padding-inline: 0;
    }

    .clear-cart-button:hover {
        transform: none;

        border-color: transparent;
        background-color: transparent;
    }

    .cart-layout {
        gap: var(--space-lg);
    }

    .cart-summary {
        padding: var(--space-md);
    }

    .empty-cart {
        min-height: 22rem;
        padding: var(--space-xl);
    }

    .empty-cart i {
        font-size: 3rem;
    }

    .catalog-link {
        width: 100%;
        max-width: 18rem;
    }
}
</style>