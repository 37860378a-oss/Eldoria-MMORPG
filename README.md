# Eldoria-MMORPG

**Eldoria** es un prototipo de MMORPG 3D para navegador construido con HTML, CSS, JavaScript y Three.js.

## Estado actual

La versión inicial del prototipo está disponible en [index.html](./index.html). Incluye mundo 3D, movimiento, controles táctiles, selección de raza y clase, criaturas, combate, habilidades, talentos, inventario, vendedores y progreso de personaje.

## Cómo ejecutarlo

1. Cloná o descargá este repositorio.
2. Abrí una terminal en la carpeta del proyecto.
3. Iniciá un servidor web local, por ejemplo:

   ```bash
   python -m http.server 8000
   ```

4. Abrí http://localhost:8000 en el navegador.

Three.js r128 se carga desde cdnjs, por lo que se necesita conexión a Internet para cargar esa biblioteca.

## Datos y limitaciones actuales

- Las cuentas y los personajes se almacenan en `localStorage` del navegador.
- Los datos no se comparten entre dispositivos ni usuarios.
- Todavía no hay servidor de autenticación, base de datos central ni multijugador persistente.
- Esta etapa conserva el prototipo original; no implica una migración ni una reescritura del juego.

## Próximas etapas

1. Auditar y dividir el código en módulos sin alterar el comportamiento existente.
2. Probar el prototipo y corregir errores reproducibles.
3. Diseñar el backend, autenticación y persistencia de personajes.
4. Implementar sincronización multijugador y mundo persistente.
5. Mejorar biomas, contenido y rendimiento mediante cambios medibles.

## Principio de desarrollo

Preservar el trabajo existente, realizar cambios pequeños y verificables, y documentar cada avance.
