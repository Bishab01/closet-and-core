import { useState, useEffect } from "react";
import { getOrders } from "../api/orders";

export function useOrders() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            setOrders(response);
        } 
        catch (error) {
            console.error("Error fetching contact details:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { orders, setOrders, fetchOrders };
}