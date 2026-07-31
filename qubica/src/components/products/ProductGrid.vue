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
    gap: 1.5rem;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 300px;

    color: var(--color-text-muted);
    text-align: center;
}

.empty-state i {
    margin-bottom: 1rem;
    color: var(--color-primary);
    font-size: 2.5rem;
}

.empty-state h2 {
    margin-bottom: 0.5rem;
    color: var(--color-text);
}

.empty-state p {
    margin: 0;
}

@media (max-width: 1050px) {
    .product-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 750px) {
    .product-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 480px) {
    .product-grid {
        grid-template-columns: 1fr;
    }
}
</style>