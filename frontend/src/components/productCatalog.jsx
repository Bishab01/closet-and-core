import { useState } from "react";
import ProductDetail from "../components/productDetail";
import ProductCard from "../components/productCard";
import { ShoppingBag } from "lucide-react";
import { NavLink } from "react-router-dom";

function ProductCatalog({products}){
    const [showProductDetails, setShowProductDetails] = useState(false);

    // Message for when cart is empty
    if (products.length === 0) {
        return (
            <div className="body">
                <div className="responsiveM">
                    <div 
                        className="flex flex-col items-center justify-center text-center p-20 gap-4
                        border border-dashed bg-white/60 rounded-3xl"
                    >
                        <ShoppingBag className="w-14 h-14 text-gray-400" />
                        <p className="text-xl sm:text-2xl font-serif font-bold">
                            No items added yet
                        </p>
                        <p className="text-gray-600">
                            Add new items by clicking on "Add Product" button.
                        </p>
                        <NavLink
                            to="/products"
                            className="button bg-green-800 text-white px-6 hover:bg-green-900"
                        >
                            Add Product
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="responsiveM">
            <div className="gridLayout my-6 ">
                {products.map((product)=>
                    <ProductCard
                        key={product.id} 
                        id={product.id}
                        category={product.category}
                        productName={product.productName}
                        productPrice={product.productPrice}
                        image={product.image}
                        click={() => setShowProductDetails(true)}
                    />
                )}
            </div>

            {/* Product Details */}
            {showProductDetails &&
                <ProductDetail
                    click={() => setShowProductDetails(false)}
                />
            }
        </div>
    )
}

export default ProductCatalog;