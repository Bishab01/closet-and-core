import {Search, ShoppingCart} from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logos/logo.png'


function Header(){
    const { cartCount } = useCart();

    const navigations = [
        { name: "Home", path: "/home" },
        { name: "Products", path: "/products" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return(
        <div className="flex flex-col border-b border-gray-200 shadow-xs h-fit">
            <div className='text-center py-2 text-xs sm:text-sm lg:text-base text-white bg-green-950'>
                Free shipping for purchase over Rs 2000
            </div>
            <div className='flex items-center justify-between py-4 px-4 sm:px-5.5 md:px-7 lg:px-8.5 xl:px-10 gap-2'>
                {/* Logo + Brand Name */}
                <div className="flex items-center gap-2.5">
                    <div className="size-10 md:size-12 shrink-0 overflow-hidden rounded-full border border-green-950 ">
                        <img
                            src={logo}
                            alt="Closet & Core logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="font-bold text-base sm:text-lg lg:text-xl whitespace-nowrap uppercase">
                        Closet & Core
                    </span>
                </div>

                {/* navigation */}
                <div className='flex items-center gap-2 overflow-x-auto scrollbar-none px-4'>
                    {navigations.map((item) => (
                        <NavLink 
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `navButton ${
                                    isActive
                                        ? "bg-green-200 text-green-800"
                                        : "text-black hover:bg-gray-200"
                                }`
                            }
                        >
                        {item.name}
                        </NavLink>
                    ))}

                    {/* cart, grouped with the rest of the nav links */}
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            `flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base font-medium whitespace-nowrap duration-200 ${
                                isActive
                                    ? "bg-green-700 text-white"
                                    : "bg-green-900 text-white hover:bg-green-800"
                            }`
                        }
                    >
                        <ShoppingCart className='w-4 h-4'/>
                        <span>Cart ({cartCount})</span>
                    </NavLink>
                </div>

                {/* search */}
                <div className='border-black border-2 rounded-lg flex items-center px-2 py-1 gap-2'>
                    <Search className='w-4 h-4'/>
                    <input 
                        type='text'
                        className='outline-none w-20 sm:w-40 lg:w-50'
                        placeholder='Search...'
                    />
                </div>
            </div>
        </div>
    )
}

export default Header