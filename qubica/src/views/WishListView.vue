<script setup lang="ts">
import { storeToRefs } from "pinia";

import WishlistCard from "../components/wishlist/WishlistCard.vue";

import { useCartStore } from "../stores/cartStore";
import { useWishlistStore } from "../stores/wishListStore.ts";

import type { Product } from "../types/product";

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

const {
    products,
    totalItems,
    isEmpty
} = storeToRefs(wishlistStore);

const {
    removeProduct,
    clearWishlist
} = wishlistStore;

function addToCart(product: Product): void {
    cartStore.addItem(product);
}
</script>

<template>
    <section class="wishlist-view">
        <div class="wishlist-header">
            <div>
                <p class="eyebrow">
                    I tuoi preferiti
                </p>

                <h1>Wishlist</h1>

                <p v-if="!isEmpty">
                    {{ totalItems }}
                    {{
                        totalItems === 1
                            ? "prodotto salvato"
                            : "prodotti salvati"
                    }}
                </p>
            </div>

            <button
                v-if="!isEmpty"
                class="clear-button"
                type="button"
                @click="clearWishlist"
            >
                <i
                    class="bi bi-trash3"
                    aria-hidden="true"
                ></i>

                Svuota wishlist
            </button>
        </div>

        <div
            v-if="isEmpty"
            class="empty-wishlist"
        >
            <i
                class="bi bi-heart"
                aria-hidden="true"
            ></i>

            <h2>La wishlist è vuota</h2>

            <p>
                Salva i prodotti che ti interessano per ritrovarli facilmente.
            </p>

            <RouterLink
                :to="{ name: 'catalog' }"
                class="catalog-link"
            >
                Esplora il catalogo
            </RouterLink>
        </div>

        <div
            v-else
            class="wishlist-grid"
        >
            <WishlistCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                @remove="removeProduct"
                @add-to-cart="addToCart"
            />
        </div>
    </section>
</template>

<style scoped>
.wishlist-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 2rem;
    margin-bottom: 2rem;
}

.eyebrow {
    margin-bottom: 0.5rem;

    color: var(--color-primary);

    font-weight: 700;
}

.wishlist-header h1 {
    margin-bottom: 0.5rem;

    font-size: clamp(2rem, 5vw, 3.5rem);
}

.wishlist-header p {
    margin: 0;
    color: var(--color-text-muted);
}

.clear-button {
    display: inline-flex;
    align-items: center;

    gap: 0.5rem;
    padding: 0.75rem 1rem;

    border-radius: var(--radius-md);

    color: var(--color-error);
    background-color: transparent;

    font-weight: 700;
    cursor: pointer;
}

.clear-button:hover {
    background-color: rgb(198 40 40 / 10%);
}

.wishlist-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    gap: 1.5rem;
}

.empty-wishlist {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 450px;

    text-align: center;
}

.empty-wishlist i {
    margin-bottom: 1rem;

    color: var(--color-primary);
    font-size: 4rem;
}

.empty-wishlist h2 {
    margin-bottom: 0.5rem;
}

.empty-wishlist p {
    max-width: 500px;
    margin-bottom: 1.5rem;

    color: var(--color-text-muted);
}

.catalog-link {
    display: inline-flex;

    padding: 0.85rem 1.25rem;

    border-radius: var(--radius-md);

    color: #ffffff;
    background-color: var(--color-primary);

    font-weight: 700;
}

.catalog-link:hover {
    background-color: var(--color-primary-hover);
}

@media (max-width: 1050px) {
    .wishlist-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 750px) {
    .wishlist-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 520px) {
    .wishlist-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .wishlist-grid {
        grid-template-columns: 1fr;
    }
}
</style>