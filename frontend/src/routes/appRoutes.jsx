import Login from "../auth/login";
import Signup from "../auth/signUp";
import Home from "../homepage/body/home";
import "../styling/index.css";
import App from "../core/App";
import Products from "../homepage/body/products";
import ProductDetail from "../homepage/body/productCard";
import About from "../homepage/body/about";
import Contact from "../homepage/body/contact";
import { Routes, Route, Navigate } from "react-router-dom";

function Approutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      {/* <Route path="/login" element={<Login/>}/>
          <Route path="/signUp" element={<Signup/>}/> */}
      <Route element={<App />}>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default Approutes;
