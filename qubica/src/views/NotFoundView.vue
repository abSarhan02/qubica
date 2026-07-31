<script setup lang="ts">
</script>

<template>
    <section class="not-found-view">
        <p class="error-code">
            404
        </p>

        <h1>
            Pagina non trovata
        </h1>

        <p>
            La pagina richiesta non esiste.
        </p>

        <RouterLink to="/">
            Torna al catalogo
        </RouterLink>
    </section>
</template>

<style scoped>
.not-found-view {
    padding-block: 5rem;
    text-align: center;
}

.error-code {
    margin-bottom: 0;
    color: var(--color-primary);
    font-size: 5rem;
    font-weight: 800;
}

.not-found-view p {
    color: var(--color-text-muted);
}

.not-found-view a {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.8rem 1.2rem;

    border-radius: var(--radius-md);

    color: #ffffff;
    background-color: var(--color-primary);

    font-weight: 600;
}

.not-found-view a:hover {
    background-color: var(--color-primary-hover);
}
</style>