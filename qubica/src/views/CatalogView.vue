<script setup lang="ts">
import {
    computed,
    ref,
    watch
} from "vue";

import { useRoute } from "vue-router";

import ErrorMessage from "../components/common/ErrorMessage.vue";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";
import ProductGrid from "../components/products/ProductGrid.vue";

import { productService } from "../services/productService";

import type {
    Category,
    Product
} from "../types/product";

const route = useRoute();

const products = ref<Product[]>([]);
const isLoading = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const selectedCategory = computed<Category | null>(() => {
    const category = route.query.category;

    return typeof category === "string"
        ? category
        : null;
});

const pageTitle = computed<string>(() => {
    if (!selectedCategory.value) {
        return "Tutti i prodotti";
    }

    return selectedCategory.value;
});

const pageDescription = computed<string>(() => {
    if (!selectedCategory.value) {
        return "Scopri tutti i prodotti disponibili nel nostro negozio.";
    }

    return `Scopri i prodotti della categoria ${selectedCategory.value}.`;
});

async function loadProducts(): Promise<void> {
    isLoading.value = true;
    errorMessage.value = null;

    try {
        if (selectedCategory.value) {
            products.value =
                await productService.getByCategory(
                    selectedCategory.value
                );
        } else {
            products.value =
                await productService.getAll();
        }
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

watch(
    selectedCategory,
    () => {
        loadProducts();
    },
    {
        immediate: true
    }
);
</script>

<template>
    <section class="catalog-view">
        <div class="catalog-header">
            <div>
                <p class="eyebrow">
                    Vitrina Store
                </p>

                <h1>
                    {{ pageTitle }}
                </h1>

                <p class="catalog-description">
                    {{ pageDescription }}
                </p>
            </div>

            <p
                v-if="!isLoading && !errorMessage"
                class="product-count"
            >
                {{ products.length }}
                {{
                    products.length === 1
                        ? "prodotto"
                        : "prodotti"
                }}
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
.catalog-view {
    width: 100%;
}

.catalog-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: var(--space-xl);
    margin-bottom: var(--space-2xl);
}

.eyebrow {
    margin: 0 0 var(--space-sm);

    color: var(--color-primary);

    font-size: var(--font-size-sm);
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 1.2;
    text-transform: uppercase;
}

.catalog-header h1 {
    margin: 0 0 var(--space-md);

    color: var(--color-text);

    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
    text-transform: capitalize;
}

.catalog-description {
    max-width: 37.5rem;
    margin: 0;

    color: var(--color-text-muted);

    font-size: var(--font-size-md);
    line-height: 1.7;
}

.product-count {
    flex-shrink: 0;

    margin: 0;
    padding: var(--space-sm) var(--space-md);

    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);

    background-color: var(--color-surface);
    color: var(--color-text-muted);

    box-shadow: var(--shadow-xs);

    font-size: var(--font-size-sm);
    font-weight: 700;
    white-space: nowrap;
}

@media (max-width: 650px) {
    .catalog-header {
        flex-direction: column;
        align-items: flex-start;

        gap: var(--space-md);
        margin-bottom: var(--space-xl);
    }

    .catalog-header h1 {
        font-size: clamp(2rem, 12vw, 2.75rem);
    }

    .catalog-description {
        font-size: var(--font-size-sm);
    }

    .product-count {
        padding: var(--space-xs) var(--space-md);
    }
}
</style>