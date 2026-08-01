<script setup lang="ts">
defineEmits<{
    explore: [];
}>();
</script>

<template>
    <section class="hero">
        <div class="hero-content">
            <p class="hero-label">
                Vitrina Store
            </p>

            <h1>
                Everything you need,
                <span>in one showcase.</span>
            </h1>

            <p class="hero-description">
                Explore our catalog and discover products for every need.
            </p>

            <button
                class="hero-button"
                type="button"
                @click="$emit('explore')"
            >
                Explore products

                <i
                    class="bi bi-arrow-down"
                    aria-hidden="true"
                ></i>
            </button>
        </div>

        <div
            class="hero-visual"
            aria-hidden="true"
        >
            <div class="visual-card card-one">
                <i class="bi bi-headphones"></i>
            </div>

            <div class="visual-card card-two">
                <i class="bi bi-bag"></i>
            </div>

            <div class="visual-card card-three">
                <i class="bi bi-smartwatch"></i>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hero {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;

    min-height: 31rem;
    margin-bottom: var(--space-2xl);
    padding: var(--space-2xl);

    overflow: hidden;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);

    background-color: var(--color-surface);
    box-shadow: var(--shadow-sm);
}

.hero-content {
    max-width: 40rem;
}

.hero-label {
    margin: 0 0 var(--space-md);

    color: var(--color-primary);

    font-size: var(--font-size-sm);
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.hero h1 {
    margin: 0 0 var(--space-lg);

    color: var(--color-text);

    font-size: clamp(2.75rem, 6vw, 5rem);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 1;
}

.hero h1 span {
    display: block;

    color: var(--color-primary);
}

.hero-description {
    max-width: 34rem;
    margin: 0 0 var(--space-xl);

    color: var(--color-text-muted);

    font-size: var(--font-size-lg);
    line-height: 1.7;
}

.hero-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    min-height: 3.25rem;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-xl);

    border-radius: var(--radius-full);

    background-color: var(--color-primary);
    color: var(--color-text-inverse);

    font-weight: 700;

    transition:
        background-color var(--transition-fast),
        transform var(--transition-fast);
}

.hero-button:hover {
    transform: translateY(-2px);

    background-color: var(--color-primary-hover);
}

.hero-button:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;
}

.hero-visual {
    position: relative;

    min-height: 22rem;
}

.visual-card {
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);

    background-color: var(--color-background-alt);
    box-shadow: var(--shadow-md);
}

.visual-card i {
    color: var(--color-primary);
    font-size: 4rem;
}

.card-one {
    top: 0;
    right: 3rem;

    width: 13rem;
    height: 13rem;

    transform: rotate(8deg);
}

.card-two {
    bottom: 0;
    left: 2rem;

    width: 11rem;
    height: 11rem;

    transform: rotate(-8deg);
}

.card-three {
    right: 0;
    bottom: 1.5rem;

    width: 8rem;
    height: 8rem;

    transform: rotate(5deg);
}

/* TABLET */
@media (max-width: 900px) {
    .hero {
        grid-template-columns: 1fr;

        min-height: auto;
    }

    .hero-content {
        max-width: 100%;
    }

    .hero-visual {
        display: none;
    }
}

/* MOBILE */
@media (max-width: 576px) {
    .hero {
        padding: var(--space-xl) var(--space-lg);

        border-radius: var(--radius-lg);
    }

    .hero h1 {
        font-size: clamp(2.5rem, 13vw, 3.5rem);
    }

    .hero-description {
        font-size: var(--font-size-md);
    }

    .hero-button {
        width: 100%;
    }
}
</style>