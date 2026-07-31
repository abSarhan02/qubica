<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "../stores/cartStore";
import ErrorMessage from "../components/common/ErrorMessage.vue";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";
import ToastNotification from "../components/common/ToastNotification.vue";
import { productService } from "../services/productService";
import type { Product } from "../types/product";

const route = useRoute();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const isLoading = ref<boolean>(false);
const errorMessage = ref<string | null>(null);
const isAdded = ref<boolean>(false);
const isToastVisible = ref<boolean>(false);

let feedbackTimer: ReturnType<typeof setTimeout> | null = null;
const productId = computed<number | null>(() => {
    const id = Number(route.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return null;
    }

    return id;
});

const formattedPrice = computed<string>(() => {
    if (!product.value) {
        return "";
    }

    return product.value.price.toLocaleString("it-IT", {
        style: "currency",
        currency: "EUR"
    });
});

async function loadProduct(): Promise<void> {
    product.value = null;
    errorMessage.value = null;

    if (productId.value === null) {
        errorMessage.value = "L'identificativo del prodotto non è valido.";
        return;
    }

    isLoading.value = true;

    try {
        const result = await productService.getById(productId.value);

        if (!result || !result.id) {
            errorMessage.value = "Il prodotto richiesto non è stato trovato.";
            return;
        }

        product.value = result;
    } catch (error: unknown) {
        console.error(
            "Errore durante il caricamento del prodotto:",
            error
        );

        errorMessage.value =
            "Non è stato possibile caricare il prodotto. Controlla la connessione e riprova.";
    } finally {
        isLoading.value = false;
    }
}
function addToCart(): void {
    if (!product.value) {
        return;
    }

    cartStore.addItem(product.value);

    isAdded.value = true;
    isToastVisible.value = true;

    if (feedbackTimer) {
        clearTimeout(feedbackTimer);
    }

    feedbackTimer = setTimeout(() => {
        isAdded.value = false;
        isToastVisible.value = false;
        feedbackTimer = null;
    }, 2500);
}

onBeforeUnmount(() => {
    if (feedbackTimer) {
        clearTimeout(feedbackTimer);
    }
});

watch(
    productId,
    () => {
        loadProduct();
    },
    {
        immediate: true
    }
);
</script>

<template>
    <section class="product-detail-view">
        <RouterLink :to="{ name: 'catalog' }" class="back-link">
            <i class="bi bi-arrow-left" aria-hidden="true"></i>

            Torna al catalogo
        </RouterLink>

        <LoadingSpinner v-if="isLoading" message="Caricamento prodotto..." />

        <ErrorMessage v-else-if="errorMessage" :message="errorMessage" @retry="loadProduct" />

        <article v-else-if="product" class="product-detail">
            <div class="product-image-section">
                <div class="product-image-wrapper">
                    <img class="product-image" :src="product.image" :alt="product.title" />
                </div>
            </div>

            <div class="product-information">
                <p class="product-category">
                    {{ product.category }}
                </p>

                <h1 class="product-title">
                    {{ product.title }}
                </h1>

                <div class="product-rating" :aria-label="`Valutazione ${product.rating.rate} su 5, basata su ${product.rating.count} recensioni`
                    ">
                    <div class="rating-value">
                        <i class="bi bi-star-fill" aria-hidden="true"></i>

                        <span>
                            {{ product.rating.rate }}
                        </span>
                    </div>

                    <span class="rating-count">
                        {{ product.rating.count }} recensioni
                    </span>
                </div>

                <p class="product-description">
                    {{ product.description }}
                </p>

                <div class="purchase-section">
                    <p class="product-price">
                        {{ formattedPrice }}
                    </p>

                    <button class="add-to-cart-button" :class="{ added: isAdded }" type="button" @click="addToCart">
                        <i class="bi" :class="isAdded ? 'bi-check-lg' : 'bi-cart-plus'" aria-hidden="true"></i>

                        {{ isAdded ? "Aggiunto" : "Aggiungi al carrello" }}
                    </button>
                </div>
            </div>
        </article>
        <ToastNotification message="Prodotto aggiunto al carrello" :visible="isToastVisible" />
    </section>

</template>
<style scoped>

/* ==========================
   BACK LINK
========================== */
.add-to-cart-button.added {
    background-color: var(--color-success);
    box-shadow: var(--shadow-sm);
}

.add-to-cart-button.added:hover {
    background-color: var(--color-success-hover);
    box-shadow: var(--shadow-md);
}
.back-link {
    display: inline-flex;
    align-items: center;

    gap: var(--space-sm);
    margin-bottom: var(--space-xl);

    color: var(--color-text-muted);

    font-size: var(--font-size-sm);
    font-weight: 700;
    text-decoration: none;

    transition:
        color var(--transition-fast),
        transform var(--transition-fast);
}

.back-link:hover {
    color: var(--color-primary);
    transform: translateX(-3px);
}

.back-link:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;

    border-radius: var(--radius-sm);
}

/* ==========================
   PRODUCT LAYOUT
========================== */

.product-detail {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    align-items: start;

    gap: var(--space-2xl);
}

