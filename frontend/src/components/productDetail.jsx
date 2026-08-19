import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart, ChevronDown } from "lucide-react";
import products from "../data/productList";
import QuantitySelector from "./quantitySelector";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginRequest from "./loginRequest";

function ProductDetail({click}){ 
    const { loggedIn } = useAuth();
    const navigate = useNavigate();

    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    
    const [showLoginPrompt, setShowLoginPrompt] = useState(false)

    const handleAddtoCartClick = (e) => {
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

    return (
        <div className="popUp">

            {/* Content holder */}
            <div className="relative bg-white/90 rounded-3xl w-[90%] h-[82%] overflow-hidden">
                <div className="flex flex-col h-full"> 
                    
                    {/* Back button */}
                    <div className="absolute top-0 left-0 right-0 z-20 responsiveM mt-5!">
                        <button
                            className="bg-white/70 backdrop-blur-md border border-white/70 shadow-sm rounded-xl py-1 px-2
                            flex items-center gap-1.5 text-sm text-gray-600 font-medium hover:text-gray-800"
                            onClick={click}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back 
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start overflow-x-hidden overflow-y-auto mx-4 sm:mx-6 lg:mx-10 p-5 py-16 scrollbar-none">
                        {/* Product Image */}
                        <div className="w-65 lg:w-90 shrink-0 border-green-800 border-2 rounded-3xl overflow-hidden aspect-8/9">
                            <img
                                src={products[0].image}
                                alt={products[0].productName}
                                className="hover:scale-105 duration-400 object-cover h-full w-full"
                            />
                        </div>

                        {/* Product Description */}
                        <div className="flex-1 min-w-0">
                            <div className="border-2 border-green-800 rounded-3xl bg-[#F5E6A7]/10">

                                <div className="bg-[#FBF9F4] m-4 p-4 sm:p-6 border border-dashed border-green-900/50 rounded-xl">
                                    <p className="text-xs tracking-[0.2em] uppercase text-green-900 font-medium">
                                        {products[0].category}
                                    </p>

                                    <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mt-2">
                                        {products[0].productName}
                                    </h1>

                                    <p className="text-gray-700 leading-relaxed mt-5 text-sm sm:text-base">
                                        {products[0].description}
                                    </p>

                                    <hr className="my-5 border-green-900/15" />

                                    {/* Colour */}
                                    <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
                                        Color &mdash; <span className="normal-case text-gray-800">{products[0].colors[selectedColor].name}</span>
                                    </p>
                                    <div className="flex items-center gap-2.5 mb-5">
                                        {products[0].colors.map((color, i) => (
                                            <button
                                                key={color.name}
                                                onClick={() => setSelectedColor(i)}
                                                title={color.name}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 duration-150 ${
                                                    selectedColor === i ? "border-green-900" : "border-transparent"
                                                }`}
                                            >
                                                <span
                                                    className="w-6 h-6 rounded-full border border-black/20"
                                                    style={{ backgroundColor: color.hex }}
                                                >
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Size */}
                                    <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
                                        Size
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {products[0].sizes.map((size, i) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(i)}
                                                className={`categoryButton mr-0! text-sm ${
                                                    selectedSize === i
                                                        ? "bg-green-900 text-white"
                                                        : "border-gray-300 border-2 hover:border-gray-400 hover:bg-gray-100"
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>

                                    <p className="text-sm text-gray-700 mb-5 font-semibold">
                                        {products[0].stock} pieces currently in stock.
                                    </p>

                                    <hr className="my-5 border-green-900/15" />

                                    {/* Material */}
                                    <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-1.5">
                                        Material
                                    </p>
                                    <p className="text-sm text-gray-700 mb-5 ">
                                        {products[0].material}.
                                    </p>
                                    
                                    {/* Care */}
                                    <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-1.5">
                                        Care
                                    </p>
                                    <p className="text-sm text-gray-700 mb-5">
                                        {products[0].care}.
                                    </p>

                                    {/* Quantity + Add to Cart */}
                                    <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
                                        Quantity
                                    </p>
                                    <div className="flex items-start flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
                                        <QuantitySelector 
                                            px="3" 
                                            py="2"
                                            textSize="text-base"
                                        />

                                        <button
                                            onClick={handleAddtoCartClick}
                                            className="flex items-center justify-center gap-2 whitespace-nowrap
                                            px-3 py-2 bg-green-900 hover:bg-green-950 duration-200 text-white font-medium rounded-lg"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add to Cart
                                        </button>
                                        {showLoginPrompt &&
                                            <LoginRequest
                                                onConfirm={handleConfirmLogin}
                                                onCancel={handleCancel}
                                            />
                                        }
                                    </div>
                                
                
                                </div> 
                            </div>
                        </div>
                    </div>
                    
                    {/* Arrow pointing down */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                        <ChevronDown className="w-7 h-7 text-gray-700 animate-bounce" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;