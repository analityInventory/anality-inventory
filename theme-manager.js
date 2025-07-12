// theme-manager.js

// Esta función se ejecutará inmediatamente para evitar el "parpadeo" del tema.
(function() {
    const getTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }
        // Si no hay tema guardado, usa el del sistema operativo.
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const currentTheme = getTheme();
    applyTheme(currentTheme);
})();

// Las siguientes funciones estarán disponibles globalmente para ser llamadas desde otras páginas.
function setTheme(theme) {
    if (theme === 'system') {
        localStorage.removeItem('theme');
        // Vuelve a aplicar el tema basado en la preferencia del sistema
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        if (systemTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    } else {
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
}
