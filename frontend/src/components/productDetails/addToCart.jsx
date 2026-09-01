import LoginRequest from "../loginRequest";
import QuantitySelector from "../quantitySelector";
import { ShoppingCart } from "lucide-react";

function AddToCart({ disabled, onAddToCart, showLoginPrompt, onConfirmLogin, onCancelLogin }) {
  return (
    <>
      <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">Quantity</p>
      <div className="flex items-start flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
        <QuantitySelector px="3" py="2" textSize="text-base" />
        <button
          onClick={onAddToCart}
          disabled={disabled}
          className="flex items-center justify-center gap-2 whitespace-nowrap px-3 py-2 bg-green-900 hover:bg-green-950 duration-200 text-white font-medium rounded-lg"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
        {showLoginPrompt && 
            <LoginRequest 
                onConfirm={onConfirmLogin} 
                onCancel={onCancelLogin} 
            />
        }
      </div>
    </>
  );
}

export default AddToCart;