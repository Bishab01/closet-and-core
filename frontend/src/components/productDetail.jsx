import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, ChevronDown, Check } from "lucide-react";
import QuantitySelector from "./quantitySelector";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import LoginRequest from "./loginRequest";

const apiURL = import.meta.env.VITE_API_URL;

function ProductDetail({ pid, click }) {
    const { loggedIn } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [added, setAdded] = useState(false);

    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiURL}getStorefrontProduct.php?pid=${pid}`);
                const data = await response.json();
                if (data.success) {
                    setProduct({ ...data.product, image: `${apiURL}${data.product.image}` });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (pid) loadProduct();
    }, [pid]);

    const handleAddtoCartClick = () => {
        if (!loggedIn) {
            setShowLoginPrompt(true);
            return;
        }

        addToCart({
            id: product.id,
            category: product.category,
            productName: product.productName,
            image: product.image,
            productPrice: product.productPrice,
            color: product.colors[selectedColor]?.name ?? null,
            size: product.sizes[selectedSize] ?? null,
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

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

                    {loading || !product ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="size-8 rounded-full border-2 border-green-900 border-t-transparent animate-spin" />
                        </div>
                    ) : (
                        <>
                            {/* Scrollable Content */}
                            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start overflow-x-hidden overflow-y-auto mx-4 sm:mx-6 lg:mx-10 p-5 py-16 scrollbar-none">
                                {/* Product Image */}
                                <div className="w-65 lg:w-90 shrink-0 border-green-800 border-2 rounded-3xl overflow-hidden aspect-8/9">
                                    <img
                                        src={product.image}
                                        alt={product.productName}
                                        className="hover:scale-105 duration-400 object-cover h-full w-full"
                                    />
                                </div>

                                {/* Product Description */}
                                <div className="flex-1 min-w-0">
                                    <div className="border-2 border-green-800 rounded-3xl bg-[#F5E6A7]/10">

                                        <div className="bg-[#FBF9F4] m-4 p-4 sm:p-6 border border-dashed border-green-900/50 rounded-xl">
                                            <p className="text-xs tracking-[0.2em] uppercase text-green-900 font-medium">
                                                {product.category}
                                            </p>

                                            <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mt-2">
                                                {product.productName}
                                            </h1>

                                            {product.description && (
                                                <p className="text-gray-700 leading-relaxed mt-5 text-sm sm:text-base">
                                                    {product.description}
                                                </p>
                                            )}

                                            <hr className="my-5 border-green-900/15" />

                                            {/* Colour */}
                                            {product.colors.length > 0 && (
                                                <>
                                                    <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
                                                        Color &mdash; <span className="normal-case text-gray-800">{product.colors[selectedColor]?.name}</span>
                                                    </p>
                                                    <div className="flex items-center gap-2.5 mb-5">
                                                        {product.colors.map((color, i) => (
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
                                                </>
                                            )}

                                            {/* Size */}
                                            {product.sizes.length > 0 && (
                                                <>
                                                    <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
                                                        Size
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {product.sizes.map((size, i) => (
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
                                                </>
                                            )}

                                            <p className="text-sm text-gray-700 mb-5 font-semibold">
                                                {product.stock > 0 ? `${product.stock} pieces currently in stock.` : "Currently out of stock."}
                                            </p>

                                            <hr className="my-5 border-green-900/15" />

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
                                                    disabled={product.stock === 0}
                                                    className="flex items-center justify-center gap-2 whitespace-nowrap
                                                    px-3 py-2 bg-green-900 hover:bg-green-950 duration-200 text-white font-medium rounded-lg
                                                    disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                                                    {added ? "Added" : "Add to Cart"}
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
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;