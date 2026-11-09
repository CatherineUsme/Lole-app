// Seleccionar elementos del DOM
const themeButton = document.querySelector("#theme-toggle");
const html = document.documentElement;

// Recuperar el tema guardado
const savedTheme = localStorage.getItem("theme");

// Aplicar el tema guardado
if (savedTheme === "light") {
    html.classList.add("light-mode");
}

// Actualizar los atributos de accesibilidad
function updateThemeButton() {
    const isLightMode = html.classList.contains("light-mode");

    themeButton.setAttribute("aria-pressed", String(isLightMode));

    themeButton.setAttribute(
        "aria-label",
        isLightMode ? "Activar modo oscuro" : "Activar modo claro"
    );
}

// Configurar el botón
if (themeButton) {
    updateThemeButton();

    themeButton.addEventListener("click", () => {
        const isLightMode = html.classList.toggle("light-mode");

        // Guardar la preferencia
        localStorage.setItem("theme", isLightMode ? "light" : "dark");

        // Actualizar accesibilidad
        updateThemeButton();
    });
}