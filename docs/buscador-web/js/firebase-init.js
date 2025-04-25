const firebaseConfig = {
  apiKey: "AIzaSyB4gtsjjQtwdVmx75hyWqqv5kljRDlAjJQ",
  authDomain: "buscador-licenciaturas.firebaseapp.com",
  projectId: "buscador-licenciaturas",
  storageBucket: "buscador-licenciaturas.firebasestorage.app",
  messagingSenderId: "244237792893",
  appId: "1:244237792893:web:8c9982304c6c991bf0e314",
  measurementId: "G-7X1VFM6R28"
};

firebase.initializeApp(firebaseConfig);

// Esperar a que el DOM esté listo
window.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.body.style.display = "block"; // Mostrar la página
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
      // Redirige al login si no hay sesión
      window.location.href = "/entregas-practicas/buscador-web/login.html";
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      firebase.auth().signOut().then(() => {
        alert("Sesión cerrada correctamente.");
        window.location.href = "/entregas-practicas/buscador-web/login.html";
      }).catch((error) => {
        console.error("Error al cerrar sesión:", error);
        alert("Ocurrió un error al cerrar sesión.");
      });
    });
  }
});

