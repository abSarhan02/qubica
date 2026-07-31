<script setup lang="ts">
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard.vue";

defineProps<{
    products: Product[];
}>();
</script>

<template>
    <div class="product-grid">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
    </div>
</template>

<style scoped>
.product-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
}

@media (max-width: 1000px) {
    .product-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 750px) {
    .product-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 500px) {
    .product-grid {
        grid-template-columns: 1fr;
    }
}
</style>