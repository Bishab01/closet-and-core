import { ShieldCheck, Package, Clock, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import Footer from "../../components/footer";
import { quickActions, statusStyles } from "../../data/dashboard";

function Dashboard() {

    const stats = [
        { label: "Total Products", value: "84", icon: Package, color: "text-green-800", bg: "bg-green-50" },
        { label: "Pending Orders", value: "12", icon: Clock, color: "text-amber-700", bg: "bg-amber-50" },
        { label: "Low Stock Items", value: "5", icon: AlertTriangle, color: "text-red-700", bg: "bg-red-50" },
        { label: "Completed Orders", value: "231", icon: CheckCircle, color: "text-emerald-700", bg: "bg-emerald-50" },
    ];

    const OrderStatus = "pending" | "processing" | "completed" | "cancelled";

    const recentOrders = [
        { id: "#ORD-1042", customer: "Margaret Osei", status: "pending", date: "Sep 12, 2026", amount: "$34.00" },
        { id: "#ORD-1041", customer: "Daniel Ferreira", status: "processing", date: "Sep 12, 2026", amount: "$89.50" },
        { id: "#ORD-1040", customer: "Aisha Kamara", status: "completed", date: "Sep 11, 2026", amount: "$120.00" },
        { id: "#ORD-1039", customer: "James Whitfield", status: "pending", date: "Sep 10, 2026", amount: "$47.25" },
        { id: "#ORD-1038", customer: "Priya Nair", status: "cancelled", date: "Sep 10, 2026", amount: "$62.00" },
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
                    <button className="text-xs text-green-800 font-medium flex items-center gap-0.5 hover:underline">
                        View all <ChevronRight className="size-3.5" />
                    </button>
                    </div>
                    <div className="divide-y divide-gray-50">
                    {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors duration-150">
                        <div className="flex items-center gap-4 min-w-0">
                            <span className="text-sm font-mono text-gray-400 shrink-0">{order.id}</span>
                            <span className="text-sm text-gray-800 truncate">{order.customer}</span>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 ml-4">
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[order.status]}`}>
                            {order.status}
                            </span>
                            <span className="text-xs text-gray-400 hidden sm:block">{order.date}</span>
                            <span className="text-sm font-medium text-gray-700">{order.amount}</span>
                        </div>
                        </div>
                    ))}
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