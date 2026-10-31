# Auditoría inicial de accesibilidad y estado

Fecha: 31 de octubre de 2026

## Alcance

Sitio estático en `index.html`, `styles.css` y `script.js`. Usa imágenes y sonidos locales. No hay framework, gestor de paquetes, configuración de compilación ni configuración explícita de Netlify; el despliegue puede publicar directamente el directorio raíz.

No se encontró una instalación de Lighthouse o axe-core. No se instalaron paquetes ni se ejecutó una auditoría de navegador automatizada: el navegador integrado y la conexión a `https://www.funcasor.org` no respondieron, y el proyecto no tiene un entorno de ejecución configurado. Por tanto, este documento recoge una revisión estática inicial; no representa una puntuación de Lighthouse ni un informe de axe.

## Hallazgos iniciales

- El documento ya declara `lang="es"`, tiene un solo `<h1>` y usa `header`, `nav`, `main` y `footer`.
- Falta un enlace para saltar al contenido. El CTA principal del menú dice «Contactar», pero el pie no contiene datos ni un formulario de contacto.
- El logo del encabezado usa una foto con nombre opaco y `alt` vacío. El logo principal tiene texto alternativo.
- El mapa contiene botones reales, pero su contenedor tiene `role="img"`, lo que puede ocultar sus controles a tecnologías de apoyo. La descripción no resume la alternativa textual ni los servicios por isla.
- La portada habla de una «propuesta digital» y muestra «5 fases»; el recorrido incluye siete pasos. El diagrama de portada tampoco incluye Pares mínimos ni Memoria auditiva.
- Hay información de contacto por isla en el JavaScript, pero no es visible en una sección de contacto común y no se ha podido verificar en la web oficial.
- Las demostraciones usan controles de teclado y feedback `aria-live`. Pares mínimos, memoria auditiva e instrucciones tienen apoyos de texto; detección, discriminación y reconocimiento requieren una revisión más profunda de equivalencia visual, repetición, volumen y transcripciones.
- Hay estilos de foco en varios controles y una regla `prefers-reduced-motion`. No se ha medido contraste, tamaño táctil ni comportamiento con zoom/alto contraste.
- Se carga Font Awesome desde un CDN externo. No hay páginas legales, datos estructurados, sitemap, robots ni metadatos sociales identificados.
- Los textos incluyen párrafos extensos, en especial Apoyo educativo, y tecnicismos sin explicación inmediata.

## Pruebas pendientes de entorno visual

Lighthouse Accesibilidad, axe-core, navegación completa solo con teclado, zoom al 200 %, modo de alto contraste y lector de pantalla. Deben registrarse resultados reales tras ejecutar el sitio en un navegador con esas herramientas.
