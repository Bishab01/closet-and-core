const apiURL = import.meta.env.VITE_API_URL;

export async function getOrders() {
    const response = await fetch(`${apiURL}getOrders.php`, {
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

    return data.orders;
}

export async function getOrderItems(oid) {
    const response = await fetch(`${apiURL}getOrderItems.php?oid=${oid}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to fetch order items.");
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to fetch order items.");
    }

    return data.items;
}