import { ShieldCheck, PackagePlus, ClipboardList } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="body">
            <div className="responsiveM">
                <div className="flex items-center gap-2 mb-6">
                    <ShieldCheck className="w-6 h-6 text-green-800" />
                    <div>
                        <p className="text-xl sm:text-2xl font-serif font-bold">Retailer Dashboard</p>
                        <p className="text-gray-600 text-sm">
                            Welcome back{user?.email ? `, ${user.email}` : ""}.
                        </p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                    <NavLink
                        to="/dashboard/products"
                        className="flex flex-col gap-3 p-6 rounded-2xl border border-gray-300 bg-white/60
                        hover:shadow-lg hover:border-green-800 duration-200"
                    >
                        <PackagePlus className="size-8 text-green-800" />
                        <p className="text-lg font-serif font-bold">Manage Products</p>
                        <p className="text-gray-600 text-sm">
                            Add new products, update prices and stock, or remove items from the storefront.
                        </p>
                    </NavLink>

                    <div className="flex flex-col gap-3 p-6 rounded-2xl border border-dashed border-gray-300 bg-white/40 opacity-70">
                        <ClipboardList className="size-8 text-gray-400" />
                        <p className="text-lg font-serif font-bold text-gray-500">Orders</p>
                        <p className="text-gray-500 text-sm">Order management tools are coming soon.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;