const apiURL = import.meta.env.VITE_API_URL;

export async function getProducts() {
    const response = await fetch(`${apiURL}getProducts.php`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to fetch products.");
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to fetch products.");
    }

    return data.products.map(product => ({
        ...product,
        image: `${apiURL}productImage.php?pid=${product.pid}`
    }));
}

export async function deleteProduct(pid) {
    const response = await fetch(`${apiURL}deleteProduct.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid })
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to delete product.");
    }

    return true;
}
