<script setup lang="ts">
import type { Product } from "../../types/product";

defineProps<{
    product: Product;
}>();
</script>

<template>
    <article class="product-card">
        <RouterLink
            :to="{
                name: 'product-detail',
                params: {
                    id: product.id
                }
            }"
            class="product-link"
        >
            <div class="product-image">
                <img
                    :src="product.image"
                    :alt="product.title"
                />
            </div>

            <div class="product-content">
                <p class="product-category">
                    {{ product.category }}
                </p>

                <h2 class="product-title">
                    {{ product.title }}
                </h2>

                <p class="product-price">
                    {{ product.price.toFixed(2) }} €
                </p>
            </div>
        </RouterLink>
    </article>
</template>

<style scoped>
.product-card {
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
}

.product-link {
    display: block;
    height: 100%;
    color: inherit;
    text-decoration: none;
}

.product-image {
    height: 240px;
    padding: 1.5rem;
    background-color: #ffffff;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.product-content {
    padding: 1rem;
}

.product-category {
    margin-bottom: 0.5rem;
    color: var(--color-primary);
    font-size: 0.8rem;
    text-transform: capitalize;
}

.product-title {
    display: -webkit-box;
    overflow: hidden;
    min-height: 3rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.product-price {
    font-size: 1.2rem;
    font-weight: 700;
}
</style>