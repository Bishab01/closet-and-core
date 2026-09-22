import { useState, useEffect } from "react";
import { getContacts } from "../api/contact";

export function useContacts() {
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        try {
            const response = await getContacts();
            setContacts(response);
        } 
        catch (error) {
            console.error("Error fetching contact details:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return { contacts , setContacts, fetchContacts};
}