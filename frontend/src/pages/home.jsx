import Productcard from "../components/productCard"
import products from "../data/productList"

function Home(){

    return(
        <div className="body">
            <div className="flex justify-start items-end responsiveM border-green-800 border-2 rounded-3xl h-60 sm:h-90">
                <div className="ml-8 mb-8 sm:ml-15 sm:mb-15 text-xl sm:text-3xl leading-8 sm:leading-11">
                    NEW ARRIVALS <br/>
                    SUMMER 2026
                </div>
            </div>

            <div className="m-4 sm:m-6 lg:m-10">
                <h1 className="text-xl sm:text-2xl font-serif font-bold">
                    All Products
                </h1>
                <div className="flex flex-wrap my-6 gap-3 sm:gap-6">
                    {products.map((product,index)=>
                        <Productcard
                            key={index}
                            category={product.category}
                            productName={product.productName}
                            productPrice={product.productPrice}
                            image={product.image}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home