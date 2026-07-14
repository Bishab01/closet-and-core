import { useState } from "react"
import Productcard from "./productCard";
import tShirt from "../../images/products/t-shirt.jpg"
import hat from "../../images/products/hat.jpg"
import shoes from "../../images/products/shoes.jpg"

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
            <div className="m-10">
                <p className="text-2xl font-serif font-bold">Categories</p>
                <p className="text-[16px] text-gray-600">Everything orgainized to help you find what you need faster.</p>
            </div>
            <div className="m-10">
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
            <div className="m-10">
                <div className="flex flex-wrap my-6 gap-6">
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

export default Products