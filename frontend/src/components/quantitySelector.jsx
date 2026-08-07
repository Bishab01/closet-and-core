import { useState } from "react";
import { Minus, Plus } from "lucide-react";

function QuantitySelector({ px, py, textSize }) {
    const [qty, setQty] = useState(1);

    return (
        <div className="flex items-center border border-gray-300 rounded-lg w-fit">
            <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className={`px-${px} py-${py}`}
                title="Decrease quantity"
            >
                <Minus className="size-3.5" />
            </button>
            <span className={`px-2 ${textSize || "text-sm"} font-medium`}>{qty}</span>
            <button
                onClick={() => setQty((q) => q + 1)}
                className={`px-${px} py-${py}`}
                title="Increase quantity"
            >
                <Plus className="size-3.5" />
            </button>
        </div>
    )
}

export default QuantitySelector;