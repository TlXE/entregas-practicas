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
      const user = firebase.auth().currentUser;
      const asesor = user && user.displayName ? user.displayName : "el equipo de Admisiones UVM";
      message = `Hola ${name}, soy ${asesor} del Departamento de Becas y Admisiones de UVM.\n\n` +

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
      message = `Te comparto los detalles de beneficios académicos al estudiar UVM 🎓\n\n` +
        `Prestigio académico\n` +
        `Somos la 2da mejor institución académica en todo el país, contamos con 60 años de experiencia que respaldarán tu preparación educativa y profesional, por lo cual tendrás mejores oportunidades laborales.\n\n` +
        `Modalidad y tiempo\n` +
        `Contamos con una modalidad 100% en línea que te permitirá estudiar, trabajar y dedicar tiempo a tu vida personal 🕒.\n\n` +
        `Plataforma de vanguardia\n` +
        `Contarás con una plataforma autodidacta con reconocimiento internacional que te facilitará todas tus actividades de estudio y te permitirá el acceso 24/7 desde cualquier dispositivo con acceso a internet 💻.\n\n` +
        `Plan de estudios\n` +
        `Contarás con un plan de estudios enfocado a tu preparación profesional, en cual se incluyen certificaciones estratégicas emitidas por Coursera, estas darán un plus a tu perfil profesional ya que tienen validez nacional e internacional 🌍.\n\n` +
        `Gym Académico\n` +
        `Tomarás talleres de habilidades digitales que te permitirán adaptar tus conocimientos en el ámbito educativo y profesional.\n\n` +
        `Cursos UVM GO\n` +
        `Cada inicio de cuatrimestre se te otorgará un curso certificado de manera adicional, este puede ser sobre un área laboral distinta a la que estudias, y cuenta con validez curricular 📘.\n\n` +
        `Bolsa de trabajo\n` +
        `En caso de requerirlo, UVM cuenta con convenios nacionales e internacionales para que puedas desarrollarte de manera profesional 💼.\n\n` +
        `Acompañamiento académico\n` +
        `Tus docentes y coordinadores de carrera te acompañan en todo momento para aclarar dudas ya sea por medio de mensaje, correo o sesiones en vivo ✉️.\n\n` +
        `Materiales bibliográficos\n` +
        `Cuentas con acceso a nuestra biblioteca digital sin costo, por lo cual no deberás invertir en materiales adicionales 📚.\n\n` +
        `Titulación 0\n` +
        `Para tu trámite no deberás presentar tesis, tesina o seminario de titulación. Solo deberás cumplir con 3 requisitos:\n\n` +
        `- 100% de tus materias\n` +
        `- Servicio social\n` +
        `- Presentar examen profesional ✅\n\n` +
        `Doble Titulación\n` +
        `Si hablas el idioma inglés de manera avanzada, podrás solicitar las materias especializadas de National Louis University para especializar tu carrera y contar con una doble titulación 🎓.\n\n` +
        `Certificación de estudios en EE.UU\n` +
        `Contarás con la certificación de Equivalencia por IEE (International Education Evaluations), organización adscrita a NACES, asegurando la validez y aceptación de tus credenciales académicas para fines laborales, migratorios o académicos 🌐.\n\n` +
        `Estoy a tus órdenes para resolver cualquier duda.`;
      break;

    case 3:
      message = `¿Qué te parece, es el programa que estas buscando?`;
      break;
    case 4:
      message = `¿Cuándo te gustaría iniciar?`;
      break;
    case 5:
      message =`¿Te puedo apoyar en tu proceso de inscripción?`;
      break;
    default:
      message = "Hola, te compartimos información de la carrera.";
  }

  const url = `https://web.whatsapp.com/send?phone=52${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

  
