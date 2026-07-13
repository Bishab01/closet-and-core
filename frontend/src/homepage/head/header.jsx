import {Search} from 'lucide-react'
import { useState } from 'react'

function Header(){

    const [selected, setSelected] = useState("Home");

    const navigations = ["Home", "Products", "About Us", "Contact"];

    return(
        <div className="flex flex-col border-b-2 border-solid border-gray-200 h-fit w-full">
            <div className='text-center pt-4 pb-4 text-lg text-white bg-green-950'>
                This is header
            </div>
            <div className='flex items-center justify-between my-4 sm:px-8 lg:px-10 xl:px-15 gap-3'>
                {/* name of brand */}
                <div className="font-bold text-xl whitespace-nowrap">
                    Brand Name
                </div>

                {/* navigation */}
                <div className='flex items-center gap-2 overflow-x-auto scrollbar-none'>
                    {navigations.map((item) => (
                        <button 
                            key={item}
                            onClick={()=>setSelected(item)}
                            className={`button1
                                ${
                                    selected === item
                                    ? "bg-green-200 text-green-800"
                                    : "text-black hover:bg-gray-200"
                                }`}
                        >
                        {item}
                        </button>
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