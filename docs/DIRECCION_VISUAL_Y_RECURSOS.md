# Dirección visual de Eldoria

## Referencia de estilo
Entorno de fantasía estilizado y pintado a mano: bosques frondosos, árboles con siluetas claras, vegetación en capas, caminos de tierra orgánicos, rocas, flores pequeñas y luz ambiental cálida. Mantener lectura visual limpia y evitar realismo fotográfico pesado.

## Texturas procedurales actuales
- El prototipo usa texturas tileables de 128×128 generadas en canvas para no multiplicar el consumo de memoria.
- La versión pintada v2 adapta luces y sombras al color base de cada material, en lugar de aplicar el mismo tinte verde a piedra, madera, nieve y suelo.
- Cada textura combina pigmento amplio, pinceladas medianas, pequeños toques y grano fino; los trazos se repiten por los bordes para evitar cortes visibles.
- Se conserva el tamaño 128×128 en esta etapa porque el código de materiales existente dibuja detalles sobre esa misma escala. No aumentar resolución sin adaptar y probar todas esas capas.

### Ajuste visual v4 (25/11/2026)
- Se aumentó la intensidad de pigmentos, pinceladas y manchas para que la textura se perciba a simple vista durante el juego.
- Se ampliaron trazos y manchas, manteniendo el lienzo tileable de 128×128 y reduciendo el grano fino para evitar ruido visual.
- El generador se aplica a los materiales creados mediante `tex()`; el terreno conserva además su sombreado procedural propio.
- Esta revisión requiere comprobación visual dentro del navegador; el commit por sí solo no confirma el resultado en pantalla.

### Perfiles arquitectónicos v5 (25/11/2026)
- Se añadieron perfiles específicos para tejados y mampostería, identificados por color y escala de repetición del material.
- Los tejados reciben pequeñas placas y bordes pintados; los muros, juntas de bloques y variación de pigmento.
- Se conservan las texturas tileables de 128×128, los materiales reutilizados y la geometría existente.
- La comprobación final de aspecto debe hacerse en el navegador; no se ha realizado una prueba visual automatizada.

## Reglas de rendimiento
- Priorizar texturas tileables de 256 px; usar 512 px solo en superficies cercanas o elementos destacados.
- Reutilizar materiales y texturas por bioma.
- Preferir WebP para imágenes descargables; evaluar KTX2/Basis cuando el pipeline de texturas GPU esté preparado.
- Evitar texturas 2K/4K en dispositivos móviles.
- Agrupar vegetación por celdas y reutilizar geometrías/materiales.
- Cargar primero la zona actual; precargar zonas contiguas y liberar recursos lejanos.
- Calidad escalable según GPU, memoria y tamaño de pantalla.

## Primer bioma objetivo: bosque templado
1. Suelo de césped con variaciones de tono.
2. Manchas de tierra y senderos curvos.
3. Árboles estilizados de dos o tres siluetas reutilizables.
4. Arbustos, helechos, flores y piedras en grupos pequeños.
5. Luz cálida y niebla ambiental suave, con opción de desactivar efectos.

## Compatibilidad
Mantener Three.js r128 y renderizado WebGL. Probar en Chrome/Edge de Windows y Chrome Android. Evitar dependencias de APIs exclusivas de escritorio.
## Vegetación y rendimiento
- Se mantienen el césped instanciado y los arbustos low-poly existentes, agrupados por celdas para aprovechar el culling.
- Los helechos no están activos: su primera implementación se retiró porque dejó la generación del mundo bloqueada. No reintroducirlos hasta contar con una prueba de carga controlada.
- Las nuevas mejoras visuales priorizan materiales y texturas antes que sumar grandes cantidades de geometría.