/* ==========================
   IMAGE SECTION
========================== */

.product-image-section {
    position: sticky;
    top: var(--space-xl);

    min-width: 0;
    padding: var(--space-lg);

    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);

    background-color: var(--color-background-alt);
    box-shadow: var(--shadow-sm);
}

.product-image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 36rem;
    padding: var(--space-2xl);

    overflow: hidden;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);

    background-color: var(--color-surface);

    transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
}

.product-image-section:hover .product-image-wrapper {
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-md);
}

.product-image {
    display: block;

    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 30rem;

    object-fit: contain;

    transition: transform var(--transition-medium);
}

.product-image-section:hover .product-image {
    transform: scale(1.025);
}

/* ==========================
   PRODUCT INFORMATION
========================== */

.product-information {
    display: flex;
    flex-direction: column;

    min-width: 0;
    min-height: 36rem;
    padding: var(--space-md) 0;
}

/* ==========================
   CATEGORY
========================== */

.product-category {
    width: fit-content;
    margin: 0 0 var(--space-md);

    color: var(--color-primary);

    font-size: var(--font-size-xs);
    font-weight: 800;
    letter-spacing: 0.14em;
    line-height: 1.2;
    text-transform: uppercase;
}

/* ==========================
   TITLE
========================== */

.product-title {
    margin: 0 0 var(--space-lg);

    color: var(--color-text);

    font-size: clamp(2.25rem, 4vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: 1.08;
}

/* ==========================
   RATING
========================== */

.product-rating {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;

    width: fit-content;
    gap: var(--space-sm);
    margin-bottom: var(--space-xl);
    padding: var(--space-sm) var(--space-md);

    border: 1px solid var(--color-rating-border);
    border-radius: var(--radius-full);

    background-color: var(--color-rating-background);
    color: var(--color-rating-text);

    font-size: var(--font-size-sm);
}

.rating-value {
    display: inline-flex;
    align-items: center;

    gap: var(--space-xs);

    font-weight: 800;
}

.rating-value i {
    color: var(--color-rating);
}

.rating-count {
    color: var(--color-text-muted);

    font-size: var(--font-size-xs);
}

/* ==========================
   DESCRIPTION
========================== */

.product-description {
    max-width: 44rem;
    margin: 0 0 var(--space-2xl);

    color: var(--color-text-soft);

    font-size: var(--font-size-lg);
    line-height: 1.85;
}

/* ==========================
   PURCHASE SECTION
========================== */

.purchase-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    gap: var(--space-lg);
    margin-top: auto;
    padding-top: var(--space-xl);

    border-top: 1px solid var(--color-divider);
}

.product-price {
    margin: 0;

    color: var(--color-text);

    font-size: clamp(2.25rem, 4vw, 2.8rem);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 1;
}

/* ==========================
   ADD TO CART BUTTON
========================== */

.add-to-cart-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 3.625rem;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-xl);

    border: 1px solid transparent;
    border-radius: var(--radius-full);

    background-color: var(--color-primary);
    color: var(--color-text-inverse);

    box-shadow: var(--shadow-sm);

    font-family: inherit;
    font-size: var(--font-size-md);
    font-weight: 800;

    cursor: pointer;

    transition:
        background-color var(--transition-fast),
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
}

.add-to-cart-button:hover {
    background-color: var(--color-primary-hover);

    transform: translateY(-2px);

    box-shadow: var(--shadow-md);
}

.add-to-cart-button:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
}

.add-to-cart-button:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;
}

/* ==========================
   TABLET
========================== */

@media (max-width: 900px) {
    .product-detail {
        grid-template-columns: 1fr;

        gap: var(--space-xl);
    }

    .product-image-section {
        position: static;
        top: auto;
    }

    .product-image-wrapper {
        min-height: 28rem;
    }

    .product-image {
        max-height: 24rem;
    }

    .product-information {
        min-height: auto;
        padding: 0;
    }
}

/* ==========================
   MOBILE
========================== */

@media (max-width: 576px) {
    .back-link {
        margin-bottom: var(--space-lg);
    }

    .product-detail {
        gap: var(--space-lg);
    }

    .product-image-section {
        padding: var(--space-md);

        border-radius: var(--radius-lg);
    }

    .product-image-wrapper {
        min-height: 20rem;
        padding: var(--space-lg);

        border-radius: var(--radius-md);
    }

    .product-image {
        max-height: 17rem;
    }

    .product-category {
        margin-bottom: var(--space-sm);
    }

    .product-title {
        margin-bottom: var(--space-md);

        font-size: clamp(2rem, 10vw, 2.5rem);
    }

    .product-rating {
        margin-bottom: var(--space-lg);
    }

    .product-description {
        margin-bottom: var(--space-xl);

        font-size: var(--font-size-md);
        line-height: 1.75;
    }

    .purchase-section {
        gap: var(--space-md);
        padding-top: var(--space-lg);
    }

    .product-price {
        font-size: 2rem;
    }

    .add-to-cart-button {
        min-height: 3.375rem;
    }
}
</style>