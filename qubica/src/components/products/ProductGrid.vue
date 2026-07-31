<script setup lang="ts">
import ProductCard from "./ProductCard.vue";
import type { Product } from "../../types/product";

defineProps<{
    products: Product[];
}>();
</script>

<template>
    <div
        v-if="products.length > 0"
        class="product-grid"
    >
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
    </div>

    <div
        v-else
        class="empty-state"
    >
        <i
            class="bi bi-bag-x"
            aria-hidden="true"
        ></i>

        <h2>Nessun prodotto trovato</h2>

        <p>
            Non ci sono prodotti da mostrare.
        </p>
    </div>
</template>

<style scoped>
.product-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    gap: var(--space-lg);
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 18rem;
    padding: var(--space-2xl);

    text-align: center;
    color: var(--color-text-muted);
}

.empty-state i {
    margin-bottom: var(--space-md);

    color: var(--color-primary);

    font-size: 3rem;
}

.empty-state h2 {
    margin-bottom: var(--space-sm);

    color: var(--color-text);

    font-size: var(--font-size-xl);
    font-weight: 700;
}

.empty-state p {
    max-width: 30rem;
    margin: 0;

    color: var(--color-text-muted);

    font-size: var(--font-size-md);
    line-height: 1.6;
}

@media (max-width: 1050px) {
    .product-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));

        gap: var(--space-md);
    }
}

@media (max-width: 576px) {
    .product-grid {
        grid-template-columns: 1fr;
    }

    .empty-state {
        min-height: 14rem;
        padding: var(--space-xl);
    }

    .empty-state i {
        font-size: 2.5rem;
    }

    .empty-state h2 {
        font-size: var(--font-size-lg);
    }
}
</style>