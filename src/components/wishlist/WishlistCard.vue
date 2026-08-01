<script setup lang="ts">
import type { Product } from "../../types/product";

defineProps<{
    product: Product;
}>();

const emit = defineEmits<{
    remove: [productId: number];
    addToCart: [product: Product];
}>();
</script>

<template>
    <article class="wishlist-card">
        <RouterLink
            :to="{
                name: 'product-detail',
                params: {
                    id: product.id
                }
            }"
            class="product-image-wrapper"
        >
            <img
                class="product-image"
                :src="product.image"
                :alt="product.title"
                loading="lazy"
            />
        </RouterLink>

        <div class="product-content">
            <p class="product-category">
                {{ product.category }}
            </p>

            <RouterLink
                :to="{
                    name: 'product-detail',
                    params: {
                        id: product.id
                    }
                }"
                class="product-title"
            >
                {{ product.title }}
            </RouterLink>

            <p class="product-price">
                {{
                    product.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "EUR"
                    })
                }}
            </p>

            <div class="wishlist-actions">
                <button
                    class="cart-button"
                    type="button"
                    @click="emit('addToCart', product)"
                >
                    <i
                        class="bi bi-cart-plus"
                        aria-hidden="true"
                    ></i>

                    Add to cart
                </button>

                <button
                    class="remove-button"
                    type="button"
                    aria-label="Rimuovi dai preferiti"
                    @click="emit('remove', product.id)"
                >
                    <i
                        class="bi bi-trash3"
                        aria-hidden="true"
                    ></i>
                </button>
            </div>
        </div>
    </article>
</template>
<style scoped>
.wishlist-card {
    display: flex;
    flex-direction: column;

    height: 100%;
    overflow: hidden;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);

    background-color: var(--color-surface);
    box-shadow: var(--shadow-sm);

    transition:
        transform var(--transition-fast),
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
}

.wishlist-card:hover {
    transform: translateY(-4px);

    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-md);
}

/* ==========================
   IMAGE
========================== */

.product-image-wrapper {
    display: grid;
    place-items: center;

    height: 250px;
    margin: var(--space-md) var(--space-md) 0;
    padding: var(--space-xl);

    overflow: hidden;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    background-color: var(--color-surface);

    transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
}

.wishlist-card:hover .product-image-wrapper {
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-xs);
}

.product-image-wrapper:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;
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

.wishlist-card:hover .product-image {
    transform: scale(1.025);
}

/* ==========================
   CONTENT
========================== */

.product-content {
    display: flex;
    flex: 1;
    flex-direction: column;

    padding: var(--space-lg);
}

/* ==========================
   CATEGORY
========================== */

.product-category {
    margin: 0 0 var(--space-sm);

    color: var(--color-primary);

    font-size: var(--font-size-xs);
    font-weight: 800;
    letter-spacing: 0.07em;
    line-height: 1.2;
    text-transform: uppercase;
}

/* ==========================
   TITLE
========================== */

.product-title {
    display: -webkit-box;

    min-height: 3rem;
    margin: 0 0 var(--space-md);

    overflow: hidden;

    color: var(--color-text);

    font-size: var(--font-size-md);
    font-weight: 700;
    line-height: 1.5;
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

/* ==========================
   PRICE
========================== */

.product-price {
    margin: 0 0 var(--space-lg);

    color: var(--color-text);

    font-size: var(--font-size-lg);
    font-weight: 800;
    letter-spacing: -0.03em;
}

/* ==========================
   ACTIONS
========================== */

.wishlist-actions {
    display: flex;
    align-items: center;

    gap: var(--space-sm);
    margin-top: auto;
}

/* ==========================
   CART BUTTON
========================== */

.cart-button {
    display: inline-flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    gap: var(--space-sm);
    min-height: 44px;
    padding: var(--space-sm) var(--space-md);

    border: 1px solid transparent;
    border-radius: var(--radius-md);

    background-color: var(--color-primary);
    color: var(--color-text-inverse);

    box-shadow: var(--shadow-xs);

    font-family: inherit;
    font-size: var(--font-size-sm);
    font-weight: 700;

    cursor: pointer;

    transition:
        background-color var(--transition-fast),
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
}

.cart-button:hover {
    transform: translateY(-2px);

    background-color: var(--color-primary-hover);
    box-shadow: var(--shadow-sm);
}

.cart-button:active {
    transform: translateY(0);
}

.cart-button:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;
}

/* ==========================
   REMOVE BUTTON
========================== */

.remove-button {
    display: grid;
    place-items: center;
    flex-shrink: 0;

    width: 44px;
    height: 44px;
    padding: 0;

    border: 1px solid transparent;
    border-radius: var(--radius-md);

    background-color: transparent;
    color: var(--color-error);

    cursor: pointer;

    transition:
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        transform var(--transition-fast);
}

.remove-button:hover {
    transform: translateY(-2px);

    border-color: rgb(198 40 40 / 15%);
    background-color: var(--color-error-soft);
}

.remove-button:active {
    transform: translateY(0);
}

.remove-button:focus-visible {
    outline: 3px solid rgb(198 40 40 / 20%);
    outline-offset: 3px;
}

/* ==========================
   MOBILE
========================== */

@media (max-width: 576px) {
    .product-image-wrapper {
        height: 220px;
        margin: var(--space-sm) var(--space-sm) 0;
        padding: var(--space-lg);
    }

    .product-content {
        padding: var(--space-md);
    }

    .product-title {
        font-size: var(--font-size-sm);
    }

    .product-price {
        font-size: var(--font-size-md);
    }

    .wishlist-actions {
        align-items: stretch;
        flex-direction: column;
    }

    .cart-button,
    .remove-button {
        width: 100%;
    }

    .remove-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        gap: var(--space-sm);
    }
}
</style>