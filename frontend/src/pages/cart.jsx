import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Minus, Plus, Check, X} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCartItems } from "../data/useCartItems";
import { deleteCartItem, updateCartItem } from "../api/cartOperations";
import { useState } from "react";

function Cart() {
    const {cartItems, fetchCartItems} = useCartItems();
    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [confirmation, setConfirmation] = useState("");
    const [ctype, setCType] = useState("success");
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    const handleRemove = async(id) => {
        if (!deleteTarget) return;
        setConfirmation("");
        setDeleting(true);

        try
        {
            const data = await deleteCartItem(id);
    
            if(data.success){
                setCType("success");
                setConfirmation(data.message);
                fetchCartItems();
                window.dispatchEvent(new Event("cart-updated"));
            }
            else{
                setCType("error");
                setConfirmation(data.message);
            }
        } catch(error){
            console.error(error);
            setCType("error");
            setConfirmation(error.message);
        } finally{
            setDeleting(false);
            setDeleteTarget(null);
        }
    }

    const increaseQty = async (cid) => {
        const item = cartItems.find((i) => i.cid === cid);
        if (!item) return;
        await updateCartItem(cid, item.quantity + 1);
        await fetchCartItems();
        window.dispatchEvent(new Event("cart-updated"));
    };

    const decreaseQty = async (cid) => {
        const item = cartItems.find((i) => i.cid === cid);
        if (!item) return;
        if (item.quantity <= 1) return;
        await updateCartItem(cid, item.quantity - 1);
        await fetchCartItems();
        window.dispatchEvent(new Event("cart-updated"));
    };

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

            {cartItems.length === 0 ?
            (
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
            ) :
            (<>
            <h1 className="text-2xl font-serif font-bold text-center -mt-3 mb-6 md:hidden">Cart Items</h1>

            <div className="responsiveM">
                {/* Cart item list */}
                <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                        //Item card
                        <div
                            key={item.cid}
                            className="border border-gray-300 shadow-sm rounded-2xl py-5 px-6 flex bg-white/60 gap-3"
                        >
                            {/* Product image */}
                            <div className="size-30 rounded-lg border border-gray-200 shrink-0 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.pname}
                                    className="size-full object-cover "
                                />
                            </div>
                            
                            {/* Product details */}
                            <div className="flex-1 flex flex-col gap-1 min-w-0">
                                <p className="font-medium leading-tight truncate">
                                    {item.pname}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {item.category}
                                </p>
                                <p className="text-sm">
                                    Rs {item.price}
                                </p>

                                <div className="md:flex md:flex-rows md:items-center md:gap-2.5">
                                    {/* Selected Color */}
                                    <div className="flex items-center gap-2 mb-2 md:mb-0">
                                        <p className="text-sm text-gray-500">
                                            Color:
                                        </p>
                                        <div 
                                            className="w-7 h-5 rounded-sm border border-gray-300"
                                            style={{backgroundColor: item.colorHex}}    
                                        >
                                        </div>
                                        <span className="text-sm text-gray-500 line-clamp-1">{item.color}</span>
                                    </div>

                                    {/* Selected Size */}
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-500">
                                            Size:
                                        </p>
                                        <div className="flex items-center justify-center px-3 py-0.5 border border-gray-300 rounded-lg text-sm ">
                                            {item.size || "One Size"}
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity selector */}
                                <div className="flex items-center gap-2 mt-1.5">
                                    <p className="text-sm text-gray-500">
                                        Quantity:
                                    </p>
                                    <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                                        <button
                                            onClick={()=>decreaseQty(item.cid)}
                                            className="px-2 py-1"
                                            title="Decrease quantity"
                                        >
                                            <Minus className="size-3.5" />
                                        </button>
                                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                        <button
                                            onClick={()=>increaseQty(item.cid)}
                                            className="px-2 py-1"
                                            title="Increase quantity"
                                        >
                                            <Plus className="size-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Subtotal + Remove button */}
                                <div className="flex items-center justify-between mt-1.5">
                                    <p className="font-medium text-[15px]">
                                        Subtotal:{<br className="md:hidden"/>} Rs {(item.quantity * item.price).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => setDeleteTarget(item)}
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
                            Rs {cartTotal.toFixed(2)}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/checkout")}
                        className="flex items-center justify-center gap-2 bg-green-900 text-white rounded-xl px-6 py-3 font-medium hover:bg-green-800 duration-200"
                    >
                        Checkout
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
            </>)}

            {/* Delete confirmation */}
            {deleteTarget && (
            <div className="popUp">
                <div className="bg-white rounded-xl flex flex-col items-center justify-center w-80 p-5 font-sans">
                    <h1 className="font-medium text-lg mb-3 text-gray-800">Delete Item from Cart?</h1>
                    <p className="text-sm text-gray-600 text-center mb-5">
                        "{deleteTarget.pname}" will be completely removed from the cart. 
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setDeleteTarget(null)}
                            disabled={deleting}
                            className="button border border-gray-400 text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={()=>handleRemove(deleteTarget.cid)}
                            disabled={deleting}
                            className="button bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
            )}

            {confirmation &&
            <div className="popUp">
                <div className="bg-white rounded-xl flex flex-col items-center space-y-2.5 justify-center w-80 p-5 font-sans">
                    <div className={`rounded-full text-white p-1.5
                        ${ctype === "success" ? "bg-green-600" : "bg-red-500"}`}>
                        {
                            ctype === "success" 
                            ? <Check className="size-7"/>
                            : <X className="size-7"/>
                        }
                    </div>
                    
                    <p
                        className={`font-medium text-lg text-center px-3 py-1.5 ${
                            ctype === "success" ? "text-green-600" : "text-red-500"
                        }`}
                    >
                        {confirmation}
                    </p>
                    <button
                        onClick={() => setConfirmation("")}
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

export default Cart;