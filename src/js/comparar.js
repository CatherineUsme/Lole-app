
const filterButtons = document.querySelectorAll(".filter-button");
const storeCards = document.querySelectorAll(".store-card");

const resultsCount = document.querySelector("#results-count");
const noResults = document.querySelector("#no-results");

let selectedCategory = "todas";

function filterStores() {
    let visibleStores = 0;

    storeCards.forEach(function(card) {
        const storeCategory = card.dataset.category;

        const matchesCategory =
            selectedCategory === "todas" ||
            storeCategory === selectedCategory;

        if (matchesCategory) {
            card.classList.remove("hidden");
            visibleStores++;
        } else {
            card.classList.add("hidden");
        }
    });

    resultsCount.textContent =
        visibleStores === 1
            ? "1 comercio encontrado"
            : visibleStores + " comercios encontrados";

    noResults.classList.toggle("hidden", visibleStores !== 0);
}

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        selectedCategory = button.dataset.filter;

        filterButtons.forEach(function(item) {
            item.classList.remove(
                "bg-lole-dorado",
                "text-lole-noche",
                "border-lole-dorado"
            );

            item.classList.add(
                "bg-transparent",
                "text-lole-blanco/80",
                "border-white/20"
            );

            item.setAttribute("aria-pressed", "false");
        });

        button.classList.remove(
            "bg-transparent",
            "text-lole-blanco/80",
            "border-white/20"
        );

        button.classList.add(
            "bg-lole-dorado",
            "text-lole-noche",
            "border-lole-dorado"
        );

        button.setAttribute("aria-pressed", "true");

        filterStores();
    });
});

filterStores();
