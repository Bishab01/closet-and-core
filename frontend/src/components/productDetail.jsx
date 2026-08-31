import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import { useProductVariants } from "../hooks/useProductVariants";
import { ChevronDown } from "lucide-react";
import BackButton from "./productDetails/backButton";
import ProductImage from "./productDetails/productImage";
import ProductInfoCard from "./productDetails/productInfoCard";
import ColorPicker from "./productDetails/colorPicker";
import SizePicker from "./productDetails/sizePicker";
import StockStatus from "./productDetails/stockStatus";
import AddToCart from "./productDetails/addToCart";
import { useState } from "react";

function ProductDetail({ product, click }) {
    const { loggedIn } = useAuth();
    const navigate = useNavigate();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const {
        colors, 
        sizes, 
        selectedColor, 
        setSelectedColor,
        selectedSize, 
        setSelectedSize, 
        selectedVariant,
        hasVariants, 
        stock,
    } = useProductVariants(product);

    const handleAddToCartClick = (e) => {
    if (!loggedIn) {
        e.preventDefault();
        setShowLoginPrompt(true);
    }
    };

    return (
    <div className="popUp">
        <div className="relative bg-white/90 rounded-3xl w-[90%] h-[82%] overflow-hidden">
            <div className="flex flex-col h-full">
                <BackButton onClick={click} />

                <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start overflow-x-hidden overflow-y-auto mx-4 sm:mx-6 lg:mx-10 p-5 py-16 scrollbar-none">
                    <ProductImage src={product.image} alt={product.productName} />

                    <div className="flex-1 min-w-0">
                        <div className="border-2 border-green-800 rounded-3xl bg-[#F5E6A7]/10">
                            <div className="bg-[#FBF9F4] m-4 p-4 sm:p-6 border border-dashed border-green-900/50 rounded-xl">
                                <ProductInfoCard 
                                    product={product} 
                                />
                                <hr className="my-5 border-green-900/15" />
                                <ColorPicker 
                                    colors={colors} 
                                    selectedColor={selectedColor} 
                                    onChange={setSelectedColor} 
                                />
                                <SizePicker 
                                    sizes={sizes} 
                                    selectedSize={selectedSize} 
                                    onChange={setSelectedSize} 
                                />
                                <StockStatus 
                                    hasVariants={hasVariants} 
                                    selectedVariant={selectedVariant} 
                                    stock={stock} 
                                />
                                <hr className="my-5 border-green-900/15" />
                                <AddToCart
                                    disabled={hasVariants && (!selectedVariant || stock <= 0)}
                                    onAddToCart={handleAddToCartClick}
                                    showLoginPrompt={showLoginPrompt}
                                    onConfirmLogin={() => { setShowLoginPrompt(false); navigate("/login"); }}
                                    onCancelLogin={() => setShowLoginPrompt(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <ChevronDown 
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none 
                    w-7 h-7 text-gray-700 animate-bounce" 
                />
            </div>
        </div>
    </div>
    );
}

export default ProductDetail;