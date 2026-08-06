import { X } from "lucide-react";
import { NavLink } from "react-router-dom";


const CATEGORIES = ["ALL", "HEADWARE","FOOTWARE","CLOTHING"];

function SideMenu({ isOpen, onClose }) {
   return (
        <>
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />
)
}

export default SideMenu;