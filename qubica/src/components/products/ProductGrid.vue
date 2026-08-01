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
        <div class="empty-state-icon">
            <i
                class="bi bi-box-seam"
                aria-hidden="true"
            ></i>
        </div>

        <h2>Nessun prodotto disponibile</h2>

        <p>
            Al momento non ci sono prodotti da mostrare in questa
            categoria.
        </p>
    </div>
</template>

<style scoped>
.product-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    gap: clamp(
        var(--space-lg),
        2.4vw,
        var(--space-xl)
    );
}

/* ==========================
   EMPTY STATE
========================== */

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 22rem;
    padding: var(--space-2xl);

    text-align: center;
}

.empty-state-icon {
    display: grid;
    place-items: center;

    width: 72px;
    height: 72px;
    margin-bottom: var(--space-lg);

    border-radius: var(--radius-full);

    background: var(--color-primary-soft);
    color: var(--color-primary);

    box-shadow: var(--shadow-xs);
}

.empty-state-icon i {
    font-size: 2rem;
}

.empty-state h2 {
    margin: 0 0 var(--space-sm);

    color: var(--color-text);

    font-size: var(--font-size-xl);
    font-weight: 700;
    letter-spacing: -0.025em;
}

.empty-state p {
    max-width: 28rem;
    margin: 0;

    color: var(--color-text-muted);

    font-size: var(--font-size-md);
    line-height: 1.7;
}

/* ==========================
   RESPONSIVE
========================== */

@media (max-width: 1100px) {
    .product-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 780px) {
    .product-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));

        gap: var(--space-lg);
    }
}

@media (max-width: 576px) {
    .product-grid {
        grid-template-columns: 1fr;

        gap: var(--space-lg);
    }

    .empty-state {
        min-height: 17rem;
        padding: var(--space-xl);
    }

    .empty-state-icon {
        width: 64px;
        height: 64px;
    }

    .empty-state h2 {
        font-size: var(--font-size-lg);
    }

    .empty-state p {
        font-size: var(--font-size-sm);
    }
}
</style>