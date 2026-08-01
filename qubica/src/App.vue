<script setup lang="ts">
import { onMounted, ref } from "vue";

import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";

import { productService } from "./services/productService";
import type { Category } from "./types/product";

const categories = ref<Category[]>([]);
const categoriesLoading = ref(false);

async function loadCategories(): Promise<void> {
    categoriesLoading.value = true;

    try {
        categories.value = await productService.getCategories();
    } catch (error) {
        console.error("Could not load categories:", error);
    } finally {
        categoriesLoading.value = false;
    }
}

onMounted(loadCategories);
</script>

<template>
    <div class="app">
        <AppHeader
            :categories="categories"
            :categories-loading="categoriesLoading"
        />

        <main class="main-content container">
            <RouterView />
        </main>

        <AppFooter />
    </div>
</template>

<style scoped>
.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1;
    padding-block: var(--space-xl);
}
</style>