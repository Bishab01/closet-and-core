const apiURL = import.meta.env.VITE_API_URL;

export async function getOneProduct(pid) {
    const response = await fetch(`${apiURL}getOneProduct.php?pid=${pid}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to fetch product.");
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to fetch product.");
    }

    return data.product;
}
