import { Link } from "react-router-dom";

function ProductCard({ id, category, productName, image, productPrice }) {
  return (
    <Link
      to={`/products/${id}`}
      className="group flex flex-col rounded-2xl duration-400 border-gray-300 border-2 overflow-hidden hover:shadow-xl hover:border-green-800 w-[45%] sm:w-[30%] lg:w-[23%] xl:w-[18%] h-80 sm:h-90 lg:h-100"
    >
      <div className="h-[60%] sm:h-[65%] overflow-hidden">
        <img
          src={image}
          alt="image of the product"
          className="group-hover:scale-105 duration-400 object-fill h-full w-full"
        />
      </div>
      <div className="px-3 py-4 border-gray-300 border-b-2 font-serif ">
        <p className="text-sm sm:text-base text-gray-600 ">{category}</p>
        <p className="text-base sm:text-lg whitespace-nowrap overflow-y-auto scrollbar-none">
          {productName}
        </p>
      </div>
      <div className="p-3">
        <p className="text-base sm:text-lg font-medium font-serif">
          Rs {productPrice}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
