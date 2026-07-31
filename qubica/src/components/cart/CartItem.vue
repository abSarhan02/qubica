<script setup lang="ts">
import type { CartItem } from "../../types/cart";

defineProps<{
    item: CartItem;
}>();

const emit = defineEmits<{
    increase: [productId: number];
    decrease: [productId: number];
    remove: [productId: number];
}>();
</script>

<template>
    <article class="cart-item">
        <RouterLink
            :to="{
                name: 'product-detail',
                params: {
                    id: item.product.id
                }
            }"
            class="product-image-wrapper"
        >
            <img
                class="product-image"
                :src="item.product.image"
                :alt="item.product.title"
            />
        </RouterLink>

        <div class="product-information">
            <p class="product-category">
                {{ item.product.category }}
            </p>

            <RouterLink
                :to="{
                    name: 'product-detail',
                    params: {
                        id: item.product.id
                    }
                }"
                class="product-title"
            >
                {{ item.product.title }}
            </RouterLink>

            <p class="product-price">
                {{
                    item.product.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "EUR"
                    })
                }}
            </p>
        </div>

        <div class="quantity-controls">
            <button
                type="button"
                aria-label="Diminuisci quantità"
                @click="emit('decrease', item.product.id)"
            >
                <i
                    class="bi bi-dash"
                    aria-hidden="true"
                ></i>
            </button>

            <span aria-label="Quantità">
                {{ item.quantity }}
            </span>

            <button
                type="button"
                aria-label="Aumenta quantità"
                @click="emit('increase', item.product.id)"
            >
                <i
                    class="bi bi-plus"
                    aria-hidden="true"
                ></i>
            </button>
        </div>

        <p class="item-total">
            {{
                (
                    item.product.price * item.quantity
                ).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "EUR"
                })
            }}
        </p>

        <button
            class="remove-button"
            type="button"
            aria-label="Rimuovi prodotto dal carrello"
            @click="emit('remove', item.product.id)"
        >
            <i
                class="bi bi-trash3"
                aria-hidden="true"
            ></i>
        </button>
    </article>
</template>
<style scoped>
.cart-item {
    display: grid;
    grid-template-columns:
        110px
        minmax(0, 1fr)
        auto
        110px
        42px;
    align-items: center;

    gap: var(--space-lg);
    padding: var(--space-lg);

    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);

    background-color: var(--color-surface);
    box-shadow: var(--shadow-sm);

    transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast),
        transform var(--transition-fast);
}

.cart-item:hover {
    transform: translateY(-2px);

    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-md);
}

/* ==========================
   PRODUCT IMAGE
========================== */

.product-image-wrapper {
    display: grid;
    place-items: center;

    width: 110px;
    height: 110px;
    padding: var(--space-md);

    overflow: hidden;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    background-color: var(--color-surface);

    transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
}

.cart-item:hover .product-image-wrapper {
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-xs);
}

.product-image {
    display: block;

    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;

    object-fit: contain;

    transition: transform var(--transition-medium);
}

.cart-item:hover .product-image {
    transform: scale(1.03);
}

/* ==========================
   PRODUCT INFORMATION
========================== */

.product-information {
    min-width: 0;
}

.product-category {
    margin: 0 0 var(--space-xs);

    color: var(--color-primary);

    font-size: var(--font-size-xs);
    font-weight: 800;
    letter-spacing: 0.06em;
    line-height: 1.2;
    text-transform: uppercase;
}

.product-title {
    display: -webkit-box;

    max-width: 100%;
    margin: 0 0 var(--space-sm);

    overflow: hidden;

    color: var(--color-text);

    font-size: var(--font-size-md);
    font-weight: 700;
    line-height: 1.4;
    text-decoration: none;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    transition: color var(--transition-fast);
}

.product-title:hover {
    color: var(--color-primary);
}

.product-title:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;

    border-radius: var(--radius-sm);
}

.product-price {
    margin: 0;

    color: var(--color-text-muted);

    font-size: var(--font-size-sm);
    font-weight: 600;
}

/* ==========================
   QUANTITY CONTROLS
========================== */

.quantity-controls {
    display: inline-flex;
    align-items: center;

    overflow: hidden;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    background-color: var(--color-surface);
}

.quantity-controls button {
    display: grid;
    place-items: center;

    width: 38px;
    height: 38px;
    padding: 0;

    border: 0;

    background-color: transparent;
    color: var(--color-text-muted);

    font-family: inherit;

    cursor: pointer;

    transition:
        color var(--transition-fast),
        background-color var(--transition-fast);
}

.quantity-controls button:hover {
    background-color: var(--color-primary-soft);
    color: var(--color-primary);
}

.quantity-controls button:active {
    background-color: var(--color-primary-light);
}

.quantity-controls button:focus-visible {
    position: relative;
    z-index: 1;

    outline: 3px solid var(--color-focus);
    outline-offset: -3px;
}

.quantity-controls span {
    display: grid;
    place-items: center;

    min-width: 38px;
    height: 38px;

    border-right: 1px solid var(--color-border);
    border-left: 1px solid var(--color-border);

    color: var(--color-text);

    font-size: var(--font-size-sm);
    font-weight: 800;
}

/* ==========================
   ITEM TOTAL
========================== */

.item-total {
    margin: 0;

    color: var(--color-text);

    font-size: var(--font-size-lg);
    font-weight: 800;
    letter-spacing: -0.02em;
    text-align: right;
    white-space: nowrap;
}

/* ==========================
   REMOVE BUTTON
========================== */

.remove-button {
    display: grid;
    place-items: center;

    width: 42px;
    height: 42px;
    padding: 0;

    border: 1px solid transparent;
    border-radius: var(--radius-full);

    background-color: transparent;
    color: var(--color-error);

    cursor: pointer;

    transition:
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        transform var(--transition-fast);
}

.remove-button:hover {
    transform: scale(1.05);

    border-color: rgb(198 40 40 / 15%);
    background-color: var(--color-error-soft);
}

.remove-button:active {
    transform: scale(0.98);
}

.remove-button:focus-visible {
    outline: 3px solid rgb(198 40 40 / 20%);
    outline-offset: 3px;
}

/* ==========================
   TABLET
========================== */

@media (max-width: 850px) {
    .cart-item {
        grid-template-columns: 90px minmax(0, 1fr) auto;

        gap: var(--space-md);
    }

    .product-image-wrapper {
        width: 90px;
        height: 90px;
    }

    .quantity-controls {
        grid-column: 2;
        justify-self: start;
    }

    .item-total {
        grid-column: 3;
        grid-row: 2;
    }

    .remove-button {
        grid-column: 3;
        grid-row: 1;
        justify-self: end;
    }
}

/* ==========================
   MOBILE
========================== */

@media (max-width: 560px) {
    .cart-item {
        grid-template-columns: 80px minmax(0, 1fr);

        gap: var(--space-md);
        padding: var(--space-md);
    }

    .product-image-wrapper {
        width: 80px;
        height: 80px;
        padding: var(--space-sm);
    }

    .product-category {
        font-size: var(--font-size-xs);
    }

    .product-title {
        margin-bottom: var(--space-xs);

        font-size: var(--font-size-sm);
    }

    .quantity-controls {
        grid-column: 2;
        justify-self: start;
    }

    .item-total {
        grid-column: 2;
        grid-row: auto;
        justify-self: start;

        font-size: var(--font-size-md);
        text-align: left;
    }

    .remove-button {
        grid-column: 1;
        grid-row: 2 / span 2;
        align-self: end;
        justify-self: center;
    }
}
</style>