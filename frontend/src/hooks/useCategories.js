import { useState, useEffect } from "react";
import { getCategories } from "../api/categoriesApi";

export function useCategories() {
    const apiURL = import.meta.env.VITE_API_URL;

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response);
        } 
        catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, setCategories, fetchCategories };
}