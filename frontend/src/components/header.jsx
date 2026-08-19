import {Search, ShoppingCart,Menu} from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logos/logo.png'
import SideMenu from './sidemenu';
import { useAuth } from "../context/AuthContext";
import LoginRequest from './loginRequest';

function Header(){
    const { cartCount } = useCart();
    const { loggedIn, user } = useAuth();
    const isRetailer = user?.role === "retailer";
    
    const navigate = useNavigate();

    const [menuOpen,setMenuOpen] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const location = useLocation();

    const showSearch =
        location.pathname === "/home" ||
        location.pathname === "/products";

    const handleCartClick = (e) => {
        if(!loggedIn){
            e.preventDefault();
            setShowLoginPrompt(true);
        }
    }

    const handleConfirmLogin = () => {
        setShowLoginPrompt(false);
        navigate("/login");
    };

    const handleCancel = () => {
        setShowLoginPrompt(false);
    };

    return(
        <div className="flex flex-col border-b border-gray-200 shadow-xs h-fit">
            {!isRetailer &&(
                <div className='text-center py-2 text-xs sm:text-sm lg:text-base text-white bg-green-950'>
                    Discover a range of clothing selected for your everyday style
                </div>
            )}
            <div className='flex items-center justify-between py-4 px-4 sm:px-5.5 md:px-7 lg:px-8.5 xl:px-10 gap-2'>
                
                {/* Hamburger + Logo + Brand Name */}
                <div className='flex items-center'>
                    <button
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        className="p-1 rounded-md -ml-2 sm:-ml-3 lg:-ml-5 mr-1.5 sm:mr-2 lg:mr-3 hover:bg-gray-100"
                    >
                        <Menu className="size-4 md:size-5 text-green-950" />
                    </button>
                    
                    <div className="flex items-center gap-2.5">
                        <div className="size-8.5 md:size-10.5 lg:size-11.5 shrink-0 overflow-hidden rounded-full border border-green-950 ">
                            <img
                                src={logo}
                                alt="Closet & Core logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="font-bold text-sm md:text-lg whitespace-nowrap uppercase">
                            Closet & Core
                        </span>
                    </div>
                </div>

                {/* search + cart, grouped together on the right */}
                <div className='flex items-center gap-2 md:gap-3'>
                    {showSearch && 
                        <div className='border-black border rounded-lg text-sm md:text-[16px] flex items-center px-2 py-1 gap-2'>
                            <Search className='w-4 h-4'/>
                            <input 
                                type='text'
                                className='outline-none w-20 md:w-25 lg:w-35'
                                placeholder='Search...'
                            />
                        </div>
                    }

                    {!isRetailer && (
                        <NavLink
                            to="/cart"
                            onClick={handleCartClick}
                            className="relative text-green-950 text-lg"
                        >
                            <ShoppingCart className="size-5 md:size-5.5" />

                            {cartCount > 0 && (
                                <span
                                    className="absolute -right-2 -top-2 flex size-4.5
                                    items-center justify-center rounded-full
                                    bg-red-400 px-1 text-[9px] font-semibold text-white"
                                >
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>
                    )}
                </div>
            </div>

            {/* Sidebar menu */}
            <SideMenu 
                isOpen={menuOpen} 
                onClose={() => setMenuOpen(false)} 
            />

            {/* Pop up asking to login */}
            {showLoginPrompt && (
                <LoginRequest 
                    onConfirm={handleConfirmLogin} 
                    onCancel={handleCancel} 
                />
            )}
        </div>
    )
}

export default Header;