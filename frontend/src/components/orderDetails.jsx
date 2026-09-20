import {
  ArrowLeft,
  MapPin,
  Phone,
} from "lucide-react";
import { getFname } from "../data/getFullName";
import { paymentStatusStyles, statusStyles } from "../data/dashboard";
import { NavLink } from "react-router-dom";
import { useOrderItems } from "../data/useOrderItems";

const fallbackPill = "bg-gray-100 text-gray-700";

function OrderDetail({ order, onBack }) {
  
  const fullName = getFname();
  const { items } = useOrderItems(order.oid);

  const subTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const deliveryFee = 100;

  const orderCode = (oid) => {
      const scrambled = (oid * 40503) % 65536; // odd multiplier => every id gets a different value
      return scrambled.toString(16).toUpperCase().padStart(4, "0");
  }

  return (
    <div className="body">
      <div className="responsiveM">
        {/* one centred column: the card stays readable on wide screens and fills the width on phones */}
        <div className="mx-auto w-full max-w-3xl">

          <button
            onClick={onBack}
            className="flex text-xs sm:text-sm items-center text-gray-700 hover:text-gray-900 gap-1 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Order summary card */}
          <div
            className="border border-gray-300 shadow-sm bg-white rounded-2xl px-5 py-6 sm:px-8 sm:py-8"
          >
            {/* Header */}
            <div className="flex flex-col items-start gap-1 pb-5 border-b border-gray-300">
              <div className="font-serif font-bold text-xl text-green-900">
                Order Summary
              </div>
              <p className="text-sm text-gray-600">
                Order ID: {" "}
                <span className="font-medium text-gray-900">ORD_{orderCode(order.oid)}</span>
              </p>
              <p className="text-sm text-gray-600">
                Date:{" "}
                <span className="font-medium text-gray-900">
                  {order.created_at.slice(0, 10)}
                </span>
              </p>
            </div>

            {/* Customer + payment/status */}
            <div className="grid sm:grid-cols-2 gap-6 py-5 border-b border-gray-300">
              <div className="min-w-0">
                <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
                  Billed To
                </p>
                <p className="font-medium wrap-break-word">{fullName}</p>
                <p className="text-sm text-gray-700 flex items-center gap-1.5 mt-1">
                  <Phone className="w-3.5 h-3.5 shrink-0" /> {order.contact_number}
                </p>
                <p className="text-sm text-gray-700 flex items-start gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span className="min-w-0 wrap-break-word">{order.delivery_address}</span>
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
                  Payment & Status
                </p>
                <p className="text-sm text-gray-700">
                  Method:{" "}
                  <span className="font-medium text-gray-900">
                    {order.payment_method}
                  </span>
                </p>
                <div className="flex flex-wrap sm:justify-end items-center gap-2 mt-2">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${paymentStatusStyles[order.payment_status] || fallbackPill}`}
                  >
                    Payment: {order.payment_status}
                  </span>
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.status] || fallbackPill}`}
                  >
                    Order: {order.status}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mt-5 -mb-2">
              Order Items
            </p>

            {/* Items: the page itself scrolls, so no scroll box inside the card */}
            <div className="py-5 flex flex-col divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium wrap-break-word">{item.pname}</p>
                    <p className="text-xs text-gray-500 flex flex-wrap items-center gap-y-0.5 mt-0.5">
                        <span>{item.color}</span>
                        <span className="mx-2 h-3 border-l border-gray-300"></span>
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

            {/* Total + subtotal */}
            <div className="flex">
              <div className="w-full flex flex-col gap-2 text-sm border-t border-gray-300 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    Rs {subTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">
                    Rs {deliveryFee.toFixed(2)}
                  </span>
                </div>
                <hr className="border-gray-300 my-1" />
                <div className="flex justify-between text-base">
                  <span className="font-semibold">Grand Total</span>
                  <span className="font-bold text-lg">
                    Rs {order.total}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-200">
              Thank you for shopping with Closet & Core. For questions about this
              order, <NavLink to="/contact" className="text-blue-600">Contact us</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
 
