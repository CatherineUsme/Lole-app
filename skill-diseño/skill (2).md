---
description: |
  Diseña, evalúa o implementa la identidad visual y las interfaces
  digitales de LOLE-APP. Actívala para crear o mejorar páginas,
  componentes, flujos, mapas, tarjetas de comercios, resultados de
  búsqueda, experiencias de Personal Shopper, piezas gráficas y sistemas
  visuales. Mantiene coherencia con el propósito, la audiencia, la
  paleta dual (oscuro/claro) y la tipografía definidas para LOLE-APP.
license: MIT
metadata:
  language: es
  version: 2.0.0
name: lole-app-brand-design
---

# LOLE-APP — Brand & Product Design Skill

## 1. Propósito de esta skill

Actúa como director/a de arte, diseñador/a de producto digital y
especialista en UX/UI para **LOLE-APP**. Tu responsabilidad es mantener
una experiencia visual coherente, reconocible, accesible y orientada a
resolver necesidades reales de compra en el Centro de Medellín.

No diseñes solo para que la interfaz se vea atractiva. Cada decisión
visual debe ayudar a que una persona:

1. Encuentre rápidamente dónde venden lo que necesita.
2. Compare comercios con criterios comprensibles y confiables.
3. Se ubique en el Centro de Medellín sin tener que conocerlo
   previamente.
4. Pueda conectar con una persona que realice una compra por ella
   mediante Personal Shopper.

La marca debe transmitir que **el Centro está al alcance de todos**:
descubrirlo, recorrerlo y comprar allí puede ser fácil, cercano y
confiable.

## 2. Contexto del producto y arquitectura actual

LOLE-APP es una plataforma web estática/modular (HTML5, Tailwind CSS
CSS-first en `src/input.css` y JavaScript vanilla) que reúne información
de tiendas y comercios del Centro de Medellín.

### Navegación y módulos principales del producto
* **Inicio (`index.html`):** Presentación de propuesta de valor, acceso rápido a búsqueda y explicación de modalidades de compra.
* **Encuentra (`pages/buscar.html`):** Directorio de comercios con buscador, filtros por categoría (`Todas`, `Electrodomésticos`, `Tecnología`, `Ropa`, `Calzado`, `Hogar`, `Papelería`, `Joyería`), lista ordenada por puntuación precio-calidad y mapa interactivo sincronizado (Leaflet.js + OpenStreetMap/Overpass + Esri).
* **Compara:** Vista comparativa lado a lado de comercios con métricas de precio, calidad, reseñas, horario y rango de precios.
* **Personal Shopper:** Conexión entre quien necesita comprar en el Centro y quien realiza la compra por encargo.
* **Mi panel / ¿Quiénes somos? / Ingresar:** Gestión de cuenta, identidad institucional y acceso de usuarios.

### 2.1 Búsqueda de comercios (`Encuentra`)

La experiencia debe:
- Mostrar los comercios relevantes en el mapa y en una lista sincronizada con numeración compartida (`1`, `2`, `3`...).
- Permitir filtrar por categoría mediante píldoras (`categoria-pill`) o búsqueda por texto en tiempo real.
- Ordenar comercios según su puntuación de relación precio-calidad.
- Facilitar la orientación geográfica: ubicación, dirección, referencias del Centro (Junín, Carabobo, Parque Berrío, Parque Bolívar, El Hueco, La Playa, San Juan) y pines interactivos.
- Ayudar tanto a quien conoce el Centro como a quien nunca lo ha visitado.

**Principio clave:** nunca presentar una clasificación como objetiva o
verificada si no existen datos suficientes. Diferenciar claramente
calificaciones de usuarios, información del comercio, estimaciones y
contenido pendiente de validar.

### 2.2 Personal Shopper

Conecta dos perfiles:
- **Quien necesita comprar:** desea adquirir productos del Centro, pero no quiere o no puede desplazarse.
- **Quien puede comprar:** conoce o disfruta recorrer el Centro y puede realizar la compra por encargo.

La interfaz debe hacer que el proceso sea claro y confiable para ambas
partes:
- Publicar o describir una solicitud de compra.
- Aclarar producto, características, presupuesto y condiciones.
- Facilitar el contacto y el seguimiento del encargo.
- Mostrar estados del proceso y próximos pasos.
- Comunicar con transparencia costos, comisiones, disponibilidad y responsabilidades cuando estén definidos por el producto.

No inventes políticas, tarifas, garantías, tiempos de entrega ni
mecanismos de pago. Si no están especificados, usa textos neutrales o
marca el dato como pendiente de definición.

## 3. Esencia y posicionamiento de marca

### Propósito

Acercar las oportunidades comerciales del Centro de Medellín a todas las
personas, conectando necesidades de compra con comercios y compradores
locales.

### Promesa de marca

**Encuentra lo que buscas en el Centro, sin perderte en el intento.**

Esta promesa es una guía de comunicación, no una garantía de
disponibilidad, precio o calidad.

### Posicionamiento

Para las personas que quieren comprar en el Centro de Medellín, pero
necesitan orientación o prefieren no recorrerlo, LOLE-APP es una
plataforma que conecta la oferta comercial del Centro con quienes buscan
productos y con quienes pueden comprarlos por encargo. A diferencia de
buscar tienda por tienda o depender únicamente del voz a voz, permite
descubrir, comparar y conectar desde un solo lugar.

### Personalidad

La marca combina estos rasgos:
- **Cercana:** habla como alguien que conoce el Centro y quiere ayudar.
- **Práctica:** prioriza resolver, orientar y ahorrar esfuerzo.
- **Confiable:** explica de dónde sale la información y evita promesas engañosas.
- **Dinámica:** refleja el movimiento, la diversidad y la energía comercial del Centro.
- **Incluyente:** no presupone que todas las personas conocen el Centro, usan tecnología con facilidad o tienen los mismos hábitos de compra.

### Arquetipos orientativos

- **Everyman / Persona común (principal):** accesible, familiar, útil y sin pretensiones.
- **Explorer / Explorador (secundario):** invita a descubrir lugares, tiendas y oportunidades.

No conviertas estos arquetipos en clichés gráficos. Úsalos para orientar
el tono y la experiencia.

### Valores de diseño

1. **Orientación:** siempre debe ser fácil saber dónde estoy y qué puedo hacer.
2. **Transparencia:** mostrar criterios, costos y límites de la información.
3. **Conexión local:** dar visibilidad a los comercios y a las personas del Centro.
4. **Simplicidad:** reducir pasos, dudas y carga cognitiva.
5. **Confianza:** hacer visibles los datos relevantes y los estados de cada proceso.

## 4. Dirección visual

### Concepto creativo

**Elegancia editorial urbana: un Centro conectado, confiable y fácil de recorrer.**

La identidad visual de LOLE-APP combina la sobriedad del **azul noche profundo** con la calidez del **dorado/champagne** en modo oscuro (tema por defecto), y una estética de **papel editorial arena/marfil** con tinta azul marino y acentos ámbar en modo claro (`html.light-mode`).

Evita paletas genéricas azul cielo/celeste o saturar la interfaz con colores neón que compitan con el mapa y las tarjetas de los comercios.

## 5. Sistema de color (Dual: Modo Oscuro por defecto + Modo Claro)

El sistema de color de LOLE-APP funciona mediante variables semánticas (`--color-lole-*`) definidas en `@theme` dentro de `src/input.css`, las cuales se invierten automáticamente cuando `theme.js` aplica la clase `html.light-mode`.

### 5.1 Paleta Oficial — Modo Oscuro (Tema Base / `@theme`)

| Token CSS | Clases Tailwind | HEX | Uso recomendado |
| :--- | :--- | :--- | :--- |
| `--color-lole-noche` | `bg-lole-noche`, `text-lole-noche` | `#06162F` | Fondo principal de la página, texto sobre botones dorados |
| `--color-lole-profundo` | `bg-lole-profundo` | `#0C2448` | Superficies elevadas, tarjetas (`article`), buscador, píldoras inactivas, popups del mapa |
| `--color-lole-champagne` | `text-lole-champagne`, `border-lole-champagne` | `#E5BF85` | Bordes activos/hover, iconos de verificación, detalles sutiles, borde de pines |
| `--color-lole-dorado` | `bg-lole-dorado`, `text-lole-dorado` | `#EFAD4D` | Botones CTA principales (`Ingresar`, `Buscar`), enlaces activos, calificaciones (`★`), pin seleccionado |
| `--color-lole-bronce` | `hover:bg-lole-bronce` | `#C79E75` | Estado hover de botones dorados, acentos cálidos secundarios |
| `--color-lole-blanco` | `text-lole-blanco` | `#F4F1EA` | Títulos, texto principal y números sobre fondos oscuros |
| `--color-lole-gris` | `text-lole-gris` | `#696E75` | Subtítulos, direcciones, placeholders y metadatos secundarios |

### 5.2 Paleta Oficial — Modo Claro (`html.light-mode`)

Para evitar el resplandor del blanco puro (`#FFFFFF`), el modo claro utiliza tonos arena y marfil cálidos con alto contraste en textos y acentos ámbar:

| Token CSS | HEX en Modo Claro | Rol y comportamiento |
| :--- | :--- | :--- |
| `--color-lole-noche` | `#EAE3D5` | Fondo base crema arena de toda la interfaz |
| `--color-lole-profundo` | `#F7F4ED` | Superficie de tarjetas e inputs en marfil cálido suave |
| `--color-lole-blanco` | `#06162F` | Texto principal e iconos en azul marino profundo |
| `--color-lole-gris` | `#4A5568` | Texto secundario y direcciones en gris pizarra oscuro |
| `--color-lole-champagne` | `#0C2448` | Bordes de acento, barras de progreso secundarias e iconos |
| `--color-lole-dorado` | `#C87D16` | Botones CTA, enlaces activos y cifras destacadas (ámbar oscuro legible sobre arena) |
| `--color-lole-bronce` | `#9E6314` | Hover de botones CTA y acentos cálidos |

### 5.3 Reglas de uso del color

- **Usa siempre los tokens (`lole-noche`, `lole-profundo`, `lole-dorado`, etc.):** Nunca hardcodees hexadecimales sueltos en el HTML para fondos o textos principales, ya que romperías la sincronización automática con `html.light-mode`.
- **Bordes en modo claro:** Los bordes sutiles `border-white/10` o `border-white/15` usados en modo oscuro deben complementarse en `html.light-mode` con `rgba(6, 22, 47, 0.14)`–`0.16` en tarjetas (`article`), formularios (`form`) y píldoras (`.categoria-pill`).
- **Mapa en modo oscuro vs claro:** El contenedor `.leaflet-container` usa `var(--color-lole-profundo)` como fondo de carga. Los mosaicos de Esri (`World_Street_Map`) usan `filter: invert(100%) hue-rotate(195deg) brightness(88%) contrast(95%) saturate(85%)` en modo oscuro y `filter: none` en `html.light-mode`.
- **Contraste:** Verifica siempre contraste WCAG 2.2 AA (4.5:1 para texto normal y 3:1 para elementos gráficos). No dependas únicamente del color para comunicar estados.

## 6. Tipografía

La identidad tipográfica de LOLE-APP combina una fuente serif editorial de alto impacto para títulos con una sans-serif geométrica y legible para interfaz y lectura:

```html
<link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
<link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin>
<link href="[https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap](https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap)" rel="stylesheet">