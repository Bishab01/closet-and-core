function ProductImage({ src, alt }) {
  return (
    <div className="w-65 lg:w-90 shrink-0 border-green-800 border-2 rounded-3xl overflow-hidden aspect-8/9">
      {src ? (
        <img src={src} alt={alt} className="hover:scale-105 duration-400 object-cover h-full w-full" />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
          No image
        </div>
      )}
    </div>
  );
}

export default ProductImage;