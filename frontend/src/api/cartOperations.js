const apiURL = import.meta.env.VITE_API_URL;

export async function addCartItem(vid, quantity) {
    const response = await fetch(`${apiURL}addCartItems.php`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ vid, quantity })
    });
 
    const data = await response.json();
    return data;
}

export async function getCartItems() {
    const response = await fetch(`${apiURL}getCartItems.php`, {
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

    return data.items.map((item) => ({
        ...item,
        image: `${apiURL}productImage.php?pid=${item.pid}`
    }));
}

export async function deleteCartItem(id) {
    const response = await fetch(`${apiURL}deleteCartItem.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });

    const data = await response.json();
    return data;
}

export async function updateCartItem(cid, quantity) {
    const response = await fetch(`${apiURL}updateCartItem.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cid, quantity })
    });

    return await response.json();
}

export async function placeOrder({ phone, address, paymentMethod, paymentStatus, status }) {
    const response = await fetch(`${apiURL}placeOrder.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contact_number: phone,
            delivery_address: address,
            payment_method: paymentMethod,
            payment_status: paymentStatus,
            status: status,
        })
    });

    return await response.json();
}