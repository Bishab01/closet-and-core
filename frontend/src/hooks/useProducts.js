import { useState, useEffect } from "react";
import { getProducts } from "../data/productsApi";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load products.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error };
}