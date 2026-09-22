import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Approutes from '../routes/appRoutes'
import { AuthProvider } from "../context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Approutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
