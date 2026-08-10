import { X, House, ShoppingBag, Info, Phone, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router-dom";

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

function SideMenu({ isOpen, onClose }) {
    return (
        //Overlay
        <div
            onClick={onClose}
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-[60vw] min-w-65 max-w-80 bg-white z-50 shadow-2xl
                    transform transition-transform duration-300 ease-out overflow-y-auto
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
            </aside>
        </div>
    );
}        
export default SideMenu;