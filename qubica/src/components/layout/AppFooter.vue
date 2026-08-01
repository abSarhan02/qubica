<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="footer">
        <div class="footer-content container">
            <div class="footer-brand">
                <RouterLink
                    :to="{ name: 'catalog' }"
                    class="footer-logo"
                >
                    V<span>i</span>trina
                </RouterLink>
            </div>

            <nav
                class="footer-navigation"
                aria-label="Footer navigation"
            >
                <RouterLink :to="{ name: 'catalog' }">
                    Catalog
                </RouterLink>

                <RouterLink :to="{ name: 'wishlist' }">
                    Wishlist
                </RouterLink>

                <RouterLink :to="{ name: 'cart' }">
                    Cart
                </RouterLink>
            </nav>

            <div class="footer-bottom">
                <p>
                    © {{ currentYear }} Vitrina
                </p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    margin-top: var(--space-2xl);
    padding: var(--space-2xl) 0;

    border-top: 1px solid var(--color-border);

    background-color: var(--color-surface);
}

.footer-content {
    display: grid;
    grid-template-columns: 1fr auto;

    gap: var(--space-xl);
}

.footer-brand {
    max-width: 400px;
}

.footer-logo {
    display: inline-block;
    margin-bottom: var(--space-sm);

    color: var(--color-text);

    font-size: 1.8rem;
    font-weight: 800;
}

.footer-logo span {
    color: var(--color-primary);
}

.footer-brand p {
    margin: 0;
    color: var(--color-text-muted);
}

.footer-navigation {
    display: flex;
    align-items: flex-start;

    gap: var(--space-lg);
}

.footer-navigation a {
    color: var(--color-text-muted);
    font-weight: 600;
}

.footer-navigation a:hover {
    color: var(--color-primary);
}

.footer-bottom {
    grid-column: 1 / -1;

    display: flex;
    justify-content: space-between;

    padding-top: var(--space-xl);

    border-top: 1px solid var(--color-border);
}

.footer-bottom p {
    margin: 0;

    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
}

@media (max-width: 700px) {
    .footer-content {
        grid-template-columns: 1fr;
    }

    .footer-navigation {
        flex-direction: column;
        gap: var(--space-sm);
    }

    .footer-bottom {
        flex-direction: column;
        gap: var(--space-sm);
    }
}
</style>