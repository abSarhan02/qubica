<script setup lang="ts">
import {
    computed,
    ref
} from "vue";

import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import { useCartStore } from "../../stores/cartStore";
import { useThemeStore } from "../../stores/themeStore";
import { useWishlistStore } from "../../stores/wishListStore";

import type { Category } from "../../types/product";

const props = defineProps<{
    categories: Category[];
    categoriesLoading: boolean;
}>();

const route = useRoute();

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const themeStore = useThemeStore();

const {
    totalItems
} = storeToRefs(cartStore);

const {
    totalItems: wishlistTotalItems
} = storeToRefs(wishlistStore);

const {
    isDark
} = storeToRefs(themeStore);

const isMenuOpen = ref<boolean>(false);

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

function isCategoryActive(category: Category): boolean {
    return selectedCategory.value === category;
}
</script>

<template>
    <header class="header">
        <nav class="navbar container" aria-label="Navigazione principale">
            <RouterLink :to="{ name: 'catalog' }" class="logo" aria-label="Vai al catalogo" @click="closeMenu">
                <span class="logo-text">
                    V<span class="logo-accent">i</span>trina
                </span>
            </RouterLink>

            <ul id="main-navigation" class="nav-links" :class="{ open: isMenuOpen }">
                <li>
                    <RouterLink :to="{ name: 'catalog' }" :class="{
                        active: selectedCategory === null
                    }" @click="closeMenu">
                        Tutti i prodotti
                    </RouterLink>
                </li>

                <li v-for="category in props.categories" :key="category">
                    <RouterLink :to="{
                        name: 'catalog',
                        query: {
                            category
                        }
                    }" :class="{
                            active: isCategoryActive(category)
                        }" @click="closeMenu">
                        {{ category }}
                    </RouterLink>
                </li>

                <li v-if="props.categoriesLoading" class="categories-loading">
                    Caricamento categorie...
                </li>
            </ul>

            <div class="header-actions">
                <button class="icon-button" type="button" :aria-label="isDark
                        ? 'Attiva tema chiaro'
                        : 'Attiva tema scuro'
                    " @click="themeStore.toggleTheme">
                    <i class="bi" :class="isDark
                            ? 'bi-sun'
                            : 'bi-moon'
                        " aria-hidden="true"></i>
                </button>

                <RouterLink :to="{ name: 'wishlist' }" class="icon-button" aria-label="Apri preferiti"
                    @click="closeMenu">
                    <i class="bi bi-heart" aria-hidden="true"></i>

                    <span v-if="wishlistTotalItems > 0" class="action-badge">
                        {{ wishlistTotalItems }}
                    </span>
                </RouterLink>

                <RouterLink :to="{ name: 'cart' }" class="icon-button" aria-label="Apri carrello" @click="closeMenu">
                    <i class="bi bi-cart3" aria-hidden="true"></i>

                    <span v-if="totalItems > 0" class="action-badge">
                        {{ totalItems }}
                    </span>
                </RouterLink>

                <button class="icon-button hamburger-button" type="button" aria-controls="main-navigation"
                    :aria-expanded="isMenuOpen" :aria-label="isMenuOpen
                            ? 'Chiudi menu'
                            : 'Apri menu'
                        " @click="toggleMenu">
                    <i class="bi" :class="isMenuOpen
                            ? 'bi-x-lg'
                            : 'bi-list'
                        " aria-hidden="true"></i>
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

    border-bottom: 1px solid var(--color-border);

    background-color: var(--color-overlay-light);
    box-shadow: var(--shadow-xs);

    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
}

/* ==========================
   NAVBAR
========================== */

.navbar {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    min-height: 4.5rem;
    gap: var(--space-xl);
}

/* ==========================
   LOGO
========================== */

.logo {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;

    color: var(--color-text);
    text-decoration: none;

    transition:
        color var(--transition-fast),
        transform var(--transition-fast);
}

.logo:hover {
    transform: translateY(-1px);
}

.logo:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 4px;

    border-radius: var(--radius-sm);
}

.logo-text {
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: -0.06em;
    line-height: 1;
}

.logo-accent {
    color: var(--color-primary);
}

/* ==========================
   NAVIGATION LINKS
========================== */

