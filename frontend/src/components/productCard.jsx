

// ==========================================================
//   - Added `id` prop (required so the cart can track this item)
//   - Added "Add to Cart" button wired to useCart().addToCart
//   - Added a temporary "Added ✓" confirmation state after click
// ==========================================================
import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

function Productcard({id, category, productName, image, productPrice }){
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    // NEW: adds this product to the cart and briefly shows confirmation
    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart({ id, category, productName, image, productPrice });
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return(
        <div className="flex flex-col rounded-2xl duration-400 border-gray-300 border-2 overflow-hidden hover:shadow-xl w-[45%] sm:w-[30%] lg:w-[23%] xl:w-[18%] h-90 sm:h-100 lg:h-110">
            <div className="h-[55%] sm:h-[60%]">
                <img 
                    src={image}
                    alt="image of the product" 
                    className="hover:scale-105 duration-400 object-fill h-full w-full"
                />
            </div>
            <div className="px-3 py-4 border-gray-300 border-b-2 font-serif ">
                <p className="text-sm sm:text-base text-gray-600 ">{category}</p>
                <p className="text-base sm:text-lg whitespace-nowrap overflow-y-auto scrollbar-none">
                    {productName}
                </p>
            </div>
            <div className="p-3 flex flex-col gap-2 flex-1 justify-between">
                <p className="text-base sm:text-lg font-medium font-serif">Rs {productPrice}</p>
                {/* NEW: Add to Cart button */}
                <button
                    onClick={handleAddToCart}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2 text-sm sm:text-base font-medium duration-300 ${
                        added
                            ? 'bg-green-100 text-green-800'
                            : 'bg-green-900 text-white hover:bg-green-800'
                    }`}
                >
                    {added ? (
                        <>
                            <Check className="w-4 h-4" /> Added
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default Productcard