function loadWhatsAppWidget(pdfUrl) {
  // Obtener título de la carrera desde el <h1>
  const h1 = document.querySelector("h1");
  const carreraNombre = h1 ? h1.textContent.replace(/^🏛️\s*/, "").trim() : "Carrera";

  const container = document.createElement("div");
  container.classList.add("whatsapp-widget");
  container.innerHTML = `
    <h3>📱 Solicita info por WhatsApp</h3>
    <input type="text" id="prospectName" placeholder="Nombre del prospecto" />
    <input type="tel" id="whatsappNumber" placeholder="Número WhatsApp (10 dígitos)" />
    <button onclick="sendWhatsApp('${pdfUrl}', '${carreraNombre}')">Enviar por WhatsApp</button>
  `;
  document.body.appendChild(container);
}

function sendWhatsApp(pdfUrl, carreraNombre) {
  const phone = document.getElementById('whatsappNumber').value.replace(/\s+/g, '');
  const name = document.getElementById('prospectName').value.trim();

  if (!name) {
    alert("Por favor, ingresa el nombre del prospecto.");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Por favor, ingresa un número válido de 10 dígitos.");
    return;
  }

  const duracionElement = [...document.querySelectorAll("li")]
    .find(el => el.textContent.includes("Duración"));
  const modalidadElement = [...document.querySelectorAll("li")]
    .find(el => el.textContent.includes("Modalidad"));

  const duracion = duracionElement ? duracionElement.textContent.replace("Duración:", "").trim() : "No especificada";

  const message = encodeURIComponent(
    `Hola ${name}, soy el Lic. Axel Gutiérrez del Departamento de Becas y Admisiones de UVM.\n\n` +
    `Te comparto los detalles de la carrera "${carreraNombre}":\n\n` +
    `- Modalidad: 100% en línea.\n` +
    `- Duración: ${duracion}\n\n` +
    `- Plataforma de Aprendizaje:\n` +
    `Utilizarás la plataforma autodidacta Blackboard, accesible 24/7, para tus actividades de aprendizaje y evaluación.\n` +
    `Además, contarás con sesiones de aprendizaje en vivo los lunes, miércoles y viernes en 4 horarios vespertinos.\n` +
    `En caso de no poder conectarte, podrás ver las sesiones grabadas.\n` +
    `No contamos faltas ni control de tiempo de conexión.\n\n` +
    `- Aquí está el plan de estudios: ${pdfUrl}`
  );

  const url = `https://web.whatsapp.com/send?phone=52${phone}&text=${message}`;
  window.open(url, '_blank');
}

  