import { Mail, PhoneCall, MessageCircle } from "lucide-react";
import { Instagram } from "../assets/icons/instagram";

const apiURL = import.meta.env.VITE_API_URL;

const respectiveIcon = [
  {platform:"instagram", icon: Instagram},
  {platform:"phone", icon: PhoneCall},
  {platform:"whatsapp", icon: MessageCircle},
  {platform:"email", icon: Mail},
]

export async function saveContactDetails(formData) {
    const response = await fetch(`${apiURL}addContacts.php`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();
    return data;
}

export async function editContactDetails(formData) {
    const response = await fetch(`${apiURL}updateContacts.php`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();
    return data;
}

export async function getContacts() {
    const response = await fetch(`${apiURL}getContacts.php`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to fetch contact details.");
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to fetch contact details.");
    }

    return data.contacts.map(contact => {
      const match = respectiveIcon.find(item => item.platform === contact.platform);
      const icon = match ? match.icon : null;
      return { ...contact, icon };
    });
}

export async function deleteContact(id) {
    const response = await fetch(`${apiURL}deleteContact.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });

    const data = await response.json();
    return data;
}