import products from "../data/productList";
import ProductCatalog from "../components/productCatalog";

function Home(){

    return(
        <div className="body">
            <div className="flex justify-start items-end responsiveM border-green-800 border-2 rounded-3xl h-60 md:h-90 bg-white/60">
                <div className="ml-8 mb-8 md:ml-15 md:mb-15 text-xl sm:text-2xl md:text-3xl uppercase leading-8 md:leading-11">
                    New Arrivals <br/>
                    Summer 2026
                </div>
            </div>

            <h1 className="ml-4 sm:ml-6 lg:ml-10 text-xl md:text-2xl font-serif font-bold">
                All Products
            </h1>

            <ProductCatalog
                products={products}
            />
        </div>
    )
}

export default Home;