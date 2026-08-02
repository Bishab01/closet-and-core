import { useState } from "react";
import ProductDetail from "../components/productDetail";
import ProductCard from "../components/productCard";

function ProductCatalog({products}){
    const [showProductDetails, setShowProductDetails] = useState(false);

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