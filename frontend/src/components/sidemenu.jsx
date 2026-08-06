import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

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
            ></aside>



        </>
    );
}        
export default SideMenu;