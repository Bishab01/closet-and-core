const apiURL = import.meta.env.VITE_API_URL;

export async function getDashboardStats() {
    const response = await fetch(`${apiURL}getDashboardStats.php`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard stats.");
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to fetch dashboard stats.");
    }

    return data.stats;
}
 
