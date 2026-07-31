<script setup lang="ts">
import { onMounted, ref } from "vue";

import AppHeader from "./components/layout/AppHeader.vue";

import { productService } from "./services/productService";
import type { Category } from "./types/product";

const categories = ref<Category[]>([]);
const categoriesLoading = ref<boolean>(false);

async function loadCategories(): Promise<void> {
    categoriesLoading.value = true;

    try {
        categories.value = await productService.getCategories();
    } catch (error: unknown) {
        console.error(
            "Errore durante il caricamento delle categorie:",
            error
        );
    } finally {
        categoriesLoading.value = false;
    }
}

onMounted(() => {
    loadCategories();
});
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
    </div>
</template>

<style scoped>
.main-content {
    padding-block: 3rem;
}
</style>