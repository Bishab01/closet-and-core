const apiURL = import.meta.env.VITE_API_URL;

export async function getCategories() {
    const response = await fetch(`${apiURL}getCategories.php`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to fetch categories.");
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to fetch categories.");
    }

    return data.categories;
}
