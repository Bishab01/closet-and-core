import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import { useProductDetails } from "../data/useProductDetails";
import { ChevronDown, Check, X } from "lucide-react";
import BackButton from "./productDetails/backButton";
import ProductImage from "./productDetails/productImage";
import ProductInfoCard from "./productDetails/productInfoCard";
import ColorPicker from "./productDetails/colorPicker";
import SizePicker from "./productDetails/sizePicker";
import StockStatus from "./productDetails/stockStatus";
import AddToCart from "./productDetails/addToCart";
import { useState } from "react";
import { addCartItem } from "../api/cartOperations";

function ProductDetail({ product, click }) {
    const { loggedIn } = useAuth();
    const navigate = useNavigate();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("success"); // success or error
    const [qty, setQty] = useState(1);
    const [showMessage, setShowMessage] = useState(false);

    const {
        description,
        colors, 
        sizes, 
        selectedColor, 
        setSelectedColor,
        selectedSize, 
        setSelectedSize, 
        selectedVariant,
        hasVariants, 
        stock,
    } = useProductDetails(product.pid);

    const handleAddToCartClick = async(e) => {
        e.preventDefault();
        if (!loggedIn) {
            setShowLoginPrompt(true);
        }
        if (loggedIn) {
            try{
                const data = await addCartItem(selectedVariant.vid, qty);
    
                if (data.success) {
                    window.dispatchEvent(new Event("cart-updated"));
                    setMsg(data.message);
                    setMsgType("success");
                } else {
                    setMsg(data.message);
                    setMsgType("error");
                }
            }
            catch(error){
                console.error(error);
                setMsg("Failed to connect to the server.");
                setMsgType("error");
            }      
        }
        setShowMessage(prev=>!prev);
    };

    return (
    <div className="popUp">
        <div className="relative bg-white/90 rounded-3xl w-[90%] h-[82%] overflow-hidden">
            <div className="flex flex-col h-full">
                <BackButton onClick={click} />

                <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start overflow-x-hidden overflow-y-auto mx-4 sm:mx-6 lg:mx-10 p-5 py-16 scrollbar-none">
                    <ProductImage src={product.image} alt={product.pname} />

                    <div className="flex-1 min-w-0">
                        <div className="border-2 border-green-800 rounded-3xl bg-[#F5E6A7]/10">
                            <div className="bg-[#FBF9F4] m-4 p-4 sm:p-6 border border-dashed border-green-900/50 rounded-xl">
                                <ProductInfoCard 
                                    product={product} 
                                    description={description}
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
                                    qty={qty}
                                    setQty={setQty}
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
        
        {showMessage &&
            <div className="popUp">
                <div className="bg-white rounded-xl flex flex-col items-center space-y-2.5 justify-center w-80 p-5 font-sans">
                    <div className={`rounded-full text-white p-1.5
                        ${msgType === "success" ? "bg-green-600" : "bg-red-500"}`}>
                        {
                            msgType === "success" 
                            ? <Check className="size-7"/>
                            : <X className="size-7"/>
                        }
                    </div>
                    
                    <p
                        className={`font-medium text-lg text-center px-3 py-1.5 ${
                            msgType === "success" ? "text-green-600" : "text-red-500"
                        }`}
                    >
                        {msg}
                    </p>
                    <button
                        onClick={() => setShowMessage(prev => !prev)}
                        className="button border border-gray-400 text-gray-700 hover:bg-gray-100"
                    >
                        Close
                    </button>
                    
                </div>
            </div>
        }
    </div>
    );
}

export default ProductDetail;