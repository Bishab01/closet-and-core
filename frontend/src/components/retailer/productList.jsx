import { PackageSearch, Pencil, Trash2 } from "lucide-react";

function ProductList({products, onDelete, onEdit}) {
    if(products.length === 0) {
        return(
            <div className="flex flex-col items-center justify-center text-center p-16 gap-4
                border border-dashed bg-white/60 rounded-3xl responsiveM"
            >
                <PackageSearch className="w-12 h-12 text-gray-400" />
                <p className="text-xl sm:text-2xl font-serif font-bold">No products yet</p>
                <p className="text-gray-600 max-w-md">
                    This product has not been added yet.
                </p>
            </div>
        )
    }

    return(
        <div className="responsiveM">
            <div className="gridLayout my-6 ">
                {products.map((product)=>
                    <div
                        className="flex flex-col rounded-2xl border-gray-400 border bg-white/60
                        overflow-hidden hover:shadow-xl shrink-0 group cursor-pointer"
                        key = {product.pid}
                    >
                        {/* Product Image */}
                        <div className="aspect-8/9 overflow-hidden">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.pname}
                                    className="group-hover:scale-105 duration-400 object-cover h-full w-full"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                                    No image
                                </div>
                            )}
                        </div>

                        {/* Product Name & Category */}
                        <div className="mx-3 my-4 font-serif ">
                            <p className="text-gray-600 mb-1">{product.cat_name}</p>
                            <p className="text-[17px] line-clamp-3">{product.pname}</p>
                        </div>

                        {/* Product Price */}
                        <div className="mt-auto mx-3 mb-3">
                            <p className="text-[17px] font-medium font-serif">
                            Rs {product.price.toLocaleString()}
                            </p>
                        </div>
                        
                        {/* Edit & Delete buttons */}
                        <div className="border-t border-gray-300 flex divide-x divide-gray-300">
                            <button
                                onClick={() => onEdit(product.pid)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-gray-700/70 hover:text-gray-700"
                            >
                                <Pencil className="size-3.5" /> Edit
                            </button>
                            <button
                                onClick={() => onDelete(product)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-red-500/70 hover:text-red-500"
                            >
                                <Trash2 className="size-3.5" /> Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductList;