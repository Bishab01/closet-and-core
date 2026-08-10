import { X, House, ShoppingBag, Info, Phone, ShieldCheck, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Setting from "./settings";

function SideMenu({ isOpen, onClose }) {
    const customerNav = [
        { icon: House, name: "Home", path: "/home" },
        { icon: ShoppingBag, name: "Products", path: "/products" },
        { icon: Info, name: "About Us", path: "/about" },
        { icon: Phone, name: "Contact", path: "/contact" },
    ];

    const retailerNav = [
        { icon: ShieldCheck, name: "Dashboard", path: "/dashboard" },
        ...customerNav,
    ];

    const { user, loggedIn } = useAuth();
    const isRetailer = user?.role === "retailer";
    const navigations =  isRetailer ? retailerNav : customerNav;
    const email = user?.email ? user.email : "guest@mail.com";
    const char = email[0];

    const [showSettings, setShowSettings] = useState(false);

    return (
        //Overlay
        <div
            onClick={() => (onClose(), setShowSettings(false))}
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-[60vw] min-w-65 max-w-80 bg-white z-50 shadow-2xl
                    transform transition-transform duration-300 ease-out overflow-y-auto overflow-x-hidden
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex flex-col items-start tracking-wide">
                        <p className="font-bold uppercase text-green-950">Closet & Core</p>
                        <p className="font-medium text-xs text-gray-400">Create your core</p>
                    </div>
                    <button
                            onClick={onClose}
                            aria-label="Close menu"
                            className="text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            <X size={20}/>
                    </button>
                </div>

                {/* Navigation */}
                <div className="px-5 pt-4">
                    <p className="text-xs font-semibold tracking-widest text-gray-400 mb-3">MENU</p>
                    <nav className="flex flex-col gap-2">
                        {navigations.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `px-4 py-3 flex items-center gap-2 rounded-lg text-md font-medium transition-colors ${
                                        isActive
                                            ? "bg-green-100 text-green-950 font-semibold"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >
                                <item.icon className="size-5"/>
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Identity */}
                <div 
                    onClick={(e)=>e.stopPropagation()}
                    className="sticky top-[90%] left-0 w-full flex items-center justify-between gap-1.5 p-5 border-t border-gray-100"
                >
                    <div className="flex items-center gap-1.5"> 
                        <div 
                            className={`flex items-center justify-center uppercase font-medium rounded-full size-9 text-white
                            ${
                                isRetailer
                                ? "bg-red-400"
                                : loggedIn
                                ? "bg-blue-950"
                                : "bg-gray-600"

                            }`}
                        >
                            {char}
                        </div>
                        <div className="text-gray-500 text-[14.5px] tracking-wide font-medium">
                            {email}
                        </div>
                    </div>
                    <button 
                        className="relative"
                        onClick={()=>setShowSettings(showSettings === false ? true : false)}
                    >
                        <Settings className="text-gray-700 size-5 hover:text-gray-950"/>
                    </button>
                    {showSettings &&
                        <Setting/>
                    }
                </div>
            </aside>
        </div>
    );
}        
export default SideMenu;