import { useState } from "react";
import ProductDetail from "../components/productDetail";
import ProductCard from "../components/productCard";
import { ShoppingBag } from "lucide-react";

function ProductCatalog({products}){
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Message for when there's nothing to show
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
                            No products to display
                        </p>
                        <p className="text-gray-600">
                            Products are yet to be added. They will be added soon.
                        </p>
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
                        key={product.pid} 
                        category={product.cat_name}
                        pname={product.pname}
                        price={product.price}
                        image={product.image}
                        click={() => setSelectedProduct(product)}
                    />
                )}
            </div>

            {/* Product Details */}
            {selectedProduct &&
                <ProductDetail
                    product={selectedProduct}
                    click={() => setSelectedProduct(null)}
                />
            }
        </div>
    )
}

export default ProductCatalog;