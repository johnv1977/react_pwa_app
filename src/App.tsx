import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./app/auth/stores/useAuthStore";
import HomePage from "./common/pages/HomePage";
import "./config/styles/App.css";

function App() {
  const initializeAuth = useAuthStore((state) => state.loadUserFromStorage);

  useEffect(() => {
    // Inicializar autenticación al montar la app
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Aquí se añadirán más rutas en el futuro */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
