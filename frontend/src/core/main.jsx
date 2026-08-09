import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Approutes from '../routes/appRoutes'
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/authContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Approutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
