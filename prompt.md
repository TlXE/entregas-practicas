# Prompt - Algoritmo Simplificado de mi App

## Descripción de funcionamiento paso a paso

1. **Inicio de la App (login.html)**
   - El usuario accede a la pantalla de inicio de sesión.
   - Introduce correo y contraseña válidos (autenticación por Firebase Auth).
   - Si es correcto, redirige automáticamente a `index.html`.
   - Si es incorrecto, muestra mensaje de error.

2. **Pantalla Principal (index.html)**
   - Se presenta el buscador con un input de texto.
   - Al escribir, el motor Fuse.js realiza búsqueda predictiva de carreras disponibles.
   - Los resultados se muestran con detalles básicos (nombre de carrera).
   - Opciones:
     - Ver plan de estudios en PDF.
     - Copiar enlace preformateado para enviar por WhatsApp.
     - Acceder al formulario Cuadro Rojo.

3. **Formulario Cuadro Rojo (cuadro-rojo.html)**
   - Muestra formulario para registrar transferencia de prospecto.
   - Incluye campos obligatorios: nombre, teléfono, carrera, asesor, fuente, etc.
   - Incluye campos con listas desplegables con sugerencias precargadas.
   - Al finalizar el llenado, permite copiar el mensaje y abrir directamente Outlook.

4. **Extras actuales**
   - Validaciones básicas en los campos (por ejemplo, campos obligatorios, campos de fecha/hora precargados).
   - Diseño adaptado para dispositivos móviles y desktop.

## Resumen
La aplicación actualmente funciona en entorno web estático usando HTML, CSS y JS, integrando Firebase Auth y Fuse.js, con interactividad mediante formularios dinámicos y mensajes preconfigurados.
