import { ShieldCheck, Package, Clock, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import Footer from "../../components/footer";
import { quickActions, statusStyles, paymentStatusStyles } from "../../data/dashboard";
import { useOrders } from "../../data/useOrders";
import { useDashboardStats } from "../../data/dashboard";

function Dashboard() {

    const { orders } = useOrders();
    const {stats: counts} = useDashboardStats();
    const orderCode = (oid) => {
        const scrambled = (oid * 40503) % 65536; // odd multiplier => every id gets a different value
        return scrambled.toString(16).toUpperCase().padStart(4, "0");
    }

    const count = (key) => (counts ? counts[key] : "-");

    const stats = [
        { label: "Total Products", value: count("totalProducts"), icon: Package, color: "text-green-800", bg: "bg-green-50" },
        { label: "Pending Orders", value: count("pendingOrders"), icon: Clock, color: "text-amber-700", bg: "bg-amber-50" },
        { label: "Low Stock Items (stock <=5)", value: count("lowStockItems"), icon: AlertTriangle, color: "text-red-700", bg: "bg-red-50" },
        { label: "Completed Orders", value: count("completedOrders"), icon: CheckCircle, color: "text-emerald-700", bg: "bg-emerald-50" },
    ];

    return (
        <div className="body flex flex-col">
            <div className="responsiveM flex-1">

                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                    <ShieldCheck className="size-8 text-green-800 shrink-0" />
                    <div>
                        <p className="text-xl sm:text-2xl font-serif font-bold">Retailer Dashboard</p>
                        <p className="text-gray-600 text-sm">
                            Welcome back
                        </p>
                    </div>
                </div>

                {/* Stat tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {stats.map((s) => (
                    <div 
                        key={s.label} 
                        className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-2"
                    >
                        <div className={`${s.bg} rounded-xl p-2 w-fit`}>
                        <s.icon className={`size-5 ${s.color}`} />
                        </div>
                        <p className="text-2xl font-semibold text-gray-900">{s.value}</p>
                        <p className="text-xs text-gray-500 leading-tight">{s.label}</p>
                    </div>
                    ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl border border-gray-200 mb-8 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm">Recent Orders</p>
                    <NavLink to="/orders" className="text-xs text-green-800 font-medium flex items-center gap-0.5 hover:underline">
                        View all <ChevronRight className="size-3.5" />
                    </NavLink>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-gray-600 font-medium text-sm whitespace-nowrap">
                                        Order ID
                                    </th>
                                    <th className="hidden sm:table-cell px-3 sm:px-4 md:px-6 py-3 text-left text-gray-600 font-medium text-sm whitespace-nowrap">
                                        Contact
                                    </th>
                                    <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-gray-600 font-medium text-sm whitespace-nowrap">
                                        Status
                                    </th>
                                    <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-gray-600 font-medium text-sm whitespace-nowrap turncate">
                                        Paid/Unpaid
                                    </th>
                                    <th className="hidden sm:table-cell px-3 sm:px-4 md:px-6 py-3 text-left text-gray-600 font-medium text-sm whitespace-nowrap">
                                        Date
                                    </th>
                                    <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-gray-600 font-medium text-sm whitespace-nowrap">
                                        Total
                                    </th>
                                </tr>
                            </thead>
    
                            <tbody>
                            {orders.slice(0,8).map((order) => (
                                <tr
                                    key={order.oid}
                                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                                >
                                    <td className="px-3 sm:px-4 md:px-6 py-3 text-gray-600 text-sm whitespace-nowrap">
                                        <span className="block font-mono">ORD_{orderCode(order.oid)}</span>
                                        {/* phones have no room for a Contact column, so the number sits under the id */}
                                        <span className="block sm:hidden text-xs text-gray-500">{order.contact_number}</span>
                                    </td>
                                    <td className="hidden sm:table-cell px-3 sm:px-4 md:px-6 py-3 text-gray-600 text-sm whitespace-nowrap">
                                        {order.contact_number}
                                    </td>
                                    <td className="px-3 sm:px-4 md:px-6 py-3 text-sm whitespace-nowrap">
                                        <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[order.status] || "bg-gray-100 text-gray-700"}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-4 md:px-6 py-3 text-sm whitespace-nowrap">
                                        <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${paymentStatusStyles[order.payment_status] || "bg-gray-100 text-gray-700"}`}>
                                            {order.payment_status}
                                        </span>
                                    </td>
                                    <td className="hidden sm:table-cell px-3 sm:px-4 md:px-6 py-3 text-gray-600 text-sm whitespace-nowrap">
                                        {order.created_at.slice(0, 10)}
                                    </td>
                                    <td className="px-3 sm:px-4 md:px-6 py-3 text-gray-600 text-sm whitespace-nowrap">
                                        Rs {order.total}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Access */}
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Quick Access</p>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                    {quickActions.map((action) => (
                        <NavLink
                            key={action.title}
                            to={action.link}
                            className="flex flex-col gap-3 p-6 rounded-2xl border border-gray-300 bg-white/60
                            hover:shadow-lg hover:border-green-800 duration-200"
                        >
                            <action.icon className="size-8 text-green-800" />
                            <p className="text-lg font-serif font-bold">{action.title}</p>
                            <p className="text-gray-600 text-sm">
                                {action.description}
                            </p>
                        </NavLink>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default Dashboard;