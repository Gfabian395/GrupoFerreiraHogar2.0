import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { getAuth, signInAnonymously } from "firebase/auth";

// 🔐 Iniciar sesión anónima al arrancar la app
const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    console.log("✅ Sesión anónima iniciada");
  })
  .catch((error) => {
    console.error("❌ Error en login anónimo:", error);
  });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
