import { NavLink } from "react-router-dom";
import logo from "../assets/logos/logo2.png";
import { useAuth } from "../context/AuthContext";

function Footer() {
    const customerNav = [
        { name: "Home", path: "/home" },
        { name: "Products", path: "/products" }
    ];

    const retailerNav = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Products", path: "/productsRetailer" }
    ];
    const { user } = useAuth();
    const isRetailer = user?.role === "retailer";
    const quickLinks =  isRetailer ? retailerNav : customerNav;

    return (
        <footer className="bg-green-950 text-white mt-auto">
            <div className="responsiveM my-4! grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-10 py-10 sm:py-12">

                {/* Brand */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2.5">
                        <div className="size-8.5 shrink-0 overflow-hidden">
                            <img
                                src={logo}
                                alt="Closet & Core logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="font-bold text-base uppercase tracking-wide">
                            Closet & Core
                        </span>
                    </div>
                    <p className="text-sm text-green-100/80 leading-relaxed max-w-xs">
                        Create your core — everyday clothing selected for a simple,
                        effortless style.
                    </p>
                </div>

                {/* Shop */}
                <div className="flex flex-col gap-3 items-start sm:items-center">
                    <p className="text-xs font-semibold tracking-widest text-green-100/60 uppercase">
                        Shop
                    </p>
                    <nav className="flex flex-col gap-2 items-start sm:items-center">
                        {quickLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className="text-sm text-green-100/90 hover:text-white transition-colors w-fit"
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Get in touch */}
                <div className="flex flex-col gap-3 items-start sm:items-center">
                    <p className="text-xs font-semibold tracking-widest text-green-100/60 uppercase">
                        Get in Touch
                    </p>
                    <nav className="flex flex-col gap-2 items-start sm:items-center">
                        <NavLink
                            to="/contact"
                            className="text-sm text-green-100/90 hover:text-white transition-colors w-fit"
                        >
                            Contact Us
                        </NavLink>
                    </nav>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-3 items-start sm:items-center">
                    <p className="text-xs font-semibold tracking-widest text-green-100/60 uppercase">
                        Info
                    </p>
                    <nav className="flex flex-col gap-2 items-start sm:items-center">
                        <NavLink
                            to="/about"
                            className="text-sm text-green-100/90 hover:text-white transition-colors w-fit"
                        >
                            About Us
                        </NavLink>
                    </nav>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 flex justify-center items-center w-full">
                <div className="responsiveM my-0! py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-green-100/60 text-center sm:text-left w-full">
                    <p>© 2026 Closet & Core.</p>
                    <p>Designed for a simple, everyday shopping experience.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;