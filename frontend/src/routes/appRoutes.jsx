import '../styles/index.css';
import Login from '../auth/login';
import Signup from '../auth/signUp';
import App from '../core/App';
import Home from "../pages/home";
import Products from '../pages/products';
import Cart from '../pages/cart';
import Dashboard from '../pages/retailer/dashboard';
import { CustomerOnlyRoute, RetailerRoute } from './roleGuard';
import { Routes, Route, Navigate} from 'react-router-dom';

function Approutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      <Route path="/login" element={<Login/>}/>
      
      <Route path="/signUp" element={<Signup/>}/>

      <Route element={<App />}>
        {/* Open to all*/}
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}

        {/* Open to customers */}
        <Route path="/cart" element={<CustomerOnlyRoute><Cart /></CustomerOnlyRoute>} />

        {/* Open to retailer */}
        <Route path="/dashboard" element={<RetailerRoute><Dashboard /></RetailerRoute>} />
      </Route>
    </Routes>
  );
}

export default Approutes;
