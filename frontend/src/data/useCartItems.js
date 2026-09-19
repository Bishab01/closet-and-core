import { useState, useEffect } from "react";
import { getCartItems } from "../api/cartOperations";

export function useCartItems() {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        try {
            const response = await getCartItems();
            setCartItems(response);
        } 
        catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        window.addEventListener("cart-updated", fetchCartItems);
        return () => window.removeEventListener("cart-updated", fetchCartItems);
    }, []);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { cartItems, setCartItems, cartCount, fetchCartItems };
}