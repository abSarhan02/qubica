<script setup lang="ts">
defineProps<{
    message: string;
    visible: boolean;
}>();
</script>

<template>
    <Transition name="toast">
        <div
            v-if="visible"
            class="toast"
            role="status"
            aria-live="polite"
        >
            <i
                class="bi bi-check-circle-fill"
                aria-hidden="true"
            ></i>

            <span>{{ message }}</span>
        </div>
    </Transition>
</template>

<style scoped>
.toast {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 1000;

    display: flex;
    align-items: center;
    gap: 0.75rem;

    max-width: min(360px, calc(100% - 2rem));
    padding: 1rem 1.25rem;

    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    color: var(--color-text);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-md);

    font-weight: 600;
}

.toast i {
    color: #16a34a;
    font-size: 1.2rem;
}

.toast-enter-active,
.toast-leave-active {
    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

@media (max-width: 500px) {
    .toast {
        right: 1rem;
        bottom: 1rem;
        left: 1rem;

        max-width: none;
    }
}
</style>