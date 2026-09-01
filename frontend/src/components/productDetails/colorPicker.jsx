function ColorPicker({ colors, selectedColor, onChange }) {
  if (colors.length === 0) return null;

  return (
    <>
      <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
        Color — <span className="normal-case text-gray-800">{selectedColor || "Unavailable"}</span>
      </p>
      <div className="flex items-center gap-2.5 mb-5">
        {colors.map((color) => (
          <button
            key={`${color.name}-${color.hex}`}
            onClick={() => onChange(color.name)}
            title={color.name}
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 duration-150 ${
              selectedColor === color.name ? "border-green-900" : "border-transparent"
            }`}
          >
            <span className="w-6 h-6 rounded-full border border-black/20" style={{ backgroundColor: color.hex }} />
          </button>
        ))}
      </div>
    </>
  );
}

export default ColorPicker;