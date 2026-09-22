import { PackagePlus, ClipboardList } from "lucide-react";
import { useState, useEffect } from "react";
import { getDashboardStats } from "../api/dashboard";

export function useDashboardStats() {
    const [stats, setStats] = useState(null); // null until the numbers arrive (or if the request fails)

    useEffect(() => {
        let ignore = false; // don't update state if the page was closed meanwhile

        getDashboardStats()
            .then((data) => {
                if (!ignore) setStats(data);
            })
            .catch((error) => {
                console.error("Error fetching dashboard stats:", error);
            });

        return () => {
            ignore = true;
        };
    }, []);

    return { stats };
}
 

export const quickActions = [
    {title: "Manage Products", description: "Add new products, update prices and stock, or remove items from the storefront.", icon: PackagePlus, link: "/productsRetailer"},
    {title: "Manage Orders", description: "View and manage customer orders, update order status, and process returns.", icon: ClipboardList, link: "/orders"}
]

export const statusStyles = {
    pending: "bg-amber-100 text-amber-800",
    processing: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-gray-100 text-gray-500",
};

export const paymentStatusStyles = {
  paid: "bg-green-100 text-green-800",
  unpaid: "bg-red-100 text-red-600",
};