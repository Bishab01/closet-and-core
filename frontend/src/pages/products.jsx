import { useState } from "react"
import Productcard from "../components/productCard"
import tShirt from "../assets/images/t-shirt.JPG"
import hat from "../assets/images/hat.JPG"
import shoes from "../assets/images/shoes.JPG"

function Products(){
    const categories=['All','Clothing','Footwear','Headwear'];
    const [selected, setSelected] = useState("All");
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
            <div className="responsiveM">
                <p className="text-2xl font-serif font-bold">Categories</p>
                <p className="text-[16px] text-gray-600">Everything orgainized to help you find what you need faster.</p>
            </div>
            <div className="responsiveM">
                {
                    categories.map((category)=>
                    <button
                        key={category}
                        onClick={()=>setSelected(category)}
                        className={`categoryButton
                            ${
                                selected === category 
                                ? 'bg-green-900 text-white'
                                : 'border-gray-300 border-2 hover:border-gray-400 hover:bg-gray-100'
                            }
                        `}
                    >
                        {category}
                    </button>
                    )
                }
            </div>
            <div className="responsiveM">
                <div className="flex flex-wrap my-6 gap-3 sm:gap-6">
                    {products.map((product)=>
                        <Productcard
                            key={product.id}
                            id={product.id}
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

export default Products