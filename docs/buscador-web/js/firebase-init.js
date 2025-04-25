// firebase-init.js

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
  
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "/entregas-practicas/buscador-web/login.html";
    }
  });
  
  // Mostrar botón solo si está logueado
firebase.auth().onAuthStateChanged((user) => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (user) {
    logoutBtn.style.display = "inline-block";
  } else {
    logoutBtn.style.display = "none";
  }
});

// Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", function () {
  firebase.auth().signOut().then(() => {
    alert("Sesión cerrada correctamente.");
    window.location.href = "/login.html"; // Cambia esto si usas otra ruta
  }).catch((error) => {
    console.error("Error al cerrar sesión:", error);
    alert("Ocurrió un error al cerrar sesión.");
  });
});
