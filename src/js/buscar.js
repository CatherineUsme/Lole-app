// BLOQUE 1: DATOS DE COMERCIOS Y VARIABLES DE ESTADO
let comercios = [
    {
        id: 1,
        nombre: "Electro Junín",
        categoria: "Electrodomésticos",
        direccion: "Cra. 49 #52-30 · Junín",
        rating: 9.1,
        precio: "$$",
        tags: ["Garantía 1 año", "Domicilio"],
        verificado: true,
        coords: [6.2512, -75.5665] // Paseo Junín
    },
    {
        id: 2,
        nombre: "TecnoCentro Bolívar",
        categoria: "Tecnología",
        direccion: "Cl. 51 #50-40 · Parque Bolívar",
        rating: 9.0,
        precio: "$$",
        tags: ["Celulares", "Reparación"],
        verificado: true,
        coords: [6.2535, -75.5652] // Parque Bolívar
    },
    {
        id: 3,
        nombre: "Hogar & Más Carabobo",
        categoria: "Hogar",
        direccion: "Cra. 52 #50-12 · Carabobo",
        rating: 8.9,
        precio: "$",
        tags: ["Mejor precio", "Crédito"],
        verificado: true,
        coords: [6.2498, -75.5688] // Paseo Carabobo
    },
    {
        id: 4,
        nombre: "Pasos Firmes",
        categoria: "Calzado",
        direccion: "Cra. 51 #49-30 · Parque Berrío",
        rating: 8.9,
        precio: "$$",
        tags: ["Cuero", "Hecho a mano"],
        verificado: true,
        coords: [6.2504, -75.5676] // Parque Berrío
    },
    {
        id: 5,
        nombre: "Textiles El Hueco",
        categoria: "Ropa",
        direccion: "Cl. 46 #53-15 · El Hueco",
        rating: 8.7,
        precio: "$",
        tags: ["Mayoristas", "Moda"],
        verificado: false,
        coords: [6.2478, -75.5701] // Sector El Hueco
    },
    {
        id: 6,
        nombre: "Papelería La Playa",
        categoria: "Papelería",
        direccion: "Av. La Playa #47-20 · La Playa",
        rating: 8.8,
        precio: "$",
        tags: ["Útiles", "Arte"],
        verificado: true,
        coords: [6.2518, -75.5632] // Av. La Playa
    },
    {
        id: 7,
        nombre: "Joyería Oro Antioqueño",
        categoria: "Joyería",
        direccion: "Cra. 49 #50-22 · Junín",
        rating: 9.3,
        precio: "$$$",
        tags: ["Oro 18k", "Certificado"],
        verificado: true,
        coords: [6.2508, -75.5660]
    },
    {
        id: 8,
        nombre: "ElectroHogar San Juan",
        categoria: "Electrodomésticos",
        direccion: "Cl. 44 #51-10 · San Juan",
        rating: 8.6,
        precio: "$$",
        tags: ["Neveras", "Lavadoras"],
        verificado: true,
        coords: [6.2465, -75.5680] // Av. San Juan
    }
];

// Variables de estado (guardan lo que el usuario está haciendo en el momento)
let categoriaSeleccionada = "Todas";
let terminoBusqueda = "";
let comercioActivoId = 1;

// Variables globales para controlar el mapa desde cualquier función, luego se llenaran
let mapa = null;
let capaMarcadores = null;
let capaMapaBase = null;



// BLOQUE 2: ENCENDER Y CONFIGURAR EL MAPA
function obtenerUrlCapaMapa() {
    // Usamos el servidor oficial de Esri (ArcGIS Online)
    return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";
}

function inicializarMapa() {
    const contenedorMapa = document.getElementById("mapa-medellin");
    if (!contenedorMapa) return; // Si no existe el div en esta página, detenemos la función

    // 1. Crear el mapa centrado en el Centro de Medellín
    mapa = L.map("mapa-medellin", { zoomControl: false }).setView([6.2505, -75.5668], 16);

    // 2. Ubicar botones de zoom (+ / -) en la esquina inferior derecha
    L.control.zoom({ position: "bottomright" }).addTo(mapa);

    // 3. Cargar el diseño de calles (oscuro o claro según el tema)
    capaMapaBase = L.tileLayer(obtenerUrlCapaMapa(), {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: "abcd",
        maxZoom: 19
    }).addTo(mapa);

    // 4. Crear la capa vacía donde pondremos los pines numerados
    capaMarcadores = L.layerGroup().addTo(mapa);

    // 5. Escuchar el botón de cambio de tema para actualizar también el color del mapa
    const btnTema = document.getElementById("theme-toggle");
    if (btnTema) {
        btnTema.addEventListener("click", () => {
            // Esperamos 50ms a que theme.js cambie la clase en el <html>
            setTimeout(() => {
                capaMapaBase.setUrl(obtenerUrlCapaMapa());
            }, 50);
        });
    }
}


// BLOQUE 3: RENDERIZAR TARJETAS Y MARCADORES SINCRONIZADOS


