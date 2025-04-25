function loadWhatsAppWidget(pdfUrl) {
  const h1 = document.querySelector("h1");
  const carreraNombre = h1 ? h1.textContent.replace(/^🏛️\s*/, "").trim() : "Carrera";

  const container = document.createElement("div");
  container.classList.add("whatsapp-widget");

  container.innerHTML = `
    <div class="whatsapp-modal">
      <h3>📱 Enviar info por WhatsApp</h3>
      <p>Completa los datos para enviar la información al prospecto vía WhatsApp:</p>
      <input type="text" id="prospectName" placeholder="Nombre del prospecto" />
      <input type="tel" id="whatsappNumber" placeholder="Número WhatsApp (10 dígitos)" />

      <div id="messageSelector">
        <p>Selecciona el mensaje:</p>
        <button onclick="setMessageType(1)">1</button>
        <button onclick="setMessageType(2)">2</button>
        <button onclick="setMessageType(3)">3</button>
        <button onclick="setMessageType(4)">4</button>
        <button onclick="setMessageType(5)">5</button>
      </div>

      <button onclick="sendWhatsApp('${pdfUrl}', '${carreraNombre}')">Enviar por WhatsApp</button>
    </div>
  `;

  document.body.appendChild(container);

  window.selectedMessageType = 1;
}

function setMessageType(type) {
  window.selectedMessageType = type;

  const buttons = document.querySelectorAll('#messageSelector button');
  buttons.forEach((btn, index) => {
    if (index + 1 === type) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
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

  let message = "";

  switch (window.selectedMessageType) {
    case 1:
      message = `Hola ${name}, soy el Lic. Axel Gutiérrez del Departamento de Becas y Admisiones de UVM.\n\n` +
        `Te comparto los detalles de la carrera "${carreraNombre}":\n\n` +
        `- Modalidad: 100% en línea.\n` +
        `- Duración: ${duracion}\n\n` +
        `- Plataforma de Aprendizaje:\n` +
        `Utilizarás la plataforma autodidacta Blackboard, accesible 24/7, para tus actividades de aprendizaje y evaluación.\n` +
        `Además, contarás con sesiones de aprendizaje en vivo los lunes, miércoles y viernes en 4 horarios vespertinos.\n` +
        `En caso de no poder conectarte, podrás ver las sesiones grabadas.\n` +
        `No contamos faltas ni control de tiempo de conexión.\n\n` +
        `- Aquí está el plan de estudios: ${pdfUrl}`;
      break;
    case 2:
      message = `¡Hola ${name}! Soy Axel Gutiérrez de UVM.\n\n` +
        `Gracias por tu interés en la carrera "${carreraNombre}".\n` +
        `📚 Duración: ${duracion}\n` +
        `🖥️ Modalidad: 100% Online con clases grabadas y en vivo.\n\n` +
        `Plan de estudios aquí: ${pdfUrl}\n\n` +
        `Estoy a tus órdenes para resolver cualquier duda.`;
      break;
    case 3:
      message = `Saludos ${name}, te escribe Axel Gutiérrez.\n\n` +
        `Te comparto información de "${carreraNombre}".\n` +
        `Duración: ${duracion}\nModalidad: En línea.\n\n` +
        `📄 Plan de estudios: ${pdfUrl}\n\n` +
        `¿Te gustaría que agendáramos una llamada?`;
      break;
    case 4:
      message = `Hola ${name} 👋, Axel Gutiérrez de Admisiones UVM.\n\n` +
        `Detalles rápidos de "${carreraNombre}":\n` +
        `🕒 Duración: ${duracion}\n` +
        `📚 Modalidad: 100% en línea.\n\n` +
        `Plan de materias: ${pdfUrl}\n\n` +
        `¿Cuándo te gustaría iniciar?`;
      break;
    case 5:
      message = `¡Buenas tardes ${name}! Soy Axel Gutiérrez de la Universidad UVM.\n\n` +
        `Sobre la carrera "${carreraNombre}":\n` +
        `✔️ Modalidad 100% en línea\n` +
        `✔️ Duración estimada: ${duracion}\n\n` +
        `Plan de estudios aquí ➡️ ${pdfUrl}\n\n` +
        `¿Te puedo apoyar en tu proceso de inscripción?`;
      break;
    default:
      message = "Hola, te compartimos información de la carrera.";
  }

  const url = `https://web.whatsapp.com/send?phone=52${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

  