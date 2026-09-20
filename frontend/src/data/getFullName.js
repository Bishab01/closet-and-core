import { useState, useEffect } from "react";
const apiURL = import.meta.env.VITE_API_URL;

export function getFname() {
    const [fullName, setFullName] = useState("");

    const fetchName = async () => {
       try {
            const response = await fetch(`${apiURL}getName.php`, {
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user.");
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || "Failed to fetch user.");
            }

            setFullName(`${data.fname} ${data.lname}`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchName();
    }, []);

    return fullName;
}