function renderizarVista() {
    const listaEl = document.getElementById("lista-comercios");
    const contadorEl = document.getElementById("contador-comercios");
    if (!listaEl || !contadorEl) return;

    // 1. Filtrar comercios por categoría y texto buscado
    const resultados = comercios
        .filter(tienda => {
            const pasaCategoria = categoriaSeleccionada === "Todas" || tienda.categoria === categoriaSeleccionada;
            
            const texto = terminoBusqueda.toLowerCase();
            const pasaTexto =
                tienda.nombre.toLowerCase().includes(texto) ||
                tienda.direccion.toLowerCase().includes(texto) ||
                tienda.tags.some(tag => tag.toLowerCase().includes(texto));

            return pasaCategoria && pasaTexto;
        })
        // Ordenar de mayor a menor puntuación (precio-calidad)
        .sort((a, b) => b.rating - a.rating);

    // 2. Actualizar el contador numérico
    contadorEl.textContent = resultados.length;

    // 3. Limpiar tarjetas y pines anteriores antes de volver a dibujar
    listaEl.innerHTML = "";
    capaMarcadores.clearLayers();

    // Si no hay coincidencias, mostramos un mensaje amigable
    if (resultados.length === 0) {
        listaEl.innerHTML = `
            <div class="bg-lole-profundo border border-white/10 rounded-2xl p-8 text-center text-lole-gris">
                No encontramos comercios que coincidan con tu búsqueda.
            </div>`;
        return;
    }

    // Si el comercio que estaba seleccionado desapareció al filtrar, seleccionamos el primero de la nueva lista
    if (!resultados.some(t => t.id === comercioActivoId)) {
        comercioActivoId = resultados[0].id;
    }

    // 4. Tamaño del pin sincronizado con nuestro CSS Mobile First
    const esMovil = window.innerWidth < 768;
    const tamanoPin = esMovil ? 42 : 34;
    const centroPin = tamanoPin / 2;

    // 5. Dibujar cada tarjeta y su pin en el mapa
    resultados.forEach((tienda, index) => {
        const numeroVisual = index + 1; // Numeración 1, 2, 3... según el orden filtrado
        const esActivo = tienda.id === comercioActivoId;

        // --- A) CREAR LA TARJETA HTML ---
        const tarjeta = document.createElement("article");
        tarjeta.className = `bg-lole-profundo border rounded-2xl p-4 flex items-start justify-between gap-4 cursor-pointer transition-all ${
            esActivo
                ? "border-lole-dorado shadow-lg shadow-lole-dorado/10"
                : "border-white/15 hover:border-lole-champagne/60"
        }`;

        tarjeta.innerHTML = `
            <div class="flex items-start gap-3.5">
                <!-- Círculo numerado -->
                <span class="flex items-center justify-center w-11 h-11 rounded-full font-bold shrink-0 transition-colors ${
                    esActivo
                        ? "bg-lole-champagne text-lole-noche"
                        : "border border-lole-champagne/50 text-lole-champagne"
                }">
                    ${numeroVisual}
                </span>

                <!-- Datos del local -->
                <div>
                    <div class="flex items-center gap-1.5">
                        <h3 class="font-body font-bold text-base text-lole-blanco">${tienda.nombre}</h3>
                        ${tienda.verificado ? `
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-4 text-lole-champagne shrink-0" title="Comercio verificado">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>` : ""}
                    </div>

                    <p class="text-xs text-lole-gris mt-1">${tienda.direccion}</p>

                    <!-- Etiquetas (precio y características) -->
                    <div class="flex flex-wrap gap-1.5 mt-3">
                        <span class="rounded-full bg-lole-noche/70 border border-white/10 px-2.5 py-0.5 text-xs text-lole-blanco/90">
                            ${tienda.precio}
                        </span>
                        ${tienda.tags.map(tag => `
                            <span class="rounded-full bg-lole-noche/70 border border-white/10 px-2.5 py-0.5 text-xs text-lole-blanco/90">
                                ${tag}
                            </span>
                        `).join("")}
                    </div>
                </div>
            </div>

            <!-- Insignia de calificación -->
            <span class="flex items-center gap-1 bg-lole-champagne/10 text-lole-dorado rounded-full px-3 py-1 text-xs font-bold shrink-0">
                ★ ${tienda.rating.toFixed(1)}
            </span>
        `;

        // Evento: Al hacer clic en la tarjeta, volamos hacia ese punto en el mapa
        tarjeta.addEventListener("click", () => {
            comercioActivoId = tienda.id;
            mapa.flyTo(tienda.coords, 17, { duration: 0.7 });
            renderizarVista();
        });

        listaEl.appendChild(tarjeta);

        // --- B) CREAR EL PIN NUMERADO EN EL MAPA ---
        const iconoPersonalizado = L.divIcon({
            className: "", // Quitamos el cuadrado blanco por defecto de Leaflet
            html: `<div class="lole-pin ${esActivo ? "seleccionado" : ""}">${numeroVisual}</div>`,
            iconSize: [tamanoPin, tamanoPin],
            iconAnchor: [centroPin, centroPin]
        });

        const marcador = L.marker(tienda.coords, { icon: iconoPersonalizado })
            .bindPopup(`
                <div class="font-body p-1">
                    <p class="font-bold text-sm text-lole-dorado">${tienda.nombre}</p>
                    <p class="text-xs text-lole-gris mt-0.5">${tienda.direccion}</p>
                    <p class="text-xs mt-1 text-lole-champagne font-semibold">★ ${tienda.rating.toFixed(1)} · ${tienda.categoria}</p>
                </div>
            `);

        // Evento: Al tocar o hacer clic en el pin del mapa, resaltamos su tarjeta
        marcador.on("click", () => {
            comercioActivoId = tienda.id;
            renderizarVista();
        });

        capaMarcadores.addLayer(marcador);
    });
}


// BLOQUE 4: CONEXIÓN A API EXTERNA (OPENSTREETMAP) Y ARRANQUE DE EVENTOS


async function cargarComerciosRealesOSM() {
    // Cuadrante geográfico del Centro de Medellín (Sur, Oeste, Norte, Este)
    const bbox = "6.2450,-75.5720,6.2555,-75.5610";

    // Consulta en lenguaje Overpass QL pidiendo tiendas dentro de ese cuadrante
    const query = `
        [out:json][timeout:10];
        node["shop"~"electronics|clothes|shoes|furniture|stationery|jewelry"](${bbox});
        out body 15;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    // Traductor: convierte las categorías en inglés de OSM a las categorías de Lole-app
    const mapaCategorias = {
        electronics: "Tecnología",
        clothes: "Ropa",
        shoes: "Calzado",
        furniture: "Hogar",
        stationery: "Papelería",
        jewelry: "Joyería"
    };

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) return; // Si el servidor responde con error (ej. 429 o 500), salimos sin romper nada

        const data = await respuesta.json();

        // Transformamos los datos de la API al formato de objetos de Lole-app
        const tiendasDesdeAPI = data.elements
            .filter(elemento => elemento.tags && elemento.tags.name) // Solo tiendas que tengan nombre registrado
            .map((elemento, idx) => ({
                id: 100 + idx, // IDs desde 100 para no chocar con nuestros IDs locales (1-8)
                nombre: elemento.tags.name,
                categoria: mapaCategorias[elemento.tags.shop] || "Hogar",
                direccion: elemento.tags["addr:street"]
                    ? `${elemento.tags["addr:street"]} · Centro`
                    : "Centro de Medellín",
                rating: +(8.2 + (idx % 10) * 0.1).toFixed(1),
                precio: "$$",
                tags: ["Mapa en vivo", mapaCategorias[elemento.tags.shop] || "Comercio"],
                verificado: true,
                coords: [elemento.lat, elemento.lon]
            }));

        // Si la API trajo comercios válidos, los unimos a nuestra lista y redibujamos
        if (tiendasDesdeAPI.length > 0) {
            comercios = [...comercios, ...tiendasDesdeAPI];
            renderizarVista();
        }
    } catch (error) {
        // Si no hay internet o falla la API, seguimos trabajando con los datos locales sin mostrar errores al usuario
        console.warn("No se pudo conectar con Overpass API, usando datos locales:", error);
    }
}


