<script setup lang="ts">
import { computed } from "vue";

import type { Product } from "../../types/product";
import { useWishlistStore } from "../../stores/wishListStore";

const props = defineProps<{
    product: Product;
}>();

const wishlistStore = useWishlistStore();

const isFavorite = computed<boolean>(() => {
    return wishlistStore.contains(props.product.id);
});

function toggleWishlist(): void {
    wishlistStore.toggleProduct(props.product);
}
</script>

<template>
    <article class="product-card">
        <button class="wishlist-toggle" type="button" :class="{ active: isFavorite }" :aria-label="isFavorite
                ? 'Rimuovi dai preferiti'
                : 'Aggiungi ai preferiti'
            " @click="toggleWishlist">
            <i class="bi" :class="isFavorite
                    ? 'bi-heart-fill'
                    : 'bi-heart'
                " aria-hidden="true"></i>
        </button>
        <RouterLink class="product-link" :to="{
            name: 'product-detail',
            params: {
                id: product.id
            }
        }">
            <div class="product-image-area">
                <div class="product-image-box">
                    <img class="product-image" :src="product.image" :alt="product.title" loading="lazy" />
                </div>
            </div>

            <div class="product-content">
                <p class="product-category">
                    {{ product.category }}
                </p>

                <h2 class="product-title">
                    {{ product.title }}
                </h2>

                <div class="product-footer">
                    <p class="product-price">
                        {{
                            product.price.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "EUR"
                            })
                        }}
                    </p>

                    <div class="product-rating" :aria-label="`Valutazione ${product.rating.rate} su 5 stellle`">
                        <i class="bi bi-star-fill" aria-hidden="true"></i>

                        <span class="rating-value">
                            {{ product.rating.rate }}
                        </span>

                        <span class="rating-count">
                            ({{ product.rating.count }})
                        </span>
                    </div>
                </div>

                <span class="product-action">
                    Scopri di più

                    <i class="bi bi-arrow-right" aria-hidden="true"></i>
                </span>
            </div>
        </RouterLink>
    </article>
</template>
<style scoped>
.product-card {
    position: relative;

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

.product-card:hover {
    transform: translateY(-5px);

    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-md);
}

.product-card:focus-within {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;
}

/* ==========================
   WISHLIST BUTTON
========================== */

.wishlist-toggle {
    position: absolute;
    top: var(--space-lg);
    right: var(--space-lg);
    z-index: 3;

    display: grid;
    place-items: center;

    width: 42px;
    height: 42px;
    padding: 0;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);

    background-color: var(--color-overlay-light);
    color: var(--color-text);

    box-shadow: var(--shadow-sm);

    cursor: pointer;

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    transition:
        color var(--transition-fast),
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
}

.wishlist-toggle:hover {
    transform: scale(1.08);

    border-color: var(--color-error);
    background-color: var(--color-error-soft);
    color: var(--color-error);

    box-shadow: var(--shadow-md);
}

.wishlist-toggle:active {
    transform: scale(0.96);
}

.wishlist-toggle.active {
    border-color: var(--color-error);
    background-color: var(--color-error-soft);
    color: var(--color-error);
}

.wishlist-toggle:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;
}

.wishlist-toggle i {
    font-size: var(--font-size-lg);
}

/* ==========================
   PRODUCT LINK
========================== */

.product-link {
    display: flex;
    flex-direction: column;

    height: 100%;

    color: inherit;
    text-decoration: none;
}

/* ==========================
   IMAGE AREA
========================== */

.product-image-area {
    padding: var(--space-md) var(--space-md) 0;

    background-color: var(--color-surface);
}

.product-image-box {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 15rem;
    padding: var(--space-xl);

    overflow: hidden;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    background-color: var(--color-surface);
    box-shadow: var(--shadow-xs);

    transition:
        transform var(--transition-fast),
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
}

.product-card:hover .product-image-box {
    transform: translateY(-2px);

    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-sm);
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

.product-card:hover .product-image {
    transform: scale(1.03);
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
    letter-spacing: 0.08em;
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

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    transition: color var(--transition-fast);
}

.product-card:hover .product-title {
    color: var(--color-primary);
}

/* ==========================
   PRICE AND RATING
========================== */

.product-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: var(--space-sm);
    margin-top: auto;
}

.product-price {
    margin: 0;

    color: var(--color-text);

    font-size: var(--font-size-lg);
    font-weight: 800;
    letter-spacing: -0.03em;
}

.product-rating {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;

    gap: var(--space-xs);

    color: var(--color-text-muted);

    font-size: var(--font-size-xs);
}

.product-rating i {
    color: var(--color-rating);

    font-size: var(--font-size-xs);
}

.rating-value {
    color: var(--color-text);

    font-weight: 700;
}

.rating-count {
    color: var(--color-text-muted);

    font-size: var(--font-size-xs);
}

/* ==========================
   ACTION
========================== */

.product-action {
    display: inline-flex;
    align-items: center;

    width: fit-content;
    gap: var(--space-sm);
    margin-top: var(--space-lg);

    color: var(--color-primary);

    font-size: var(--font-size-xs);
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.product-action i {
    font-size: var(--font-size-sm);

    transition: transform var(--transition-fast);
}

.product-card:hover .product-action i {
    transform: translateX(4px);
}

/* ==========================
   MOBILE
========================== */

@media (max-width: 576px) {
    .wishlist-toggle {
        top: var(--space-md);
        right: var(--space-md);

        width: 38px;
        height: 38px;
    }

    .product-image-area {
        padding: var(--space-sm) var(--space-sm) 0;
    }

    .product-image-box {
        height: 13.125rem;
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

    .rating-count {
        display: none;
    }
}
</style>