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
        </>
    )
}        
export default SideMenu;