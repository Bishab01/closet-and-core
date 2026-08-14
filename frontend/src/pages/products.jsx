import products from "../data/productList";
import ProductCatalog from "../components/productCatalog";
import Categories from "../components/categories";
import { useState } from "react";

function Products(){
    const[selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                (product) => product.category === selectedCategory
            );

    return(
        <div className="body">
            <div className="responsiveM">
                <p className="text-xl md:text-2xl font-serif font-bold">Categories</p>
                <p className="text-sm text-gray-600">Everything orgainized to help you find what you need faster.</p>
            </div>
           
            <Categories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
                        
            <ProductCatalog
                products={filteredProducts}
            />
        </div>
    )
}

export default Products;