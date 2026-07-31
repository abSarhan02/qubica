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
            <i class="bi bi-arrow-left"></i>
            Torna al catalogo
        </RouterLink>
    </section>
</template>
<style scoped>
.not-found-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 70vh;
    padding: var(--space-2xl);

    text-align: center;
}
.not-found-view a {
    gap: var(--space-sm);
}

.error-code {
    margin: 0;

    color: var(--color-primary);

    font-size: clamp(4rem, 12vw, 7rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.06em;
}

.not-found-view h1 {
    margin: var(--space-md) 0 var(--space-sm);

    color: var(--color-text);

    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
}

.not-found-view p:not(.error-code) {
    max-width: 32rem;
    margin: 0;

    color: var(--color-text-muted);

    font-size: var(--font-size-md);
    line-height: 1.7;
}

.not-found-view a {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    margin-top: var(--space-xl);
    padding: 0.9rem 1.5rem;

    border: 1px solid transparent;
    border-radius: var(--radius-md);

    background-color: var(--color-primary);
    color: var(--color-text-inverse);

    box-shadow: var(--shadow-sm);

    font-size: var(--font-size-sm);
    font-weight: 600;
    text-decoration: none;

    transition:
        background-color var(--transition-fast),
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
}

.not-found-view a:hover {
    background-color: var(--color-primary-hover);

    transform: translateY(-2px);

    box-shadow: var(--shadow-md);
}

.not-found-view a:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;
}

@media (max-width: 576px) {
    .not-found-view {
        min-height: 60vh;
        padding: var(--space-xl);
    }

    .not-found-view h1 {
        font-size: var(--font-size-xl);
    }

    .not-found-view p:not(.error-code) {
        font-size: var(--font-size-sm);
    }

    .not-found-view a {
        width: 100%;
        max-width: 18rem;
    }
}
</style>