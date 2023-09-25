import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login 
              endpoint="https://tu-backend.com/api/login"
              onLoginSuccess={token => console.log("Logged in with token:", token)}
              onLoginFailure={error => console.error("Login failed:", error)}
            />} />
            <Route path="/login" element={<Login 
              endpoint="https://tu-backend.com/api/login"
              onLoginSuccess={token => console.log("Logged in with token:", token)}
              onLoginFailure={error => console.error("Login failed:", error)}
            />} />
          </Routes>
        </header>
      </div>
    </Router>
  )
}

export default App;
