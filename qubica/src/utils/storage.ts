export function loadFromStorage<T>(
    key: string,
    fallbackValue: T
): T {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
        return fallbackValue;
    }

    try {
        return JSON.parse(storedValue) as T;
    } catch (error: unknown) {
        console.error(
            `Errore durante la lettura di "${key}" dal localStorage:`,
            error
        );

        return fallbackValue;
    }
}

export function saveToStorage<T>(
    key: string,
    value: T
): void {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    } catch (error: unknown) {
        console.error(
            `Errore durante il salvataggio di "${key}" nel localStorage:`,
            error
        );
    }
}

export function removeFromStorage(key: string): void {
    localStorage.removeItem(key);
}