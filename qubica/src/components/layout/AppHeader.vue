<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import type { Category } from "../../types/product";

const props = defineProps<{
    categories: Category[];
    categoriesLoading: boolean;
}>();

const route = useRoute();

const isMenuOpen = ref<boolean>(false);
const isDark = ref<boolean>(false);

const selectedCategory = computed<string | null>(() => {
    const category = route.query.category;

    return typeof category === "string"
        ? category
        : null;
});

function toggleMenu(): void {
    isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu(): void {
    isMenuOpen.value = false;
}

function toggleTheme(): void {
    isDark.value = !isDark.value;
}

function isCategoryActive(category: Category): boolean {
    return selectedCategory.value === category;
}
</script>

<template>
    <header class="header">
        <nav
            class="navbar container"
            aria-label="Navigazione principale"
        >
            <!-- Logo -->
            <RouterLink
                :to="{ name: 'catalog' }"
                class="logo"
                @click="closeMenu"
            >
                <h1>
                    V<span>i</span>trina
                </h1>
            </RouterLink>

            <!-- Menu -->
            <ul
                id="main-navigation"
                class="nav-links"
                :class="{ open: isMenuOpen }"
            >
                <li>
                    <RouterLink
                        :to="{ name: 'catalog' }"
                        :class="{
                            active: selectedCategory === null
                        }"
                        @click="closeMenu"
                    >
                        Tutti i prodotti
                    </RouterLink>
                </li>

                <li
                    v-for="category in props.categories"
                    :key="category"
                >
                    <RouterLink
                        :to="{
                            name: 'catalog',
                            query: {
                                category
                            }
                        }"
                        :class="{
                            active: isCategoryActive(category)
                        }"
                        @click="closeMenu"
                    >
                        {{ category }}
                    </RouterLink>
                </li>

                <li
                    v-if="props.categoriesLoading"
                    class="categories-loading"
                >
                    Caricamento categorie...
                </li>
            </ul>

            <!-- Azioni -->
            <div class="header-actions">
                <button
                    class="icon-button"
                    type="button"
                    :aria-label="
                        isDark
                            ? 'Attiva tema chiaro'
                            : 'Attiva tema scuro'
                    "
                    @click="toggleTheme"
                >
                    <i
                        class="bi"
                        :class="
                            isDark
                                ? 'bi-sun'
                                : 'bi-moon'
                        "
                        aria-hidden="true"
                    ></i>
                </button>

                <button
                    class="icon-button cart-button"
                    type="button"
                    aria-label="Apri carrello"
                >
                    <i
                        class="bi bi-cart3"
                        aria-hidden="true"
                    ></i>

                    <span class="cart-badge">
                        0
                    </span>
                </button>

                <button
                    class="icon-button hamburger-button"
                    type="button"
                    aria-controls="main-navigation"
                    :aria-expanded="isMenuOpen"
                    :aria-label="
                        isMenuOpen
                            ? 'Chiudi menu'
                            : 'Apri menu'
                    "
                    @click="toggleMenu"
                >
                    <i
                        class="bi"
                        :class="
                            isMenuOpen
                                ? 'bi-x-lg'
                                : 'bi-list'
                        "
                        aria-hidden="true"
                    ></i>
                </button>
            </div>
        </nav>
    </header>
</template>

<style scoped>
.header {
    position: sticky;
    top: 0;
    z-index: 100;

    width: 100%;

    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
}

.navbar {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    min-height: 72px;
    gap: 2rem;
}

.logo {
    flex-shrink: 0;
    color: var(--color-text);
}

.logo h1 {
    margin: 0;
    font-size: 2rem;
}

.logo span {
    color: var(--color-primary);
}

.nav-links {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 1.5rem;
}

.nav-links a {
    position: relative;

    display: block;

    padding-block: 0.5rem;

    color: var(--color-text-muted);

    font-size: 0.95rem;
    font-weight: 500;
    text-transform: capitalize;
    white-space: nowrap;

    transition: color var(--transition-fast);
}

.nav-links a::after {
    content: "";

    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    height: 2px;

    background-color: var(--color-primary);

    transform: scaleX(0);
    transform-origin: center;

    transition: transform var(--transition-fast);
}

.nav-links a:hover,
.nav-links a.active {
    color: var(--color-primary);
}

.nav-links a.active {
    font-weight: 700;
}

.nav-links a.active::after {
    transform: scaleX(1);
}

.categories-loading {
    color: var(--color-text-muted);
    font-size: 0.85rem;
}

.header-actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;

    gap: 0.4rem;
}

.icon-button {
    position: relative;

    display: grid;
    place-items: center;

    width: 42px;
    height: 42px;
    padding: 0;

    border-radius: var(--radius-full);

    color: var(--color-text);
    background-color: transparent;

    cursor: pointer;

    transition:
        color var(--transition-fast),
        background-color var(--transition-fast);
}

.icon-button:hover {
    color: var(--color-primary);
    background-color: var(--color-background);
}

.icon-button i {
    font-size: 1.2rem;
}

.cart-badge {
    position: absolute;
    top: -1px;
    right: -1px;

    display: grid;
    place-items: center;

    min-width: 18px;
    height: 18px;
    padding-inline: 4px;

    border-radius: var(--radius-full);

    color: #ffffff;
    background-color: var(--color-primary);

    font-size: 0.7rem;
    font-weight: 700;
}

.hamburger-button {
    display: none;
}

@media (max-width: 1050px) {
    .navbar {
        min-height: 64px;
    }

    .hamburger-button {
        display: grid;
    }

    .nav-links {
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;

        display: none;
        flex-direction: column;
        align-items: stretch;

        max-height: calc(100vh - 64px);
        padding: 1rem;
        gap: 0;

        overflow-y: auto;

        background-color: var(--color-surface);
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
        box-shadow: var(--shadow-sm);
    }

    .nav-links.open {
        display: flex;
    }

    .nav-links li {
        width: 100%;
    }

    .nav-links a {
        width: 100%;
        padding: 0.9rem 1rem;

        border-radius: var(--radius-md);
    }

    .nav-links a::after {
        display: none;
    }

    .nav-links a:hover,
    .nav-links a.active {
        background-color: var(--color-background);
    }

    .categories-loading {
        padding: 0.9rem 1rem;
    }
}

@media (max-width: 480px) {
    .navbar {
        gap: 0.5rem;
    }

    .logo h1 {
        font-size: 1.6rem;
    }

    .icon-button {
        width: 38px;
        height: 38px;
    }
}
</style>