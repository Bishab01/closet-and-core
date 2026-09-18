import { Eye } from "lucide-react";

function ProductCard({
  category,
  pname,
  image,
  price,
  index,
  click,
}) {

  return (
    <div
      className="resultAppear flex flex-col rounded-2xl border-gray-400 border bg-white/60
      overflow-hidden hover:shadow-xl shrink-0 group cursor-pointer"
      style={{ animationDelay: `${Math.min(index ?? 0, 12) * 20}ms` }}
    >
      {/* Product Image */}
      <div className="aspect-8/9 overflow-hidden">
        {image ? (
            <img
                src={image}
                alt={pname}
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
        <p className="text-[17.5px] line-clamp-3">{pname}</p>
      </div>

      {/* Product Price */}
      <div className="mt-auto">
        <hr className="border-gray-400 mx-3 border-dashed"></hr>
        <div className="flex items-center justify-between mx-3 my-2 ">
          <p className="text-lg font-medium font-serif">
            Rs {price}
          </p>
          <button
              onClick={click}
              className="flex items-center gap-1 text-sm text-white hover:text-gray-400 w-fit hover:bg-white
                  border bg-gray-400/90 border-gray-400/90 hover:border-gray-400 rounded-2xl px-1.5"
          >
              <p>View</p>
              <Eye className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
