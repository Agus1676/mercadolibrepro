import { Product } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Apple iPhone 15 Pro Max 256 GB - Titanio Natural',
    price: 1850000,
    originalPrice: 2100000,
    discount: 11,
    description: `DISEÑADO EN TITANIO: El iPhone 15 Pro Max tiene un diseño robusto y ligero de titanio de calidad aeroespacial con una parte posterior de vidrio mate texturizado. También cuenta con un frente de Ceramic Shield que es más fuerte que cualquier vidrio de smartphone.

PANTALLA SUPER RETINA XDR: La pantalla de 6.7 pulgadas con ProMotion aumenta la frecuencia de actualización hasta 120 Hz cuando necesitas el máximo rendimiento gráfico.

CHIP A17 PRO: Un chip revolucionario con GPU de 6 núcleos que redefine el rendimiento gráfico en celulares.

ESPECIFICACIONES TÉCNICAS:
- Capacidad: 256 GB
- Memoria RAM: 8 GB
- Cámara principal: 48 MP con teleobjetivo de 5x
- Batería: Hasta 29 horas de reproducción de video
- Conectividad: USB-C (compatible con USB 3)
- Sistema Operativo: iOS 17

CONTENIDO DE LA CAJA:
- iPhone 15 Pro Max con iOS 17
- Cable de carga USB-C (1 m)
- Documentación oficial`,
    category: 'Celulares',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 1420,
    stock: 14,
    freeShipping: true,
    isFull: true,
    sellerName: 'Apple Official Store',
    sellerRating: 'green',
    questions: [
      {
        id: 'q-1-1',
        user: 'Agus_P',
        text: '¿Viene en caja sellada con garantía oficial de Apple?',
        answer: '¡Hola! Sí, todos nuestros productos son nuevos, 100% originales, sellados de fábrica y cuentan con garantía oficial de Apple de 1 año. Hacemos envíos inmediatos por Full.',
        date: '2026-06-25T14:30:00Z'
      },
      {
        id: 'q-1-2',
        user: 'Lucas_Dev',
        text: '¿Tiene eSIM o bandeja para SIM física?',
        answer: '¡Hola! Este modelo corresponde a la versión global que cuenta tanto con bandeja para Nano-SIM física como soporte para eSIM. Cualquier otra consulta, estamos a disposición.',
        date: '2026-06-25T16:15:00Z'
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'Apple MacBook Pro 16 pulgadas M3 Max 36GB 1TB SSD - Space Black',
    price: 4500000,
    originalPrice: 4900000,
    discount: 8,
    description: `POTENCIADA POR M3 MAX: El chip Apple M3 Max, con una CPU de 14 núcleos y una GPU de 30 núcleos, ofrece un rendimiento descomunal para flujos de trabajo extremos como la programación, el renderizado 3D y la edición de video 8K.

PANTALLA LIQUID RETINA XDR: La pantalla Liquid Retina XDR de 16.2 pulgadas tiene un rango dinámico extremo, con 1,000 nits de brillo constante y una tasa de refresco ProMotion de hasta 120 Hz.

ESPECIFICACIONES TÉCNICAS:
- Procesador: Chip Apple M3 Max (CPU 14 núcleos / GPU 30 núcleos)
- Memoria unificada: 36 GB
- Almacenamiento: 1 TB SSD ultra veloz
- Duración de batería: Hasta 22 horas
- Puertos: Ranura para tarjeta SDXC, puerto HDMI, salida de auriculares, puerto MagSafe 3, tres puertos Thunderbolt 4 (USB-C)

CONTENIDO DE LA CAJA:
- MacBook Pro de 16 pulgadas
- Adaptador de corriente USB-C de 140 W
- Cable de USB-C a MagSafe 3 (2 m)`,
    category: 'Computación',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=800&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 32,
    stock: 4,
    freeShipping: true,
    isFull: true,
    sellerName: 'Apple Official Store',
    sellerRating: 'green',
    questions: [
      {
        id: 'q-2-1',
        user: 'NicolasG',
        text: '¿El teclado es en español o inglés?',
        answer: '¡Hola! Esta versión cuenta con distribución de teclado en inglés estadounidense (sin la letra Ñ física, pero configurable por software). Saludos.',
        date: '2026-06-24T18:40:00Z'
      }
    ]
  },
  {
    id: 'prod-3',
    title: 'Sony WH-1000XM5 Auriculares Inalámbricos con Cancelación Activa de Ruido - Negro',
    price: 650000,
    originalPrice: 780000,
    discount: 16,
    description: `CANCELACIÓN DE RUIDO LÍDER EN LA INDUSTRIA: Desde el ruido de un avión hasta las voces de la gente, nuestros auriculares inalámbricos WH-1000XM5 con cancelación de ruido de varios micrófonos conservan las frecuencias altas y medias mejor que nunca.

SONIDO EXCEPCIONAL: Diseñados con precisión para ofrecer una calidad de audio de alta resolución excepcional, compatible con LDAC y DSEE Extreme.

ESPECIFICACIONES TÉCNICAS:
- Tipo de auricular: Cerrado, dinámico
- Unidad de diafragma: 30 mm
- Respuesta de frecuencia: 4 Hz - 40,000 Hz
- Duración de batería: Hasta 30 horas con cancelación de ruido activada
- Tiempo de carga: 3.5 horas (compatible con carga rápida USB-PD)
- Conectividad: Bluetooth 5.2, NFC, cable desmontable

CONTENIDO DE LA CAJA:
- Auriculares Sony WH-1000XM5
- Estuche rígido de transporte
- Cable de conexión de 1.2 m
- Cable USB-C para carga`,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 345,
    stock: 22,
    freeShipping: true,
    isFull: true,
    sellerName: 'Sony Store Argentina',
    sellerRating: 'green',
    questions: [
      {
        id: 'q-3-1',
        user: 'Matias_90',
        text: '¿Tienen stock en color beige/plateado?',
        answer: '¡Hola Matías! En esta publicación disponemos de stock únicamente en color negro. Podés consultar nuestro catálogo para la versión en color plata. ¡Saludos!',
        date: '2026-06-25T11:20:00Z'
      }
    ]
  },
  {
    id: 'prod-4',
    title: 'Sony PlayStation 5 Slim Standard Edition 1TB Blanco',
    price: 1200000,
    originalPrice: 1350000,
    discount: 11,
    description: `DISEÑO SLIM PORTÁTIL: Con la PS5 Slim, los jugadores obtienen una potente tecnología de juego dentro de un diseño de consola elegante y compacto.

ALMACENAMIENTO DE 1 TB: Mantén tus juegos favoritos listos para jugar con 1 TB de almacenamiento SSD integrado.

ESPECIFICACIONES TÉCNICAS:
- Capacidad: 1 TB SSD ultra veloz
- Lector de discos: Sí (Blu-ray Ultra HD)
- Audio: Tempestad 3D AudioTech
- Soporte de salida: 4K 120Hz, compatible con pantallas 8K y VRR
- Control inalámbrico: DualSense con retroalimentación háptica y gatillos adaptables

CONTENIDO DE LA CAJA:
- Consola PlayStation 5 Slim Standard
- Control inalámbrico DualSense
- Cable HDMI
- Cable de alimentación AC
- Cable USB`,
    category: 'Consolas',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=800&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 562,
    stock: 9,
    freeShipping: true,
    isFull: true,
    sellerName: 'PlayStation Store Oficial',
    sellerRating: 'green',
    questions: []
  },
  {
    id: 'prod-5',
    title: 'Smart TV LG OLED 55 pulgadas 4K UHD AI ThinQ OLED55C3 - Negro',
    price: 2400000,
    originalPrice: 2800000,
    discount: 14,
    description: `EL NEGRO PERFECTO: Los píxeles autoiluminados de LG OLED brillan de manera independiente, logrando un contraste infinito y negros puros sin filtración de luz.

PROCESADOR a9 AI GEN 6: La inteligencia artificial optimiza la imagen y el sonido analizando el tipo de contenido en tiempo real.

ESPECIFICACIONES TÉCNICAS:
- Pantalla: 55 pulgadas OLED 4K UHD (3840 x 2160)
- Tasa de refresco: 120Hz nativos
- HDR: Dolby Vision / HDR10 / HLG
- Sistema Operativo: webOS 23
- Gaming: NVIDIA G-Sync, AMD FreeSync Premium, VRR, 4 puertos HDMI 2.1

CONTENIDO DE LA CAJA:
- LG OLED 55C3
- Control Remoto Magic Remote con baterías
- Cable de alimentación
- Base de soporte`,
    category: 'Televisores',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=800&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 204,
    stock: 3,
    freeShipping: true,
    isFull: false,
    sellerName: 'LG Electronics Store',
    sellerRating: 'green',
    questions: []
  },
  {
    id: 'prod-6',
    title: 'Teclado Mecánico Custom ModKey Pro 60% Switches Thocky Linear Retro-Neon',
    price: 180000,
    originalPrice: 220000,
    discount: 18,
    description: `DISEÑO EXCLUSIVO HANDMADE: Teclado mecánico custom premium ensamblado y lubricado a mano. Diseñado con una estética retro-futurista oscura y luces de neon RGB configurables.

ACÚSTICA ULTRA THOCKY: Equipado con switches lineales lubricados con Krytox 205g0 y estabilizadores premium para un perfil de tipeo grave y amortiguado.

ESPECIFICACIONES TÉCNICAS:
- Formato: 60% compacto (61 teclas)
- Switches: ModKey Linear Black (Fuerza de actuación 45g)
- Keycaps: PBT de doble inyección perfil Cherry
- Conectividad: Cable USB-C trenzado desmontable
- Compatibilidad: Windows, macOS, Linux

CONTENIDO DE LA CAJA:
- Teclado Custom ModKey Pro
- Cable USB-C a USB-A trenzado (1.8m)
- Extractor de switches y keycaps
- Switches de repuesto`,
    category: 'Computación',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 15,
    stock: 2,
    freeShipping: true,
    isFull: true,
    sellerName: 'ModKey Customs',
    sellerRating: 'green',
    questions: [
      {
        id: 'q-6-1',
        user: 'AgusMX',
        text: '¿Viene lubricado de fábrica o lo hacen a mano?',
        answer: '¡Hola! Cada teclado es desarmado y lubricado a mano por nosotros utilizando Krytox 205g0 en los switches y Krytox GPL 205g2 en los estabilizadores. El sonido es puramente thocky. ¡Saludos!',
        date: '2026-06-26T10:05:00Z'
      }
    ]
  },
  {
    id: 'prod-7',
    title: 'Apple Watch Ultra 2 GPS + Cellular 49mm Caja de Titanio Correa Alpine',
    price: 980000,
    originalPrice: 1100000,
    discount: 10,
    description: `DISEÑADO PARA EXTREMOS: Caja de titanio de 49 mm de calidad aeroespacial que ofrece el equilibrio perfecto entre peso, dureza y resistencia a la corrosión.

PANTALLA MÁS BRILLANTE: La pantalla Retina OLED siempre activa tiene un brillo máximo de 3,000 nits, lo que facilita la lectura a pleno sol.

ESPECIFICACIONES TÉCNICAS:
- Caja: 49 mm de Titanio aeroespacial
- Resistencia al agua: Hasta 100 metros
- Batería: Hasta 36 horas de uso normal / 72 horas en modo ahorro
- Conectividad: GPS de doble frecuencia y alta precisión, Conexión Celular 4G LTE
- Sensores: Sensor de temperatura, oxígeno en sangre, ECG, detección de caídas y choques

CONTENIDO DE LA CAJA:
- Apple Watch Ultra 2
- Correa Alpine Loop
- Cargador rápido magnético con cable USB-C (1 m)`,
    category: 'Celulares',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 110,
    stock: 6,
    freeShipping: true,
    isFull: true,
    sellerName: 'Apple Official Store',
    sellerRating: 'green',
    questions: []
  },
  {
    id: 'prod-8',
    title: 'Cámara Mirrorless Sony Alpha 7 IV Sensor Full-Frame 33 MP (Solo Cuerpo)',
    price: 3400000,
    originalPrice: 3800000,
    discount: 10,
    description: `CALIDAD DE IMAGEN REVOLUCIONARIA: El nuevo sensor de imagen CMOS Exmor R de 33.0 MP ofrece un rendimiento y una calidad de imagen extraordinarios tanto para fotos como para videos.

ENFOQUE AUTOMÁTICO EN TIEMPO REAL: Sistema de enfoque híbrido rápido con 759 puntos de AF por detección de fases que sigue los ojos de humanos, animales y aves al instante.

ESPECIFICACIONES TÉCNICAS:
- Sensor: Full-Frame de 35 mm (35.9 x 23.9 mm)
- Megapíxeles efectivos: 33.0 MP
- Grabación de video: 4K a 60p (recorte Super 35) y 4K a 30p de lectura completa
- Estabilización: Integrada de 5 ejes en el cuerpo
- Visor: Visor electrónico OLED Quad-VGA de 3.68 millones de puntos

CONTENIDO DE LA CAJA:
- Cámara Sony Alpha 7 IV (cuerpo)
- Batería recargable NP-FZ100
- Adaptador de CA y cable USB-C
- Correa para el hombro y tapa del cuerpo`,
    category: 'Cámaras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 78,
    stock: 3,
    freeShipping: true,
    isFull: false,
    sellerName: 'Sony Store Argentina',
    sellerRating: 'green',
    questions: [
      {
        id: 'q-8-1',
        user: 'Maxi_Click',
        text: '¿Viene con el lente kit de 28-70mm?',
        answer: '¡Hola! Esta publicación corresponde únicamente al cuerpo de la cámara (no incluye lentes). Podés ver nuestras otras publicaciones para los combos con lentes. ¡Saludos!',
        date: '2026-06-23T15:30:00Z'
      }
    ]
  },
  {
    id: 'prod-9',
    title: 'Monitor Gamer Curvo Samsung Odyssey G9 49 pulgadas Dual QHD 240Hz 1ms',
    price: 2900000,
    originalPrice: 3200000,
    discount: 9,
    description: `PANTALLA ULTRA ANCHA REVOLUCIONARIA: La curvatura 1000R se adapta al contorno del ojo humano para ofrecer un realismo inimaginable y una inmersión total de 49 pulgadas.

TASA DE REFRESCO DE 240HZ: El panel de 240 Hz y tiempo de respuesta de 1 ms elimina cualquier retraso para que juegues de forma ultra fluida.

ESPECIFICACIONES TÉCNICAS:
- Tamaño de pantalla: 49 pulgadas curvo (1000R)
- Resolución: Dual QHD (5120 x 1440)
- Tasa de refresco: 240 Hz
- Tiempo de respuesta: 1 ms (GtG)
- Entradas: 2 DisplayPort 1.4, 1 HDMI 2.1, concentrador USB
- Tecnologías: G-Sync compatible, FreeSync Premium Pro, HDR1000

CONTENIDO DE LA CAJA:
- Monitor Samsung Odyssey G9
- Cable de alimentación
- Cable DisplayPort
- Soporte de base ajustable`,
    category: 'Computación',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 43,
    stock: 2,
    freeShipping: true,
    isFull: true,
    sellerName: 'Samsung Tienda Oficial',
    sellerRating: 'green',
    questions: []
  },
  {
    id: 'prod-10',
    title: 'Auriculares In-Ear Apple AirPods Pro (2.ª generación) con Estuche de Carga MagSafe Magsafe (USB-C)',
    price: 360000,
    originalPrice: 420000,
    discount: 14,
    description: `CHIP H2: El chip diseñado por Apple potencia una cancelación activa de ruido dos veces superior y un sonido tridimensional adaptativo para una inmersión de audio acústico única.

AUDIO ADAPTATIVO: Mezcla de forma inteligente la transparencia de audio y la cancelación de ruido activa según el entorno acústico en el que te encuentre.

ESPECIFICACIONES TÉCNICAS:
- Chip de auriculares: Chip Apple H2 / Chip U1 en estuche
- Conectividad: Bluetooth 5.3
- Resistencia: IP54 al polvo, sudor y agua
- Autonomía: Hasta 6 horas de reproducción / 30 horas con estuche
- Estuche: Compatible con cargadores MagSafe, Apple Watch y USB-C

CONTENIDO DE LA CAJA:
- AirPods Pro (2.ª generación)
- Estuche de carga MagSafe (USB-C) con altavoz
- Almohadillas de silicona (cuatro tamaños: XS, S, M, L)
- Cable de carga USB-C`,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&h=800&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 880,
    stock: 35,
    freeShipping: true,
    isFull: true,
    sellerName: 'Apple Official Store',
    sellerRating: 'green',
    questions: []
  },
  {
    id: 'prod-11',
    title: 'Videocámara Deportiva GoPro HERO12 Black 5.3K HDR Sumergible',
    price: 480000,
    originalPrice: 530000,
    discount: 9,
    description: `RESOLUCIÓN 5.3K LÍDER: La HERO12 ofrece una calidad de imagen excepcional con videos de 5.3K con un 91% más de resolución que 4K.

ESTABILIZACIÓN HYPERSMOOTH 6.0: Estabilización de video ganadora del premio Emmy que mantiene las tomas increíblemente fluidas sin importar qué tan extrema sea la acción.

ESPECIFICACIONES TÉCNICAS:
- Resolución de video: 5.3K a 60 fps, 4K a 120 fps, 2.7K a 240 fps (cámara lenta de 8x)
- Foto: 27 MP a partir de videos e imágenes individuales
- Resistencia al agua: Sumergible hasta 10 metros sin carcasa adicional
- Sensor: 1/1.9 pulgadas con relación de aspecto 8:7 panorámica

CONTENIDO DE LA CAJA:
- Cámara GoPro HERO12 Black
- Batería recargable Enduro
- Soporte adhesivo curvo
- Hebilla de montaje y tornillo moleteado
- Cable USB-C`,
    category: 'Cámaras',
    image: 'https://images.unsplash.com/photo-1565538810844-1e119fa11126?w=800&h=800&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 154,
    stock: 12,
    freeShipping: true,
    isFull: true,
    sellerName: 'GoPro Store Oficial',
    sellerRating: 'green',
    questions: []
  },
  {
    id: 'prod-12',
    title: 'Consola Nintendo Switch OLED Model 64GB Neon Red/Neon Blue',
    price: 680000,
    originalPrice: 750000,
    discount: 9,
    description: `PANTALLA OLED DE 7 PULGADAS: Disfruta de colores brillantes y contrastes definidos en una pantalla OLED de alta definición que hace resaltar tus juegos portátiles.

SOPORTE AJUSTABLE ANCHO: Inclina el soporte robusto para jugar cómodamente en el modo semiportátil con el ángulo de visión ideal.

ESPECIFICACIONES TÉCNICAS:
- Pantalla: OLED táctil capacitiva de 7 pulgadas (1280 x 720)
- Almacenamiento interno: 64 GB (expandible mediante tarjeta MicroSD)
- Modos de juego: TV, Semiportátil, Portátil
- Batería: Aproximadamente 4.5 a 9 horas de duración

CONTENIDO DE LA CAJA:
- Consola Nintendo Switch modelo OLED
- Base de Nintendo Switch con puerto LAN para conexión por cable
- Controles Joy-Con Izquierdo y Derecho
- Correas y armazón para Joy-Con
- Cable HDMI y adaptador de corriente`,
    category: 'Consolas',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=800&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 912,
    stock: 18,
    freeShipping: true,
    isFull: true,
    sellerName: 'Nintendo Tienda Oficial',
    sellerRating: 'green',
    questions: [
      {
        id: 'q-12-1',
        user: 'Jona_Gamer',
        text: '¿Tiene garantía nacional? ¿El cargador es de patas argentinas?',
        answer: '¡Hola! Sí, cuenta con garantía nacional de 12 meses y viene con el enchufe homologado oficial apto para la Argentina (patas oblicuas). ¡Esperamos tu compra!',
        date: '2026-06-25T19:22:00Z'
      }
    ]
  }
];
