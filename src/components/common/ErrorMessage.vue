<script setup lang="ts">
defineProps<{
    message: string;
}>();

defineEmits<{
    retry: [];
}>();
</script>

<template>
    <div
        class="error-state"
        role="alert"
    >
        <i
            class="bi bi-exclamation-circle"
            aria-hidden="true"
        ></i>

        <p>{{ message }}</p>

        <button
            type="button"
            @click="$emit('retry')"
        >
            Try again
        </button>
    </div>
</template>

<style scoped>
.error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 300px;
    gap: 1rem;

    text-align: center;
}

.error-state i {
    color: var(--color-error);
    font-size: 2rem;
}

.error-state p {
    margin: 0;
    color: var(--color-error);
}

.retry-button {
    padding: 0.75rem 1.25rem;

    border-radius: var(--radius-md);

    color: #ffffff;
    background-color: var(--color-primary);

    font-weight: 600;
    cursor: pointer;

    transition: background-color var(--transition-fast);
}

.retry-button:hover {
    background-color: var(--color-primary-hover);
}
</style>