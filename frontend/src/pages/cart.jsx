import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="body">
                <div className="responsiveM flex flex-col items-center justify-center text-center py-20 gap-4">
                    <ShoppingBag className="w-14 h-14 text-gray-400" />
                    <p className="text-xl sm:text-2xl font-serif font-bold">
                        Your cart is empty
                    </p>
                    <p className="text-gray-600">
                        Looks like you haven&apos;t added anything yet.
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="button bg-green-900 text-white px-6 hover:bg-green-800"
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="body">
            <div className="responsiveM">
                <h1 className="text-2xl font-serif font-bold">Your Cart</h1>
            </div>

            <div className="responsiveM">
                {/* Table (desktop / tablet) */}
                <div className="hidden sm:block border-2 border-gray-200 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 text-sm text-gray-500 border-b border-gray-200">
                        <p>Product</p>
                        <p>Price</p>
                        <p>Qty</p>
                        <p>Subtotal</p>
                        <p></p>
                    </div>

                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4 border-b border-gray-100 last:border-b-0"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.productName}
                                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                />
                                <div>
                                    <p className="font-medium leading-tight">
                                        {item.productName}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {item.category}
                                    </p>
                                </div>
                            </div>

                            <p>Rs {item.productPrice.toLocaleString()}.00</p>

                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                    updateQty(item.id, e.target.value)
                                }
                                className="w-16 border border-gray-300 rounded-lg px-2 py-1 outline-none focus:border-green-800"
                            />

                            <p className="font-medium">
                                Rs{" "}
                                {(
                                    item.productPrice * item.quantity
                                ).toLocaleString()}
                                .00
                            </p>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                                <Trash2 className="w-4 h-4" />
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Card list (mobile) */}
                <div className="flex flex-col gap-3 sm:hidden">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="border-2 border-gray-200 rounded-2xl p-4 flex gap-3"
                        >
                            <img
                                src={item.image}
                                alt={item.productName}
                                className="w-20 h-20 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                            />
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="font-medium leading-tight">
                                    {item.productName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {item.category}
                                </p>
                                <p className="text-sm">
                                    Rs {item.productPrice.toLocaleString()}.00
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateQty(item.id, e.target.value)
                                        }
                                        className="w-16 border border-gray-300 rounded-lg px-2 py-1 outline-none focus:border-green-800"
                                    />
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="flex items-center gap-1 text-red-600 text-sm font-medium"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Remove
                                    </button>
                                </div>
                                <p className="font-medium text-right mt-1">
                                    Subtotal: Rs{" "}
                                    {(
                                        item.productPrice * item.quantity
                                    ).toLocaleString()}
                                    .00
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order total */}
            <div className="responsiveM">
                <div className="border-2 border-gray-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <p className="text-gray-500">Order total</p>
                        <p className="text-2xl font-bold">
                            Rs {cartTotal.toLocaleString()}.00
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/checkout")}
                        className="flex items-center justify-center gap-2 bg-green-900 text-white rounded-xl px-6 py-3 font-medium hover:bg-green-800 duration-200"
                    >
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;