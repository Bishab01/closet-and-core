// UPDATED: imported Eye and X icons for the new "View" button and modal close icon
import { ShoppingCart, Check, Eye, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

function Productcard({id, category, productName, image, productPrice }){
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    // UPDATED: new state to control the quick-view modal
    const [showView, setShowView] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart({ id, category, productName, image, productPrice });
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return(
        // UPDATED: wrapped in a fragment because we now render two siblings —
        // the card itself, and the quick-view modal below it
        <>
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

                {/* UPDATED: buttons now sit side by side in a flex row —
                    previously it was just a single "Add to Cart" button */}
                <div className="flex items-center gap-2">
                    {/* UPDATED: new "View" button, opens the quick-view modal */}
                    <button
                        onClick={() => setShowView(true)}
                        className="flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-sm sm:text-base font-medium border-2 border-green-900 text-green-900 hover:bg-green-50 duration-300"
                    >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                    </button>

                    <button
                        onClick={handleAddToCart}
                        className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 text-sm sm:text-base font-medium duration-300 ${
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
        </div>

        {/* UPDATED: entirely new block — quick-view modal, only rendered
            when showView is true. Shows a larger image + details + its own
            Add to Cart button, and closes on backdrop click or the X button */}
        {showView && (
            <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowView(false)}
            >
                <div
                    className="bg-white rounded-2xl overflow-hidden max-w-xl w-full flex flex-col sm:flex-row relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => setShowView(false)}
                        className="absolute top-3 right-3 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <img
                        src={image}
                        alt={productName}
                        className="w-full sm:w-1/2 h-64 sm:h-auto object-cover"
                    />
                    <div className="p-6 flex flex-col gap-2 font-serif flex-1">
                        <p className="text-sm text-gray-500">{category}</p>
                        <p className="text-xl font-semibold">{productName}</p>
                        <p className="text-lg font-medium">Rs {productPrice}</p>
                        <button
                            onClick={(e) => {
                                handleAddToCart(e);
                                setShowView(false);
                            }}
                            className="mt-4 flex items-center justify-center gap-2 rounded-xl py-2 font-medium bg-green-900 text-white hover:bg-green-800 duration-300"
                        >
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default Productcard