.nav-links {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: var(--space-lg);
    margin: 0;
    padding: 0;

    list-style: none;
}

.nav-links a {
    position: relative;

    display: block;

    padding-block: var(--space-sm);

    color: var(--color-text-muted);
    text-decoration: none;

    font-size: var(--font-size-sm);
    font-weight: 600;
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

    border-radius: var(--radius-full);

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
    font-weight: 800;
}

.nav-links a:hover::after,
.nav-links a.active::after {
    transform: scaleX(1);
}

.nav-links a:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 4px;

    border-radius: var(--radius-sm);
}

.categories-loading {
    color: var(--color-text-muted);

    font-size: var(--font-size-xs);
    white-space: nowrap;
}

/* ==========================
   HEADER ACTIONS
========================== */

.header-actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;

    gap: var(--space-xs);
}

.icon-button {
    position: relative;

    display: grid;
    place-items: center;

    width: 42px;
    height: 42px;
    padding: 0;

    border: 1px solid transparent;
    border-radius: var(--radius-full);

    background-color: transparent;
    color: var(--color-text);

    text-decoration: none;
    cursor: pointer;

    transition:
        color var(--transition-fast),
        border-color var(--transition-fast),
        background-color var(--transition-fast),
        transform var(--transition-fast);
}

.icon-button:hover {
    transform: translateY(-1px);

    border-color: var(--color-border);
    background-color: var(--color-primary-soft);
    color: var(--color-primary);
}

.icon-button:active {
    transform: translateY(0);
}

.icon-button:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;
}

.icon-button i {
    font-size: var(--font-size-lg);
    line-height: 1;
}

/* ==========================
   BADGE
========================== */

.action-badge {
    position: absolute;
    top: -2px;
    right: -2px;

    display: grid;
    place-items: center;

    min-width: 18px;
    height: 18px;
    padding-inline: var(--space-xs);

    border: 2px solid var(--color-surface);
    border-radius: var(--radius-full);

    background-color: var(--color-primary);
    color: var(--color-text-inverse);

    font-size: 0.65rem;
    font-weight: 800;
    line-height: 1;
}

/* ==========================
   HAMBURGER
========================== */

.hamburger-button {
    display: none;
}

/* ==========================
   TABLET AND MOBILE MENU
========================== */

@media (max-width: 1050px) {
    .navbar {
        min-height: 4rem;
    }

    .hamburger-button {
        display: grid;
    }

    .nav-links {
        position: absolute;
        top: calc(100% + 1px);
        right: 0;
        left: 0;

        display: none;
        flex-direction: column;
        align-items: stretch;

        max-height: calc(100vh - 4rem);
        gap: var(--space-xs);
        margin: 0;
        padding: var(--space-md);

        overflow-y: auto;

        border: 1px solid var(--color-border);
        border-top: 0;
        border-radius:
            0 0 var(--radius-lg) var(--radius-lg);

        background-color: var(--color-surface);
        box-shadow: var(--shadow-md);
    }

    .nav-links.open {
        display: flex;
    }

    .nav-links li {
        width: 100%;
    }

    .nav-links a {
        width: 100%;
        padding: 0.9rem var(--space-md);

        border-radius: var(--radius-md);
    }

    .nav-links a::after {
        display: none;
    }

    .nav-links a:hover,
    .nav-links a.active {
        background-color: var(--color-primary-soft);
        color: var(--color-primary);
    }

    .categories-loading {
        padding: 0.9rem var(--space-md);
    }
}

/* ==========================
   MOBILE
========================== */

@media (max-width: 480px) {
    .navbar {
        gap: var(--space-sm);
    }

    .logo-text {
        font-size: 1.65rem;
    }

    .header-actions {
        gap: 0;
    }

    .icon-button {
        width: 38px;
        height: 38px;
    }

    .icon-button i {
        font-size: var(--font-size-md);
    }

    .action-badge {
        min-width: 17px;
        height: 17px;

        font-size: 0.6rem;
    }

    .nav-links {
        right: calc(var(--container-padding) * -1);
        left: calc(var(--container-padding) * -1);

        border-right: 0;
        border-left: 0;
        border-radius: 0;
    }

    .nav-links a:hover,
    .nav-links a.active {
        background-color: var(--color-surface-secondary);
    }
}
</style>