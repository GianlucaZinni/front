import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import '../commons/styles/App.css';
import GaleriaPartidos from "./galeriaPartidos/GaleriaPartidos";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={
              <Login 
                endpoint="https://tu-backend.com/api/login"
                onLoginSuccess={token => console.log("Logged in with token:", token)}
                onLoginFailure={error => console.error("Login failed:", error)}
              /> 
            }/>
            <Route path="/login" element={
              <Login 
                endpoint="https://tu-backend.com/api/login"
                onLoginSuccess={token => console.log("Logged in with token:", token)}
                onLoginFailure={error => console.error("Login failed:", error)}
              /> 
            }/>
            <Route path="/vote" element={
              <GaleriaPartidos 
                partidos={[
                  { id: 1, nombre: 'Milei', imagenUrl: '/images/milei.jpg' }, // Necesito acceder a milei.jpg que esta en la carpeta assets/images desde el componente App.tsx que esta en la carpeta src/pages
                  { id: 2, nombre: 'Bullrich', imagenUrl: '/images/bullrich.jpg' },
                  { id: 3, nombre: 'Larreta', imagenUrl: '/images/massa.jpg' },
                  // ... otros partidos
                ]}
                onVotar={partidoId => {
                  console.log(`Has votado por el partido con ID: ${partidoId}`);
                  // Aquí puedes manejar la lógica de votación, como enviar el voto a un servidor, etc.
                }}
              />
            }/>
          </Routes>
        </header>
      </div>
    </Router>
  )
}

export default App;
