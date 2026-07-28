import Productcard from "../components/productCard"
import tShirt from "../assets/images/t-shirt.JPG"
import hat from "../assets/images/hat.JPG"
import shoes from "../assets/images/shoes.JPG"

function Home(){
    const products = [
        {
            category: "Clothing",
            productName: "Round Neck Cotton T-shirt",
            productPrice: 450,
            image: tShirt,
        },
        {
            category: "Headwear",
            productName: "C Embroidered Baseball Cap",
            productPrice: 561,
            image: hat,
        },
        {
            category: "Footwear",
            productName: "Comfortable White Sneakers",
            productPrice: 1299,
            image: shoes,
        },
        {
            category: "Clothing",
            productName: "Round Neck Cotton T-shirt",
            productPrice: 450,
            image: tShirt,
        },
        {
            category: "Clothing",
            productName: "Round Neck Cotton T-shirt",
            productPrice: 450,
            image: tShirt,
        },
        {
            category: "Footwear",
            productName: "Comfortable White Sneakers",
            productPrice: 1299,
            image: shoes,
        },
    ];

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