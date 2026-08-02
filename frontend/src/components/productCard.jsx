import { ShoppingCart, Check, Eye, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

function ProductCard({id, category, productName, image, productPrice, click }){
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    // const handleAddToCart = (e) => {
    //     e.stopPropagation();
    //     addToCart({ id, category, productName, image, productPrice });
    //     setAdded(true);
    //     setTimeout(() => setAdded(false), 1200);
    // };

    return(
        <div 
            className="flex flex-col rounded-2xl border-gray-400 border bg-white/60
            overflow-hidden hover:shadow-xl shrink-0 group"
            onClick={click}
        >
            {/* Product Image */}
            <div className="aspect-8/9 overflow-hidden">
                <img 
                    src={image}
                    alt="image of the product" 
                    className="group-hover:scale-105 duration-400 object-cover h-full w-full"
                />
            </div>

            {/* Product Name & Category */}
            <div className="mx-3 my-4 font-serif ">
                <p className="text-gray-600 mb-1">{category}</p>
                <p className="text-[17.5px] line-clamp-3">
                    {productName}
                </p>
            </div>

            {/* Product Price */}
            <div className='mt-auto'>
                <hr className='border-gray-400 mx-3 border-dashed'></hr>
                <p className="mx-3 my-3 text-lg font-medium font-serif">
                    Rs {productPrice}
                </p>
            </div>
        </div>       
    )
}

export default ProductCard