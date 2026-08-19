import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Minus, Plus, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import cartItems from "../data/cartItems";
import QuantitySelector from "../components/quantitySelector";

function Cart() {
    // const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();
    const [qty, setQty] = useState(1);

    // Message for when cart is empty
    if (cartItems.length === 0) {
        return (
            <div className="body">
                <div className="responsiveM">
                    <div 
                        className="flex flex-col items-center justify-center text-center p-20 gap-4
                        border border-dashed bg-white/60 rounded-3xl"
                    >
                        <ShoppingBag className="w-14 h-14 text-gray-400" />
                        <p className="text-xl sm:text-2xl font-serif font-bold">
                            The cart is empty
                        </p>
                        <p className="text-gray-600">
                            Looks like you haven't added anything yet.
                        </p>
                        <NavLink
                            to="/products"
                            className="button bg-green-800 text-white px-6 hover:bg-green-900"
                        >
                            Browse Products
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="body">
            <div className="responsiveM my-6! md:my-8! flex items-center relative">
                {/* Back to products */}
                <NavLink 
                    to="/products"
                    className="flex text-xs sm:text-sm items-center text-gray-700 hover:text-gray-900 gap-1"
                >
                    <ArrowLeft className="w-4 h-4"/>
                    Continue Shopping
                </NavLink>
                <h1 className="hidden md:block md:absolute md:left-1/2 md:-translate-x-1/2 text-2xl font-serif font-bold">Cart Items</h1>
            </div>

            <h1 className="text-2xl font-serif font-bold text-center -mt-3 mb-6 md:hidden">Cart Items</h1>

            <div className="responsiveM">
                {/* Cart item list */}
                <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                        //Item card
                        <div
                            key={item.id}
                            className="border border-gray-300 shadow-sm rounded-2xl py-5 px-6 flex bg-white/60 gap-3"
                        >
                            {/* Product image */}
                            <div className="size-30 rounded-lg border border-gray-200 shrink-0 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.productName}
                                    className="size-full object-cover "
                                />
                            </div>
                            
                            {/* Product details */}
                            <div className="flex-1 flex flex-col gap-1 min-w-0">
                                <p className="font-medium leading-tight truncate">
                                    {item.productName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {item.category}
                                </p>
                                <p className="text-sm">
                                    Rs {item.productPrice}
                                </p>

                                <div className="md:flex md:flex-rows md:items-center md:gap-2.5">
                                    {/* Selected Color */}
                                    <div className="flex items-center gap-2 mb-2 md:mb-0">
                                        <p className="text-sm text-gray-500">
                                            Color:
                                        </p>
                                        <div 
                                            className="w-7 h-5 rounded-sm border border-gray-300"
                                            style={{backgroundColor: item.color.hex}}    
                                        >
                                        </div>
                                        <span className="text-sm text-gray-500 line-clamp-1">{item.color.name}</span>
                                    </div>

                                    {/* Selected Size */}
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-500">
                                            Size:
                                        </p>
                                        <div className="flex items-center justify-center px-3 py-0.5 border border-gray-300 rounded-lg text-sm ">
                                            {item.size.name}
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity selector */}
                                <div className="flex items-center gap-2 mt-1.5">
                                    <p className="text-sm text-gray-500">
                                        Quantity:
                                    </p>
                                    <QuantitySelector 
                                        px="2" 
                                        py="1"
                                    />
                                </div>

                                {/* Subtotal + Remove button */}
                                <div className="flex items-center justify-between mt-1.5">
                                    <p className="font-medium text-[15px]">
                                        Subtotal:{<br className="md:hidden"/>} Rs 80.00
                                    </p>
                                    <button
                                        // onClick={() => removeFromCart(item.id)}
                                        className="flex items-center gap-1 text-red-600 text-sm font-medium"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order total */}
            <div className="responsiveM">
                <div 
                    className="border border-gray-300 shadow-sm bg-white/60 rounded-2xl px-6 py-5 flex flex-col 
                    sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                    <div className="leading-6 md:leading-8">
                        <p className="text-gray-600 font-medium">Order total</p>
                        <p className="text-2xl font-bold">
                            Rs 1300.00
                        </p>
                    </div>
                    <button
                        // onClick={() => navigate("/checkout")}
                        className="flex items-center justify-center gap-2 bg-green-900 text-white rounded-xl px-6 py-3 font-medium hover:bg-green-800 duration-200"
                    >
                        Checkout
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;