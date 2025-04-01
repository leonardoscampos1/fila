import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBNqhZfb7AOrqCEYQdueiSvWZpG2Vrf6Pg",
    authDomain: "fila-de-atendimento-94218.firebaseapp.com",
    databaseURL: "https://fila-de-atendimento-94218-default-rtdb.firebaseio.com",
    projectId: "fila-de-atendimento-94218",
    storageBucket: "fila-de-atendimento-94218.firebasestorage.app",
    messagingSenderId: "556297277758",
    appId: "1:556297277758:web:a07d009367b5a85342dc6f",
    measurementId: "G-7CJPF52D8Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Usuário logado:', user);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Erro ao fazer login:', error);
            errorMessage.textContent = 'Email ou senha incorretos.';
        });
});