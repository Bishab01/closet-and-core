import { useState } from "react";
import Footer from "../components/footer";
import { statusStyles, paymentStatusStyles} from "../data/dashboard";
import { useOrders } from "../data/useOrders";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import OrderDetail from "../components/orderDetails";

function Orders(){
    const { orders } = useOrders();
    const {user, loggedIn} = useAuth();
    const [showOrderDetails, setShowOrderDetails] = useState(null);

    const orderCode = (oid) => {
        const scrambled = (oid * 40503) % 65536; // odd multiplier => every id gets a different value
        return scrambled.toString(16).toUpperCase().padStart(4, "0");
    }

    const handleClick = (order) => {
        if(!loggedIn){
          return;  
        }
        setShowOrderDetails(order);
    }

    const isRetailer = user?.role === "retailer";

    // show the selected order on its own instead of below the list
    if (showOrderDetails) {
        return (
            <OrderDetail
                order={showOrderDetails}
                onBack={() => setShowOrderDetails(null)}
            />
        );
    }

    if (orders.length === 0) {
        return (
        <div className="body">
            <div className="responsiveM">
            <div
                className="flex flex-col items-center justify-center text-center p-20 gap-4
                    border border-dashed bg-white/60 rounded-3xl"
            >
                <Search className="w-14 h-14 text-gray-400" />
                <p className="text-xl sm:text-2xl font-serif font-bold">
                Order not found
                </p>
               
                {!isRetailer ?
                    <p className="text-gray-600">
                        Browse our products and find something you’ll love.
                    </p>:
                    <p className="text-gray-600">
                        No orders have been placed yet.
                    </p>
                }
                
                <NavLink
                to="/products"
                className="button bg-green-800 text-white px-6 hover:bg-green-900"
                >
                Browse Products
                </NavLink>
            </div>
            </div>
        </div>
        );
    }

    return(
        <div className="body flex flex-col">
            <div className="flex-1">
            <div className="responsiveM">
                <p className="text-xl md:text-2xl font-serif font-bold">Orders</p>
                <p className="text-sm text-gray-600">View and Manage all your orders.</p>
            </div>

            {/* Orders */}
            <div className="responsiveM bg-white rounded-2xl border border-gray-200 mb-8 overflow-hidden">
                <div className="px-3 sm:px-4 md:px-6 py-4 border-b border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm">Order Details</p>
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
                        {orders.map((order) => (
                            <tr
                                key={order.oid}
                                onClick={()=>handleClick(order)}
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
            </div>

            <Footer/>
        </div>
    )
}

export default Orders;
 
