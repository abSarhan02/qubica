<script setup lang="ts">
</script>

<template>
    <section class="catalog-view">
        <div class="catalog-heading">
            <p class="eyebrow">
                Vitrina Store
            </p>

            <h1>
                Il nostro catalogo
            </h1>

            <p>
                Qui verranno mostrati i prodotti della Fake Store API.
            </p>
        </div>
    </section>
</template>

<style scoped>
.catalog-heading {
    max-width: 700px;
}

.eyebrow {
    margin-bottom: 0.5rem;
    color: var(--color-primary);
    font-weight: 700;
}

h1 {
    margin-bottom: 1rem;
    font-size: clamp(2rem, 5vw, 3.5rem);
}

.catalog-heading p:last-child {
    color: var(--color-text-muted);
}
</style>