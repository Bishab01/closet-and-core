import { useState, useEffect } from "react";
import { getOrderItems } from "../api/orders";

export function useOrderItems(oid) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let ignore = false; // don't update state if the order changed or the page was closed meanwhile

        getOrderItems(oid)
            .then((data) => {
                if (!ignore) setItems(data);
            })
            .catch((err) => {
                console.error("Error fetching order items:", err);
                if (!ignore) console.error(err.message || "Failed to fetch order items.");
            });

        return () => {
            ignore = true;
        };
    }, [oid]);

    return { items };
}
 
