import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem("vitrina-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: light)"
    ).matches;

    return prefersDark ? "dark" : "light";
}

export const useThemeStore = defineStore("theme", () => {
    const theme = ref<Theme>(getInitialTheme());

    const isDark = computed(() => {
        return theme.value === "dark";
    });

    function toggleTheme(): void {
        theme.value = isDark.value ? "light" : "dark";
    }

    watch(
        theme,
        () => {
            document.documentElement.dataset.theme = theme.value;

            localStorage.setItem(
                "vitrina-theme",
                theme.value
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