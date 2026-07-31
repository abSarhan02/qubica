<script setup lang="ts">
import { ref } from "vue";

const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
];

const isMenuOpen = ref<boolean>(false);
const isDark = ref<boolean>(false);

function toggleMenu(): void {
    isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu(): void {
    isMenuOpen.value = false;
}

function toggleTheme(): void {
    isDark.value = !isDark.value;
}
</script>

<template>
    <header class="header">
        <nav class="navbar container">
            <RouterLink
                to="/"
                class="logo"
                @click="closeMenu"
            >
                <h1>
                    V<span>i</span>trina
                </h1>
            </RouterLink>

            <ul
                class="nav-links"
                :class="{ open: isMenuOpen }"
            >
                <li>
                    <RouterLink
                        to="/"
                        @click="closeMenu"
                    >
                        Home
                    </RouterLink>
                </li>

                <li
                    v-for="category in categories"
                    :key="category"
                >
                    <a
                        href="#"
                        @click="closeMenu"
                    >
                        {{ category }}
                    </a>
                </li>
            </ul>

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
                    ></i>
                </button>

                <button
                    class="icon-button cart-button"
                    type="button"
                    aria-label="Apri carrello"
                >
                    <i class="bi bi-cart3"></i>

                    <span class="cart-badge">
                        0
                    </span>
                </button>

                <button
                    class="icon-button hamburger-button"
                    type="button"
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
}

.logo {
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
    gap: 1.5rem;
}

.nav-links a {
    color: var(--color-text-muted);
    font-weight: 500;
    text-transform: capitalize;

    transition: color var(--transition-fast);
}

.nav-links a:hover,
.nav-links .router-link-exact-active {
    color: var(--color-primary);
}

.header-actions {
    display: flex;
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

    background-color: transparent;
    cursor: pointer;

    transition: background-color var(--transition-fast);
}

.icon-button:hover {
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

@media (max-width: 900px) {
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
        gap: 0;

        padding: 1rem;

        background-color: var(--color-surface);
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
        box-shadow: var(--shadow-sm);
    }

    .nav-links.open {
        display: flex;
    }

    .nav-links a {
        display: block;
        padding: 0.9rem 1rem;

        border-radius: var(--radius-md);
    }

    .nav-links a:hover {
        background-color: var(--color-background);
    }
}

@media (max-width: 480px) {
    .logo h1 {
        font-size: 1.6rem;
    }

    .icon-button {
        width: 38px;
        height: 38px;
    }
}
</style>