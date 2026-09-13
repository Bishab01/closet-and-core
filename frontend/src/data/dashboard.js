import { PackagePlus, ClipboardList } from "lucide-react";

export const quickActions = [
    {title: "Manage Products", description: "Add new products, update prices and stock, or remove items from the storefront.", icon: PackagePlus, link: "/productsRetailer"},
    {title: "Manage Orders", description: "View and manage customer orders, update order status, and process returns.", icon: ClipboardList, link: "/ordersRetailer"}
]

export const statusStyles = {
    pending: "bg-amber-100 text-amber-800",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-gray-100 text-gray-500",
};