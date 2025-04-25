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
  