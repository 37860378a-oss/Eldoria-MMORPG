# Dirección visual de Eldoria

## Referencia de estilo
Entorno de fantasía estilizado y pintado a mano: bosques frondosos, árboles con siluetas claras, vegetación en capas, caminos de tierra orgánicos, rocas, flores pequeñas y luz ambiental cálida. Mantener lectura visual limpia y evitar realismo fotográfico pesado.

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
## Vegetación añadida — paso 2
- Helechos low-poly con hojas triangulares, instanciados y agrupados por celdas en el bosque templado.
- Densidad limitada: 110 ejemplares en móvil y 300 en escritorio; sin sombras propias para reducir coste.
- Se respetan las zonas urbanas, pendientes y caminos existentes para mantener despejadas las rutas.
- Se reutilizan los sistemas de instanciado y culling ya presentes en el proyecto.
