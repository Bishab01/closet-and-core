function ProductCard({
  category,
  productName,
  image,
  productPrice,
  click,
}) {

  return (
    <div
      className="flex flex-col rounded-2xl border-gray-400 border bg-white/60
      overflow-hidden hover:shadow-xl shrink-0 group cursor-pointer"
      onClick={click}
    >
      {/* Product Image */}
      <div className="aspect-8/9 overflow-hidden">
        {image ? (
            <img
                src={image}
                alt={productName}
                className="group-hover:scale-105 duration-400 object-cover h-full w-full"
            />
        ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                No image
            </div>
        )}
      </div>

      {/* Product Name & Category */}
      <div className="mx-3 my-4 font-serif ">
        <p className="text-gray-600 mb-1">{category}</p>
        <p className="text-[17.5px] line-clamp-3">{productName}</p>
      </div>

      {/* Product Price */}
      <div className="mt-auto">
        <hr className="border-gray-400 mx-3 border-dashed"></hr>
        <p className="mx-3 my-3 text-lg font-medium font-serif">
          Rs {productPrice}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
