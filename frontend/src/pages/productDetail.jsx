import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Minus, Plus, PackageX } from "lucide-react"
import products from "../data/productList"

function ProductDetail(){
    // const { id } = useParams()
    // const product = products.find((p) => String(p.id) === id)

    const [selectedColor, setSelectedColor] = useState(0)
    const [selectedSize, setSelectedSize] = useState(0)
    const [qty, setQty] = useState(1)

    // const related = products
    //     .filter((p) => p.id !== product.id && p.category === product.category)
    //     .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    //     .slice(0, 3)


    return (
        <div className="body bg-black/30">
            <div className="responsiveM mt-5!"> 
                <Link
                    to="/products" //should go to the tab that is active not just products
                    className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back 
                </Link>

                <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">

                    {/* Product Image */}
                    <div className="w-80 lg:w-100 shrink-0">
                        <div className="border-green-800 border-2 rounded-3xl overflow-hidden h-100 lg:h-120">
                            <img
                                src={products[0].image}
                                alt={products[0].productName}
                                className="hover:scale-105 duration-400 object-cover h-full w-full"
                            />
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-[#FBF9F4] border-2 border-green-800 rounded-3xl shadow-sm">

                            <div className="m-4 p-4 sm:p-6 border border-dashed border-green-900/30 rounded-xl">
                                <p className="text-xs tracking-[0.2em] uppercase text-green-900 font-medium">
                                    {products[0].category}
                                </p>

                                <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mt-2">
                                    {products[0].productName}
                                </h1>

                                <p className="text-gray-700 leading-relaxed mt-5 text-sm sm:text-base">
                                    {products[0].description}
                                </p>

                                <hr className="my-5 border-green-900/15" />

                                {/* Colour */}
                                <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
                                    Color &mdash; <span className="normal-case text-gray-800">{products[0].colors[selectedColor].name}</span>
                                </p>
                                <div className="flex items-center gap-2.5 mb-5">
                                    {products[0].colors.map((color, i) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(i)}
                                            title={color.name}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 duration-150 ${
                                                selectedColor === i ? "border-green-900" : "border-transparent"
                                            }`}
                                        >
                                            <span
                                                className="w-6 h-6 rounded-full border border-black/20"
                                                style={{ backgroundColor: color.hex }}
                                            >
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Size */}
                                <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-2">
                                    Size
                                </p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {products[0].sizes.map((size, i) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(i)}
                                            className={`categoryButton mr-0! text-sm ${
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

                                {/* Material */}
                                <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-1.5">
                                    Material
                                </p>
                                <p className="text-sm text-gray-700 mb-5">
                                    {products[0].material}.
                                </p>
                                
                                {/* Care */}
                                 <p className="text-xs tracking-[0.15em] uppercase text-gray-500 font-medium mb-1.5">
                                    Care
                                </p>
                                <p className="text-sm text-gray-700 mb-5">
                                    {products[0].care}.
                                </p>

                                {/* Quantity + Add to Cart */}
                                <div className="flex items-center gap-4 lg:gap-6">
                                    <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                                        <button
                                            // onClick={() => setQty((q) => Math.max(1, q - 1))}
                                            className="px-3 py-2 hover:bg-gray-100 duration-150"
                                            title="Decrease quantity"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-4 font-medium">{qty}</span>
                                        <button
                                            // onClick={() => setQty((q) => q + 1)}
                                            className="px-3 py-2 hover:bg-gray-100 duration-150"
                                            title="Increase quantity"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        className="px-3 py-2 bg-green-900 hover:bg-green-950 duration-200 text-white font-medium rounded-xl"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                               
               
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail