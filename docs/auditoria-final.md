# Auditoría final de accesibilidad y cambios

Fecha: 31 de octubre de 2026

## Comprobaciones realizadas

- `node --check script.js`: correcto, sin errores de sintaxis.
- `git diff --check`: correcto, sin errores de espacios o marcadores de conflicto.
- El bloque JSON-LD se pudo analizar como JSON con PowerShell.
- Revisión manual del HTML, CSS y JavaScript; el navegador integrado y la conexión a `https://www.funcasor.org` no estuvieron disponibles.
- No se instaló Lighthouse ni axe-core. No hay puntuación Lighthouse ni resultado automatizado de axe para declarar.

## Mejoras aplicadas

- Se añadió enlace para saltar al contenido, foco visible general y objetivos de al menos 44 px para enlaces y controles principales.
- Los botones del mapa siguen siendo botones reales. El contenedor ya no se anuncia como una imagen, el cambio de isla se comunica con `aria-live` y se ofrece una descripción textual.
- Los ejercicios incluyen estado visual de reproducción, control de volumen, repetición mediante el botón de reproducción y feedback escrito. Detección muestra «Hay sonido» o «No hay sonido» con texto e icono.
- Los apoyos escritos se pueden mostrar u ocultar en Pares mínimos, Identificación, Memoria auditiva y Comprensión. No hay reproducción automática.
- Los formularios muestran errores junto a los campos, conservan etiquetas visibles y se pueden completar con teclado.
- Se oscureció el color rosa de algunos fondos con texto blanco y se oscurecieron dos colores de texto del gráfico. La paleta de marca se conserva. Falta medir contrastes con herramienta.
- Se simplificaron textos y se añadió explicación de «fonema» e «implante coclear».
- Se añadió contacto, formulario Netlify con honeypot, metadatos sociales, favicon, sitemap, robots y datos estructurados.
- Se añadieron dimensiones a imágenes usadas y carga diferida a los recursos no principales.

## Pruebas pendientes

- Medir contraste de todos los estados y componentes con una herramienta WCAG.
- Ejecutar axe-core y Lighthouse Accesibilidad en el sitio publicado.
- Probar navegación solo con teclado, ampliación al 200 %, modo de alto contraste y lector de pantalla.
- Enviar un formulario de prueba en Netlify y confirmar la recepción. En local no se puede verificar el procesamiento de formularios del proveedor.
- Validar los datos de contacto y legales con Funcasor. Los marcadores visibles deben sustituirse antes de publicar.
- Generar imágenes WebP/AVIF y variantes responsive cuando haya herramienta disponible y se confirme la imagen del mapa que debe conservarse.

## Límites del resultado

Esta revisión estática no acredita conformidad WCAG 2.2 AA ni una puntuación Lighthouse. Los textos legales no se publican hasta completar la revisión y confirmar los datos pendientes. La carga de iconos Font Awesome existente continúa usando su CDN; debe valorarse una copia local en una mejora posterior.
