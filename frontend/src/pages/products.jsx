import { useEffect, useState } from "react";
import ProductCatalog from "../components/productCatalog";
import Categories from "../components/categories";

const apiURL = import.meta.env.VITE_API_URL;

function Products(){
    const [products, setProducts] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch(`${apiURL}getStorefrontProducts.php`),
                    fetch(`${apiURL}getCategories.php`),
                ]);

                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();

                if (productsData.success) {
                    setProducts(
                        productsData.products.map((p) => ({ ...p, image: `${apiURL}${p.image}` }))
                    );
                }
                if (categoriesData.success) {
                    setCategoryNames(categoriesData.categories.map((c) => c.cat_name));
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

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
                categories={["All", ...categoryNames]}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="size-8 rounded-full border-2 border-green-900 border-t-transparent animate-spin" />
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