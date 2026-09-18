import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronsRight } from "lucide-react";
import ProductCatalog from "../components/productCatalog";
import {useProducts} from "../data/useProducts";
import Footer from "../components/footer";

function Home(){
    const [productLimit, setProductLimit] = useState(15); 
    const { products, loading, error } = useProducts();

    useEffect(() => {
        const updateProductLimit = () => {
            if (window.innerWidth < 640) {
                setProductLimit(6);       // 2 columns × 3 rows
            } else if (window.innerWidth < 768) {
                setProductLimit(9);       // 3 columns × 3 rows
            } else if (window.innerWidth < 1024) {
                setProductLimit(12);      // 4 columns × 3 rows
            } else {
                setProductLimit(15);      // 5 columns × 3 rows
            }
        };

        updateProductLimit();
        window.addEventListener("resize", updateProductLimit);

        return () => {
            window.removeEventListener("resize", updateProductLimit);
        };
    }, []);

    const visibleProducts = products.slice(0, productLimit);

    return(
        <div className="body flex flex-col">
            <div className="flex-1">
            <div className="flex justify-start items-end responsiveM border-green-800 border-2 rounded-3xl h-60 md:h-90 bg-white/60">
                <div className="ml-8 mb-8 md:ml-15 md:mb-15 text-xl sm:text-2xl md:text-3xl uppercase leading-8 md:leading-11">
                    New Arrivals <br/>
                    Summer 2026
                </div>
            </div>

            <h1 className="ml-4 sm:ml-6 lg:ml-10 text-xl md:text-2xl font-serif font-bold">
                All Products
            </h1>

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
                <>
                <ProductCatalog
                    products={visibleProducts}
                />

                <div
                    className="text-gray-500 font-medium flex items-center justify-center
                    -mt-1 sm:-mt-2 lg:-mt-4 mb-4 sm:mb-6 lg:mb-10"
                >
                    <NavLink
                        to="/products"
                        className="flex items-center w-fit hover:text-gray-700"
                    >
                        See more 
                        <ChevronsRight className="size-5"/>
                    </NavLink>
                </div>
                </>
            )}
            </div>

            <Footer/>

        </div>
    )
}

export default Home;