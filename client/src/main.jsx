import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { HealthProvider } from "./context/HealthContext.jsx";
import "./index.css"; // TailwindCSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HealthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HealthProvider>
    </AuthProvider>
  </React.StrictMode>
);
