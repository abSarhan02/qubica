<script setup lang="ts">
import type { Product } from "../../types/product";

defineProps<{
    product: Product;
}>();
</script>

<template>
    <article class="product-card">
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
    height: 100%;
    overflow: hidden;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);

    background-color: var(--color-surface);
    box-shadow: var(--shadow-sm);

    transition:
        transform var(--transition-fast),
        box-shadow var(--transition-fast),
        border-color var(--transition-fast);
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
    padding: 1rem 1rem 0;

    background-color: var(--color-surface);
}

.product-image-box {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 240px;
    padding: 2rem;

    overflow: hidden;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    background-color: #ffffff;

    box-shadow:
        0 8px 24px rgb(15 23 42 / 5%),
        inset 0 1px 0 rgb(255 255 255 / 70%);

    transition:
        transform var(--transition-fast),
        box-shadow var(--transition-fast),
        border-color var(--transition-fast);
}

.product-card:hover .product-image-box {
    transform: translateY(-2px);

    border-color: var(--color-border-hover);

    box-shadow:
        0 14px 30px rgb(15 23 42 / 8%),
        inset 0 1px 0 rgb(255 255 255 / 80%);
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

    padding: 1.15rem 1.25rem 1.25rem;
}

/* ==========================
   CATEGORY
========================== */

.product-category {
    margin: 0 0 0.55rem;

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
    margin: 0 0 1rem;

    overflow: hidden;

    color: var(--color-text);

    font-size: 1rem;
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

    gap: 0.75rem;
    margin-top: auto;
}

.product-price {
    margin: 0;

    color: var(--color-text);

    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.03em;
}

.product-rating {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;

    gap: 0.3rem;

    color: var(--color-text-muted);

    font-size: 0.8rem;
}

.product-rating i {
    color: var(--color-rating);
    font-size: 0.78rem;
}

.rating-value {
    color: var(--color-text);
    font-weight: 700;
}

.rating-count {
    color: var(--color-text-muted);
    font-size: 0.72rem;
}

/* ==========================
   ACTION
========================== */

.product-action {
    display: inline-flex;
    align-items: center;

    gap: 0.4rem;
    width: fit-content;

    margin-top: 1.1rem;

    color: var(--color-primary);

    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.product-action i {
    font-size: 0.9rem;

    transition: transform var(--transition-fast);
}

.product-card:hover .product-action i {
    transform: translateX(4px);
}

/* ==========================
   MOBILE
========================== */

@media (max-width: 576px) {
    .product-image-area {
        padding: 0.75rem 0.75rem 0;
    }

    .product-image-box {
        height: 210px;
        padding: 1.5rem;
    }

    .product-content {
        padding: 1rem;
    }

    .product-title {
        font-size: 0.95rem;
    }

    .product-price {
        font-size: 1.1rem;
    }

    .rating-count {
        display: none;
    }
}
</style>