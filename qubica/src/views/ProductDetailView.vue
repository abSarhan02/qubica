<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const productId = route.params.id;
</script>

<template>
    <section class="product-detail-view">
        <h1>
            Dettaglio prodotto
        </h1>

        <p>
            ID prodotto: {{ productId }}
        </p>

        <RouterLink to="/">
            Torna al catalogo
        </RouterLink>
    </section>
</template>

<style scoped>
.product-detail-view a {
    display: inline-block;
    margin-top: 1rem;
    color: var(--color-primary);
    font-weight: 600;
}

.product-detail-view a:hover {
    text-decoration: underline;
}
</style>