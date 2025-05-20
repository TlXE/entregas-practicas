function abrirCuadroRojo() {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-MX');
    const hora = ahora.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  
    document.getElementById("crFecha").value = fecha;
    document.getElementById("crHora").value = hora;
    document.getElementById("cuadroRojoModal").style.display = "block";
  
    // Activar actualización en tiempo real
    activarVistaPreviaTiempoReal();
  }
  
  function activarVistaPreviaTiempoReal() {
    const inputs = document.querySelectorAll("#cuadroRojoModal input, #cuadroRojoModal select");
    inputs.forEach(input => {
      input.addEventListener("input", actualizarVistaPrevia);
    });
  }
  
  function actualizarVistaPrevia() {
    const campos = {
      FECHA: document.getElementById("crFecha").value,
      CE: document.getElementById("crCE").value,
      NUMERO: document.getElementById("crNumPersona").value,
      NOMBRE: document.getElementById("crNombre").value,
      TELEFONO: document.getElementById("crTelefono").value,
      CORREO: document.getElementById("crCorreo").value,
      LINEA: document.getElementById("crLinea").value,
      CARRERA: document.getElementById("crCarrera").value,
      PROMEDIO: document.getElementById("crPromedio").value,
      FUENTE: document.getElementById("crFuente").value,
      CICLO: document.getElementById("crCiclo").value,
      ASESOR: document.getElementById("crAsesorDestino").value,
      HORA: document.getElementById("crHora").value,
      LIGA: document.getElementById("crLiga").value,
      ESTATUS: document.getElementById("crEstatus").value
    };
  
    const encabezados = [
      "FECHA", "CE", "NO. PERSONA", "NOMBRE", "TELÉFONO", "CORREO",
      "LÍNEA DE INTERÉS", "CARRERA", "PROMEDIO", "FUENTE DE OBTENCIÓN",
      "CICLO", "ASESOR A QUE SE TRANSFIERE", "HORA", "LIGA", "ESTATUS"
    ];
  
    const datos = [
      campos.FECHA,
      campos.CE,
      campos.NUMERO,
      campos.NOMBRE,
      campos.TELEFONO,
      `<a href="mailto:${campos.CORREO}">${campos.CORREO}</a>`,
      campos.LINEA,
      campos.CARRERA,
      campos.PROMEDIO,
      campos.FUENTE,
      campos.CICLO,
      campos.ASESOR,
      campos.HORA,
      campos.LIGA ? `<a href="${campos.LIGA}" target="_blank">${campos.LIGA}</a>` : "",
      campos.ESTATUS
    ];
  
    const html = `
      <div style="text-align: left;">
      <p>Buen día.<br>
        Comparto cuadro de transferencia exitosa.<br>
        Quedo pendiente a retro, saludos.
      </p>
      </div><br>
      <table style="border-collapse:collapse; font-family:Arial, sans-serif; font-size:14px; width:100%;">
        <thead>
          <tr>
            ${encabezados.map(texto => `
              <th style="background-color:red; color:white; border:1px solid black; padding:5px;">${texto}</th>
            `).join("")}
          </tr>
        </thead>
        <tbody>
          <tr>
            ${datos.map(valor => `
              <td style="background-color:#eafaf1; border:1px solid black; padding:5px;">${valor}</td>
            `).join("")}
          </tr>
        </tbody>
      </table>`;
  
    document.getElementById("vistaPrevia").innerHTML = html;
  }
  
  function enviarCuadroRojo() {
    // Antes de copiar, actualizamos una última vez
    actualizarVistaPrevia();
  
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = document.getElementById("vistaPrevia").innerHTML;
    document.body.appendChild(tempDiv);
  
    const range = document.createRange();
    range.selectNode(tempDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  
    try {
      document.execCommand("copy");
      alert("✅ Contenido copiado. Ve a Outlook y presiona Ctrl + V.");
    } catch (err) {
      alert("❌ No se pudo copiar automáticamente. Usa Ctrl + C manualmente.");
    }
  
    document.body.removeChild(tempDiv);
  
    // Abrir Outlook
    window.open("https://outlook.office.com/mail/deeplink/compose", "_blank");
  }
  
  
  function autocompletarDesdeTexto() {
    const texto = document.getElementById("entradaRapida").value;

    // Separar por |
    const partes = texto.split("|").map(p => p.trim());

    // Asignar a los campos si existen suficientes partes
    if (partes.length >= 3) {
      document.getElementById("crNombre").value = partes[0];
      document.getElementById("crNumPersona").value = partes[1];
      document.getElementById("crCorreo").value = partes[2];
    } else {
      alert("Formato incorrecto. Usa: Nombre | Número | Correo");
    }
  }