import {Search} from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';

function Header(){

    const navigations = [
        { name: "Home", path: "/home" },
        { name: "Products", path: "/products" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return(
        <div className="flex flex-col border-b-2 border-solid border-gray-200 h-fit">
            <div className='text-center py-2 text-[15px] text-white bg-green-950'>
                Free shipping for purchase over Rs 2000
            </div>
            <div className='flex items-center justify-between my-4 sm:px-8 lg:px-10 xl:px-15 gap-3'>
                {/* name of brand */}
                <div className="font-bold text-xl whitespace-nowrap">
                    Brand Name
                </div>

                {/* navigation */}
                <div className='flex items-center gap-2 overflow-x-auto scrollbar-none'>
                    {navigations.map((item) => (
                        <NavLink 
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `button1 ${
                                    isActive
                                        ? "bg-green-200 text-green-800"
                                        : "text-black hover:bg-gray-200"
                                }`
                            }
                        >
                        {item.name}
                        </NavLink>
                    ))}
                </div>

                {/* search */}
                <div className='border-black border-2 rounded-lg flex items-center px-2 py-1 gap-2'>
                    <Search className='w-4 h-4'/>
                    <input 
                        type='text'
                        className='outline-none'
                        placeholder='Search...'
                    />
                </div>
        </div>
        </div>
    )
}

export default Header