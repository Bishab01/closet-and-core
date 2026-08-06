import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

 const CATEGORIES =["ALL", "Headware","Footware","Clothing"]

function SideMenu({ isOpen, onClose }) {
    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />
       {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl
                    transform transition-transform duration-300 ease-out overflow-y-auto
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                            <span className="font-bold uppercase text-green-950">Closet & Core</span>
                    </div>
                    <button
                            onClick={onClose}
                            aria-label="Close menu"
                            className="text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            <X size={22} />
                    </button>
                </div>

                   {/* Auth buttons */}
                <div className="flex gap-3 p-5">
                    <NavLink
                        to="/login"
                        onClick={onClose}
                        className="flex-1 text-center border border-gray-300 rounded-lg py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/signup"
                        onClick={onClose}
                        className="flex-1 text-center bg-green-950 rounded-lg py-2 text-sm font-medium text-white hover:bg-green-800 transition-colors"
                    >
                        Sign Up
                    </NavLink>
                </div>

                {/* Categories */}
                <div className="px-5 pt-2">
                    <p className="text-xs font-semibold tracking-wide text-gray-400 mb-2">CATEGORIES</p>
                    <nav className="flex flex-col">
                        {CATEGORIES.map((cat) => (
                            <NavLink
                                key={cat}
                                to={`/products?category=${cat.toLowerCase()}`}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-lg text-sm transition-colors ${
                                        isActive
                                            ? "bg-green-100 text-green-950 font-medium"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                            >
                                {cat}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </aside>

            

        </>
    );
}        
export default SideMenu;