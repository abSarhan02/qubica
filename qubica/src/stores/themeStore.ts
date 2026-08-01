import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

import {
    loadFromStorage,
    saveToStorage
} from "../utils/storage";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "vitrina-theme";

function getInitialTheme(): Theme {
    const savedTheme = loadFromStorage<Theme | null>(
        THEME_STORAGE_KEY,
        null
    );

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    return prefersDark ? "dark" : "light";
}

export const useThemeStore = defineStore("theme", () => {
    const theme = ref<Theme>(getInitialTheme());

    const isDark = computed<boolean>(() => {
        return theme.value === "dark";
    });

    function applyTheme(): void {
        document.documentElement.dataset.theme = theme.value;
    }

    function toggleTheme(): void {
        theme.value = isDark.value ? "light" : "dark";
    }

    watch(
        theme,
        newTheme => {
            applyTheme();

            saveToStorage(
                THEME_STORAGE_KEY,
                newTheme
            );
        },
        {
            immediate: true
        }
    );

    return {
        theme,
        isDark,
        toggleTheme
    };
});