import products from "../data/productList";
import ProductCatalog from "../components/productCatalog";
import Categories from "../components/categories";

function Products(){
    
    return(
        <div className="body">
            <div className="responsiveM">
                <p className="text-2xl font-serif font-bold">Categories</p>
                <p className="text-[16px] text-gray-600">Everything orgainized to help you find what you need faster.</p>
            </div>
           
            <Categories/>
                        
            <ProductCatalog
                products={products}
            />
        </div>
    )
}

export default Products;