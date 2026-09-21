import { Trash2 } from "lucide-react";

function VariantRow({ variant, onChange, onRemove, isDuplicate }) {
    const handleField = (field, value) => {
        onChange({ ...variant, [field]: value });
    };

    return (
        <div
            className={`grid grid-cols-12 gap-1 items-center bg-white/70 border rounded-lg p-1.5 ${
                isDuplicate ? "border-red-400 bg-red-50" : "border-gray-300"
            }`}
        >
            <input
                type="text"
                placeholder="Color (e.g. Olive Green)"
                value={variant.color}
                onChange={(e) => handleField("color", e.target.value)}
                className="col-span-4 h-8 px-2 rounded-sm border border-gray-300 outline-none text-sm focus:border-green-800"
            />

            <input
                type="color"
                title="Pick a swatch"
                value={variant.color_hex || "#000000"}
                onChange={(e) => handleField("color_hex", e.target.value)}
                className="col-span-1 h-8 w-full rounded-sm border border-gray-300 cursor-pointer p-0.5"
            />

            <input
                type="text"
                placeholder="Size (e.g. M)"
                maxLength={5}
                value={variant.size}
                onChange={(e) => handleField("size", e.target.value)}
                className="col-span-3 h-8 px-2 rounded-sm border border-gray-300 outline-none text-sm focus:border-green-800"
            />

            <input
                type="number"
                min="0"
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) => handleField("stock", e.target.value)}
                className="col-span-3 h-8 px-2 rounded-sm border border-gray-300 outline-none text-sm focus:border-green-800"
            />

            <button
                type="button"
                onClick={onRemove}
                title="Remove variant"
                className="col-span-1 flex justify-center text-gray-400 hover:text-red-500"
            >
                <Trash2 className="size-4" />
            </button>
        </div>
    );
}

export default VariantRow;
