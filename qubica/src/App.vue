<script setup lang="ts">
import AppHeader from "./components/layout/AppHeader.vue";
</script>

<template>
    <div class="app">
        <AppHeader />

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