// PUNTO DE ENTRADA (CUANDO EL HTML TERMINA DE CARGAR)


document.addEventListener("DOMContentLoaded", () => {
    // 1. Encendemos el mapa y pintamos los datos iniciales al instante
    inicializarMapa();
    renderizarVista();

    // 2. Consultamos la API en segundo plano para enriquecer el mapa con locales reales
    cargarComerciosRealesOSM();

    // 3. Configurar los clics en los botones de categoría
    const botonesCategoria = document.querySelectorAll(".categoria-pill");
    botonesCategoria.forEach(boton => {
        boton.addEventListener("click", () => {
            // Quitamos la clase 'activa' de todos los botones
            botonesCategoria.forEach(b => b.classList.remove("activa"));
            // Se la ponemos solo al botón que recibió el clic
            boton.classList.add("activa");

            // Actualizamos el estado y volvemos a dibujar tarjetas y mapa
            categoriaSeleccionada = boton.dataset.categoria;
            renderizarVista();
        });
    });

    // 4. Configurar la barra de búsqueda (en tiempo real y al enviar)
    const formBusqueda = document.getElementById("form-busqueda");
    const inputBusqueda = document.getElementById("input-busqueda");

    if (inputBusqueda) {
        inputBusqueda.addEventListener("input", (evento) => {
            terminoBusqueda = evento.target.value;
            renderizarVista();
        });
    }

    if (formBusqueda) {
        formBusqueda.addEventListener("submit", (evento) => {
            evento.preventDefault(); // Evita que la página se recargue al enviar el formulario
            terminoBusqueda = inputBusqueda.value;
            renderizarVista();
        });
    }
});