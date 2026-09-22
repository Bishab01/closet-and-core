function SizePicker({ sizes, selectedSize, onChange }) {
  if (sizes.length === 0) {
    return (
      <>
        <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">Size</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="categoryButton mr-0! text-sm bg-green-900 text-white cursor-default">
            One Size
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">Size</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`categoryButton mr-0! text-sm ${
              selectedSize === size
                ? "bg-green-900 text-white"
                : "border-gray-300 border-2 hover:border-gray-400 hover:bg-gray-100"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </>
  );
}

export default SizePicker;