function loadWhatsAppWidget(pdfUrl, carreraNombre) {
    const container = document.createElement("div");
    container.innerHTML = `
      <h3>📱 Solicita info por WhatsApp</h3>
      <input type="tel" id="whatsappNumber" placeholder="Ingresa tu número (10 dígitos)" />
      <button onclick="sendWhatsApp('${pdfUrl}', '${carreraNombre}')">Enviar por WhatsApp</button>
    `;
    document.body.appendChild(container);
  }
  
  function sendWhatsApp(pdfUrl, carreraNombre) {
    const phone = document.getElementById('whatsappNumber').value.trim();
    if (!/^\d{10}$/.test(phone)) {
      alert("Por favor, ingresa un número válido de 10 dígitos.");
      return;
    }
  
    const message = encodeURIComponent(`Hola, estoy interesado en la ${carreraNombre}. ¿Podrías compartirme más información? Aquí está el plan de estudios: ${pdfUrl}`);
    const url = `https://wa.me/52${phone}?text=${message}`;
  
    window.open(url, '_blank');
  }
  