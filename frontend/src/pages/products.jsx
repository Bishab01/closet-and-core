import ProductCatalog from "../components/productCatalog";
import Categories from "../components/categories";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";

function Products(){
    const[selectedCategory, setSelectedCategory] = useState("all");
    const { products, loading, error } = useProducts();

    const filteredProducts =
        selectedCategory === "all"
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
            {loading ? (
                <div className="responsiveM py-12 text-center text-gray-500">
                    Loading products...
                </div>
            ) : error ? (
                <div className="responsiveM py-12 text-center text-red-600">
                    {error}
                </div>
            ) : (
                <ProductCatalog
                    products={filteredProducts}
                />
            )}        
            
        </div>
    )
}

export default Products;