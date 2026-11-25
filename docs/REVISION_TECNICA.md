# Eldoria — revisión técnica inicial

Fecha de revisión: 2026-11-25  
Rama revisada: `main`  
Archivo base: `index.html`

## 1. Estado del prototipo

El proyecto actual es una aplicación web de un solo archivo: HTML, CSS y JavaScript integrados, con Three.js r128 cargado desde cdnjs. La lógica principal está dentro de un script inline.

El prototipo ya contiene:

- Pantallas de registro, inicio de sesión y selección/creación de personajes.
- Ocho razas y varias clases jugables definidas en el código.
- Mundo 3D con terreno procedural, cuatro zonas/biomas, ciudades, vegetación y objetos.
- Criaturas con movimiento, agresividad, combate, habilidades, proyectiles y regeneración.
- NPC, interacción, comercio, descanso y elementos de interfaz.
- HUD, cámara, controles de teclado y controles táctiles.
- Ciclo día/noche, clima, música/ambiente y opciones gráficas.
- Guardado de configuración y progreso en el navegador.

## 2. Límite principal confirmado

Las cuentas y los personajes se almacenan en `localStorage`:

- Cuentas: clave `eld_acc`.
- Última cuenta usada: clave `eld_last`.
- Configuración gráfica: clave `eld_cfg`.

El registro calcula un hash en el navegador, pero esto no constituye autenticación de servidor. Los datos pueden inspeccionarse o modificarse desde el navegador y no se comparten entre dispositivos o jugadores.

El guardado del personaje se ejecuta cada ocho segundos y al salir de la página. En el estado actual se guardan nivel, experiencia, oro, algunos atributos/objetos, talentos, posición y datos de misiones. No existe todavía una base de datos central ni sincronización multijugador.

## 3. Decisión de desarrollo

**Conservar HTML + Three.js y evolucionar el prototipo existente.** No migrar a Godot ni reemplazar el juego por una plantilla nueva.

Antes de cambiar sistemas importantes, mantener una copia del estado funcional y trabajar con cambios pequeños, verificables y reversibles.

## 4. Orden recomendado

### Fase 0 — Línea base y diagnóstico
- Probar el prototipo en navegador de escritorio y, si es posible, móvil.
- Registrar errores de consola y problemas reproducibles.
- Identificar qué sistemas funcionan, cuáles están incompletos y cuáles necesitan optimización.
- No alterar todavía el comportamiento del juego.

### Fase 1 — Preparación técnica
- Mantener `index.html` funcional como punto de referencia.
- Ordenar el código por responsabilidades de forma gradual, sin una reescritura masiva.
- Centralizar la lectura/escritura de datos para que luego pueda cambiarse el almacenamiento local por una API.
- Añadir validaciones y manejo de errores de guardado.

### Fase 2 — Cuentas y personajes reales
- Diseñar un backend con registro e inicio de sesión del lado del servidor.
- Guardar contraseñas con un algoritmo apropiado en el servidor; nunca confiar en el hash calculado por el cliente como mecanismo de seguridad.
- Crear persistencia central para cuentas, personajes, progreso, inventario y misiones.
- Definir identificadores estables para cuentas y personajes; no depender del nombre visible del personaje.

### Fase 3 — Mundo compartido
- Incorporar servidor de juego y comunicación en tiempo real.
- El servidor debe validar movimiento, combate, recompensas y estado de los personajes.
- Sincronizar jugadores y entidades del mundo; no confiar en el estado enviado por el navegador.

### Fase 4 — Contenido y rendimiento
- Ampliar biomas, vegetación, ciudades, criaturas y actividades sin degradar el rendimiento.
- Medir FPS, memoria, tiempos de carga y cantidad de objetos/draw calls.
- Mantener niveles de calidad adaptables para equipos modestos.

## 5. Riesgos que no debemos introducir

- No reemplazar todo el archivo con una versión nueva sin comparar funcionalidades.
- No activar multijugador como si bastara con compartir `localStorage`: requiere backend y autoridad del servidor.
- No guardar contraseñas ni validar progreso únicamente en el cliente cuando existan cuentas reales.
- No hacer refactors grandes junto con cambios de gameplay; separar las modificaciones para localizar errores.

## 6. Próximo paso

Realizar una prueba de referencia del prototipo actual: abrirlo, registrar una cuenta de prueba, crear un personaje, entrar al mundo, combatir, cambiar de zona, salir y volver a entrar. Anotar errores visibles y confirmar qué progreso se conserva. Con esa línea base se podrá implementar el primer cambio sin perder funciones existentes.

## 7. Alcance de esta revisión

Esta revisión es estática: se inspeccionó el código fuente de `index.html` en GitHub. No implica que el juego haya sido ejecutado ni probado en un navegador durante esta revisión.
