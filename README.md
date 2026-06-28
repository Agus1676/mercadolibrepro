# MercadoLibre Pro 🚀

Un clon de alta fidelidad y nivel profesional de la plataforma de e-commerce **Mercado Libre**, desarrollado con tecnologías modernas y optimizado para una experiencia de usuario fluida, interactiva y de alto impacto visual. El proyecto está listo para ser desplegado en Vercel con persistencia automática en `LocalStorage`.

---

## 🌟 Características Principales

El proyecto cuenta con múltiples integraciones interactivas premium diseñadas para impresionar en cualquier portafolio técnico:

### 1. 📊 Panel de Control del Vendedor (CRUD completo)
- **Métricas del Negocio**: Tarjetas visuales que muestran ventas totales, publicaciones activas y visitas.
- **Gráficos SVG Interactivos**: Un gráfico semanal de rendimiento de ventas con tooltips dinámicos al pasar el cursor.
- **Gestión del Catálogo**: Tabla administrativa para publicar nuevos artículos (con presets listos para testear), editar precios, stock o descripciones y eliminar publicaciones.

### 2. 🔄 Comparador de Productos Lado a Lado
- **Barra de Selección Flotante**: Al marcar el botón de comparación (`GitCompare`) en las tarjetas, se despliega un panel inferior de selección (máximo 3 productos).
- **Grilla de Comparación Técnica**: Compara precios, calificaciones, stock, reputación del vendedor y especificaciones técnicas extraídas de la descripción en una tabla comparativa.

### 3. 📸 Galería Multiángulos y Zoom Pro
- **Navegación por Miniaturas**: Carrusel de fotos secundarias para visualizar el producto desde distintos ángulos.
- **Magnificador de Zoom**: Lupa de zoom sincronizada con el ángulo seleccionado al pasar el cursor.
- **Visor Inmersivo**: Modal a pantalla completa tipo slideshow para navegar las fotos en alta resolución (cierre rápido con tecla `Escape`).

### 4. 📄 Generador de Facturas Imprimibles
- **Detalle de Compra Comercial**: Modal que genera una Factura de Compra (Tipo B) detallando CUIT, CAE de validación, IVA 21% y códigos de barra simulados.
- **Optimización de Impresión**: Configurado mediante CSS `@media print` para ocultar botones y barras del sitio al presionar "Imprimir", permitiendo exportar la factura en PDF de manera limpia y profesional.

### 5. 🎙️ Búsqueda por Voz Interactiva
- **Reconocimiento de Voz Nativo**: Botón de micrófono en el buscador que utiliza la API `webkitSpeechRecognition` del navegador.
- **Feedback de Audio**: Estado de grabación pulsante en rojo que autocompleta la barra y redirige a la búsqueda de forma inmediata.

### 6. 💖 Wishlist y Carrito Dinámico
- **Lista de Favoritos**: Botones de corazón flotantes en tarjetas y detalles que guardan ítems en tu sección `/favorites`.
- **Checkout con Tarjeta 3D**: Simulación de pago con una tarjeta de crédito 3D que gira automáticamente al ingresar el CVV, reconociendo marcas (Visa, Mastercard, Amex).
- **Seguimiento GPS SVG (Mercado Envíos)**: Un camión de envíos que avanza por una ruta SVG interactiva en tiempo real al acelerar el despacho.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 16 (App Router) + React 19.
- **Lenguaje**: TypeScript (Tipado estricto y seguro).
- **Estilos**: Tailwind CSS v4 (Estética minimalista y limpia al estilo Apple/Stripe).
- **Iconos**: Lucide React.
- **Animaciones**: CSS Keyframes de alta velocidad.
- **Persistencia**: LocalStorage fail-safe (funciona al instante en producción sin necesidad de configurar bases de datos).

---

## 💻 Comenzando (Desarrollo Local)

Para correr el proyecto en tu entorno local:

1. **Cloná el repositorio**:
   ```bash
   git clone https://github.com/Agus1676/mercadolibrepro.git
   cd mercadolibrepro
   ```

2. **Instalá las dependencias**:
   ```bash
   npm install
   ```

3. **Iniciá el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abrí [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

4. **Compilá para producción**:
   ```bash
   npm run build
   ```

---
Desarrollado con fines de portafolio por **Agustin Pollan**.
