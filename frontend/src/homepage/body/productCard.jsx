import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Minus, Plus, Check, PackageX } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import products from "../../data/products";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  // Hooks must run unconditionally, so these sit above the "not found" guard.
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="body">
        <div className="responsiveM flex flex-col items-start gap-4">
          <PackageX className="w-10 h-10 text-green-900" />
          <p className="text-xl font-serif font-bold">
            We couldn't find that product.
          </p>
          <p className="text-gray-600">
            It may have sold out of the catalogue entirely.
          </p>
          <Link to="/products" className="navButton bg-green-900 text-white">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(
      products.filter(
        (p) => p.id !== product.id && p.category !== product.category,
      ),
    )
    .slice(0, 3);

  const fullStars = Math.round(product.rating);

  const handleAddToBag = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="body">
      <div className="responsiveM">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-900 duration-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* ---------- Image panel ---------- */}
          <div className="w-full lg:w-1/2 relative">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 bg-amber-700 text-white text-xs tracking-widest uppercase font-medium px-3 py-1.5 rounded-full shadow-sm">
                {product.badge}
              </span>
            )}
            <div className="border-green-800 border-2 rounded-3xl overflow-hidden h-80 sm:h-[26rem] lg:h-[32rem] bg-gray-100">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ---------- Swing-tag detail panel ---------- */}
          <div className="w-full lg:w-1/2 relative">
            {/* string loop, as if the tag were hole-punched and threaded */}
            <svg
              className="absolute -top-6 left-9 w-8 h-8 text-green-900/70 pointer-events-none hidden sm:block"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16 30 C16 30 5 24 5 14 C5 7 10 3 16 3 C22 3 27 7 27 14 C27 24 16 30 16 30 Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
            </svg>

            <div className="relative bg-[#FBF9F4] border-2 border-green-900/80 rounded-[1.75rem] p-6 sm:p-8 pt-10 shadow-sm">
              {/* grommet / punch hole */}
              <div className="absolute -top-3.5 left-6 w-7 h-7 rounded-full bg-[#FBF9F4] border-2 border-green-900/80" />

              {/* inner stitch line, mimicking a fabric label */}
              <div className="absolute inset-2.5 rounded-[1.4rem] border border-dashed border-green-900/25 pointer-events-none" />

              <div className="relative">
                <p className="text-xs tracking-[0.2em] uppercase text-green-900 font-medium">
                  {product.category} &nbsp;&middot;&nbsp; {product.sku}
                </p>

                <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mt-2">
                  {product.productName}
                </h1>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-2xl font-serif font-semibold">
                    Rs {product.productPrice}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      product.stock === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {product.stock}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mt-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < fullStars ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating} &middot; {product.reviewCount} reviews
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed mt-5 text-sm sm:text-base">
                  {product.description}
                </p>

                <hr className="my-5 border-green-900/15" />

                {/* Colour */}
                <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
                  Colour &nbsp;&mdash;&nbsp;{" "}
                  <span className="normal-case text-gray-800">
                    {product.colors[selectedColor].name}
                  </span>
                </p>
                <div className="flex items-center gap-2.5 mb-5">
                  {product.colors.map((color, i) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(i)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 duration-150 ${
                        selectedColor === i
                          ? "border-green-900"
                          : "border-transparent"
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        {selectedColor === i && (
                          <Check
                            className="w-3.5 h-3.5"
                            style={{
                              color: ["#f2efe9", "#f7f6f2", "#a8a49c"].includes(
                                color.hex,
                              )
                                ? "#1f2421"
                                : "#ffffff",
                            }}
                          />
                        )}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Size */}
                <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
                  Size
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.sizes.map((size, i) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(i)}
                      className={`categoryButton !mr-0 !mb-0 text-sm ${
                        selectedSize === i
                          ? "bg-green-900 text-white"
                          : "border-gray-300 border-2 hover:border-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <hr className="my-5 border-green-900/15" />

                {/* Material & care */}
                <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-1.5">
                  Material &amp; Care
                </p>
                <p className="text-sm text-gray-700 mb-5">
                  {product.material}. {product.care}.
                </p>

                {/* Quantity + Add to bag */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 hover:bg-gray-100 duration-150"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-medium">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="px-3 py-2 hover:bg-gray-100 duration-150"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToBag}
                    className="flex-1 bg-green-900 hover:bg-green-950 duration-200 text-white font-medium rounded-xl py-2.5"
                  >
                    {added ? "Added to Bag ✓" : "Add to Bag"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- You might also like ---------- */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-6">
              You might also like
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  category={p.category}
                  productName={p.productName}
                  productPrice={p.productPrice}
                  image={p.image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
