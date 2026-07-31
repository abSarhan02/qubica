<script setup lang="ts">
import { onMounted, ref } from "vue";

import ErrorMessage from "../components/common/ErrorMessage.vue";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";
import ProductGrid from "../components/products/ProductGrid.vue";

import { productService } from "../services/productService";
import type { Product } from "../types/product";

const products = ref<Product[]>([]);
const isLoading = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

async function loadProducts(): Promise<void> {
    isLoading.value = true;
    errorMessage.value = null;

    try {
        products.value = await productService.getAll();
    } catch (error: unknown) {
        console.error(
            "Errore durante il caricamento dei prodotti:",
            error
        );

        errorMessage.value =
            "Non è stato possibile caricare i prodotti. Controlla la connessione e riprova.";
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    loadProducts();
});
</script>

<template>
    <section class="catalog-view">
        <div class="catalog-header">
            <div>
                <p class="eyebrow">
                    Vitrina Store
                </p>

                <h1>
                    Il nostro catalogo
                </h1>

                <p class="catalog-description">
                    Scopri tutti i prodotti disponibili nel nostro negozio.
                </p>
            </div>

            <p
                v-if="!isLoading && !errorMessage"
                class="product-count"
            >
                {{ products.length }}
                {{ products.length === 1 ? "prodotto" : "prodotti" }}
            </p>
        </div>

        <LoadingSpinner
            v-if="isLoading"
            message="Caricamento prodotti..."
        />

        <ErrorMessage
            v-else-if="errorMessage"
            :message="errorMessage"
            @retry="loadProducts"
        />

        <ProductGrid
            v-else
            :products="products"
        />
    </section>
</template>

<style scoped>
.catalog-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 2rem;
    margin-bottom: 2.5rem;
}

.eyebrow {
    margin-bottom: 0.5rem;

    color: var(--color-primary);

    font-weight: 700;
    letter-spacing: 0.03em;
}

.catalog-header h1 {
    margin-bottom: 0.75rem;

    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.1;
}

.catalog-description {
    max-width: 600px;
    margin: 0;

    color: var(--color-text-muted);
}

.product-count {
    flex-shrink: 0;
    margin: 0;

    color: var(--color-text-muted);
    font-weight: 600;
}

@media (max-width: 650px) {
    .catalog-header {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>