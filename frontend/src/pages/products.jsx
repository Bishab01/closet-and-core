import ProductCatalog from "../components/productCatalog";
import { useState } from "react";
import Categories from "../components/categories";
import { useProducts } from "../hooks/useProducts";
import Footer from "../components/footer";

function Products(){
    const[selectedCategory, setSelectedCategory] = useState("all");
    const { products, loading, error } = useProducts();

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter(
                (product) => product.cat_name === selectedCategory
            );

    return(
        <div className="body flex flex-col">
            <div className="flex-1">
            <div className="responsiveM">
                <p className="text-xl md:text-2xl font-serif font-bold">Categories</p>
                <p className="text-sm text-gray-600">Everything orgainized to help you find what you need faster.</p>
            </div>
           
            <Categories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                products={products}
            />

            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="responsiveM flex items-center gap-2 justify-center py-12 text-gray-500">
                        <div className="size-8 rounded-full border-2 border-green-900 border-t-transparent animate-spin" />
                        Loading products...
                    </div>
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

            <Footer/>
        </div>
    )
}

export default Products;