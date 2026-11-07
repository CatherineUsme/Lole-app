const track = document.querySelector("#tiendas-track");
const prevButton = document.querySelector("#tiendas-prev");
const nextButton = document.querySelector("#tiendas-next");

// Comprobamos que existan los elementos en el HTML
if (track && prevButton && nextButton) {

    // Calculamos cuánto debe desplazarse el carrusel
    const getScrollAmount = () => {
        const card = track.querySelector("article");

        if (!card) return 0;

        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap) || 0;

        return card.offsetWidth + gap;
    };

    // Actualizamos el estado de las flechas
    const updateButtons = () => {
        prevButton.disabled = track.scrollLeft <= 0;

        nextButton.disabled =
            track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    };

    // Desplazamiento hacia la derecha
    nextButton.addEventListener("click", () => {
        track.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });
    });

    // Desplazamiento hacia la izquierda
    prevButton.addEventListener("click", () => {
        track.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth"
        });
    });

    // Actualizamos las flechas al desplazarnos o cambiar el tamaño
    track.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    // Estado inicial
    updateButtons();
}