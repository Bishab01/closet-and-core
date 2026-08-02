import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Approutes from '../routes/appRoutes'
import { CartProvider } from "../context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Approutes />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
