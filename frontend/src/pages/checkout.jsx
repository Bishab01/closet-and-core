import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCartItems } from "../data/useCartItems";
import { getFname } from "../data/getFullName";
import { placeOrder } from "../api/cartOperations";

const PAYMENT_METHODS = [
    { id: "cod", label: "Cash on Delivery", hint: "Pay when your order arrives" },
    { id: "esewa", label: "eSewa", hint: "Pay online via eSewa" },
    { id: "khalti", label: "Khalti", hint: "Pay online via Khalti" },
];

function Checkout() {
    const { cartItems } = useCartItems(); 
    const fullName = getFname();

    const [valMsg, setValMsg] = useState('');
    const [msg, setMsg] = useState('');
    const [msgType, setMsgType] = useState('success'); //success or error

    const navigate = useNavigate();
    const deliveryFee = 100;
    const subTotal = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );
    const total = subTotal + deliveryFee;
    const [formData, setFormData] = useState({
        phone: "",
        address: "",
    });
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].id);
    const [submitting, setSubmitting] = useState(false);

    const phoneRegex = /^9\d{9}$/;
    const addressRegex = /^[a-zA-Z0-9,\- ]+$/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if(!formData.phone.trim() || !formData.address.trim())
        {
            setValMsg("All fields are required");
            setMsgType('error');
            return false;
        }

        if(!phoneRegex.test(formData.phone))
        {
            setValMsg("Invalid phone number");
            setMsgType('error');
            return false;
        }

        if(!addressRegex.test(formData.address))
        {
            setValMsg("No special character allowed except '-' and ','.");
            setMsgType('error');
            return false;
        }

        return true;
    };

    const handlePlaceOrder = async(e) => {
        e.preventDefault();
        if (cartItems.length === 0)  {
            setMsg("Your cart is empty.");
            setMsgType('error');
            return;
        }
        if (!validate()) {
            setMsg("Validation Failed");
            setMsgType('error');
            return;
        }
        
        setValMsg('');
        setSubmitting(true);

        try {
            // The backend saves the order + order items from the server-side cart,
            // and only clears the cart if everything was saved.
            const result = await placeOrder({
                phone: formData.phone.trim(),
                address: formData.address.trim(),
                paymentMethod,
                paymentStatus: paymentMethod === "cod" ? "unpaid" : "paid",
                status: "pending",
            });

            if (!result.success) {
                setMsg(result.message || "Failed to place order.");
                setMsgType('error');
                return;
            }
            setMsg(result.message || "Order placed successfully.");
            setMsgType('success');
            setTimeout(()=>setMsg(""),2500);
            window.dispatchEvent(new Event("cart-updated")); // refresh the cart count in the header
        } 
        catch (error) {
            console.error("Error placing order:", error);
            setMsg("Something went wrong while placing the order. Please try again.");
            setMsgType('error');
        } 
        finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="body">
            <div className="responsiveM my-6! md:my-8! flex items-center relative">
                <NavLink
                    to="/cart"
                    className="flex text-xs sm:text-sm items-center text-gray-700 hover:text-gray-900 gap-1"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cart
                </NavLink>
                <h1 className="hidden md:block md:absolute md:left-1/2 md:-translate-x-1/2 text-2xl font-serif font-bold">
                    Checkout
                </h1>
            </div>
            <h1 className="text-2xl font-serif font-bold text-center -mt-3 mb-6 md:hidden">
                Checkout
            </h1>

            <form 
                className="responsiveM grid gap-6 lg:grid-cols-3 items-start"
            >
                {/* Delivery details form */}
                <div className="lg:col-span-2 border border-gray-300 shadow-sm bg-white/60 rounded-2xl px-6 py-6 flex flex-col gap-4">
                    <p className="font-serif text-lg font-bold">Delivery Details</p>

                    <div className="grid sm:grid-cols-2 gap-4 text-[14.5px]">
                        <div>
                            <label className="label">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={fullName}
                                readOnly
                                className="inputBox"
                            />
                        </div>

                        <div>
                            <label className="label">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="9xxxxxxxxx"
                                className="inputBox"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="label">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Street, ward, city"
                                className="inputBox"
                            />
                        </div>

                        {valMsg && 
                            <p className={`mt-2 font-medium text-[14.5px] rounded-md text-start px-3 py-1.5 col-span-full
                                ${msgType==='success'
                                    ?"text-green-600"
                                    :"text-red-500"}`}
                            >
                                {valMsg}
                            </p>
                        }
                    </div>

                    <hr className="border-gray-300 my-1" />

                    <p className="font-serif text-lg font-bold">Payment Method</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {PAYMENT_METHODS.map((method) => (
                            <label
                                key={method.id}
                                className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 cursor-pointer duration-150 ${
                                    paymentMethod === method.id
                                        ? "border-green-800 bg-green-50"
                                        : "border-gray-300 hover:border-gray-400"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method.id}
                                    checked={paymentMethod === method.id}
                                    onChange={() => setPaymentMethod(method.id)}
                                    className="mt-1 accent-green-800"
                                />
                                <span>
                                    <span className="block font-medium text-sm">{method.label}</span>
                                    <span className="block text-xs text-gray-500">{method.hint}</span>
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Order summary */}
                <div className="border border-gray-300 shadow-sm bg-white/60 rounded-2xl px-6 py-6 flex flex-col gap-4 lg:sticky lg:top-6">
                    <p className="font-serif text-lg font-bold">Order Summary</p>

                    <div className="flex flex-col gap-3 max-h-72 overflow-y-auto scrollbar-none pr-1">
                        {cartItems.map((item) => (
                            <div key={item.cid} className="flex items-center gap-3 mb-1">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{item.pname}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        {item.color && (
                                        <>
                                            <span>{item.color}</span>
                                            <span className="mx-2 h-3 border-l border-gray-300"></span>
                                        </>
                                        )}
                                        <span>{item.size||"One Size"}</span>
                                        <span className="mx-2 h-3 border-l border-gray-300"></span>
                                        <span>Qty: {item.quantity}</span>
                                    </p>
                                </div>
                                <p className="text-sm font-medium whitespace-nowrap">
                                    Rs {(item.quantity * item.price).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="border-gray-300" />

                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">Rs {subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Fee</span>
                            <span className="font-medium">
                                {deliveryFee === 0 ? "Free" : "Rs "+deliveryFee.toFixed(2)}
                            </span>
                        </div>
                        <hr className="border-gray-300 my-1" />
                        <div className="flex justify-between text-base">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-lg">Rs {total.toFixed(2)}</span>
                        </div>
                    </div>

                    {msg && 
                        <p className={`mt-2 font-medium text-[14.5px] rounded-md text-start py-1.5 w-full
                            ${msgType==='success'
                                ?"text-green-600"
                                :"text-red-500"}`}
                        >
                            {msg}
                        </p>
                    }

                    <button
                        type="submit"
                        disabled={submitting}
                        onClick={handlePlaceOrder}
                        className="flex items-center justify-center gap-2 bg-green-900 text-white rounded-xl px-6 py-3 font-medium hover:bg-green-800 duration-200 disabled:opacity-60"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Checkout;