<script setup lang="ts">
withDefaults(
    defineProps<{
        message?: string
    }>(),
    {
        message: 'Caricamento...'
    }
)
</script>

<template>
    <div class="loading-state" role="status" aria-live="polite">
        <div class="bowling-loader">
            <div class="ball">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div class="pins">
                <div class="pin"></div>
                <div class="pin"></div>
                <div class="pin"></div>
            </div>
        </div>

        <p>{{ message }}</p>
    </div>
</template>

<style scoped>
.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 300px;
    gap: 1rem;

    color: var(--color-text-muted);
    text-align: center;
}

.bowling-loader {
    position: relative;
    width: 120px;
    height: 80px;
}

/* Palla */
.ball {
    position: absolute;
    left: 10px;
    bottom: 10px;

    width: 45px;
    height: 45px;

    background: #222;
    border-radius: 50%;

    animation: roll 1.8s infinite ease-in-out;
}

.ball span {
    position: absolute;

    width: 8px;
    height: 8px;

    background: white;
    border-radius: 50%;
}

.ball span:nth-child(1) {
    top: 10px;
    left: 12px;
}

.ball span:nth-child(2) {
    top: 20px;
    left: 25px;
}

.ball span:nth-child(3) {
    top: 30px;
    left: 12px;
}

/* Birilli */
.pins {
    position: absolute;
    right: 5px;
    bottom: 10px;

    display: flex;
    gap: 4px;

    animation: fall 1.8s infinite ease-in-out;
}

.pin {
    width: 12px;
    height: 35px;

    background: white;
    border-radius: 8px 8px 4px 4px;

    border: 2px solid #ddd;
}

@keyframes roll {
    0% {
        transform: translateX(0) rotate(0deg);
    }

    50% {
        transform: translateX(55px) rotate(360deg);
    }

    100% {
        transform: translateX(0) rotate(720deg);
    }
}

@keyframes fall {

    0%,
    45% {
        transform: rotate(0);
    }

    60%,
    100% {
        transform: rotate(60deg);
    }
}
</style>