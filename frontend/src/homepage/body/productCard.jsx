function Productcard({category, productName, image, productPrice }){
    return(
        <div className="flex flex-col rounded-2xl duration-400 border-gray-300 border-2 overflow-hidden hover:shadow-xl w-70 h-100">
            <div className="h-[65%]">
                <img 
                    src={image}
                    alt="image of the product" 
                    className="hover:scale-103 duration-400 object-fill h-full w-full"
                />
            </div>
            <div className="px-3 py-4 border-gray-300 border-b-2 font-serif">
                <p className="text-gray-500 ">{category}</p>
                <p className="text-lg">{productName}</p>
            </div>
            <div className="p-3">
                <p className="text-lg font-medium font-serif">Rs {productPrice}</p>
            </div>
        </div>
    )
}

export default Productcard