import Productcard from "./productCard"
import tShirt from "../../images/products/t-shirt.jpg"

function Home(){
    const products = [
        {
            category: "Clothing",
            productName: "Round Neck Cotton T-shirt",
            productPrice: 450,
            image: tShirt,
        }
    ];

    return(
        <div className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-none">
            <div className="flex justify-start items-end border-green-800 border-2 m-10 rounded-3xl h-90">
                <div className="ml-15 mb-20 text-3xl leading-11">
                    NEW ARRIVALS <br/>
                    SUMMER 2026
                </div>
            </div>

            <div className="m-8">
                <h1 className="text-xl font-bold">
                    All Products
                </h1>
                <div className="mx-2 my-6">
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