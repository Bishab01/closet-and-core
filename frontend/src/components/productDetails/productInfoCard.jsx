function ProductInfoCard({ product, description }) {
    return (
        <>
            <p className="text-xs tracking-[0.2em] uppercase text-green-900 font-medium">
                {product.cat_name}
            </p>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mt-2">
                {product.pname}
            </h1>

            <p className="text-lg font-semibold mt-3">
                Rs {product.price}
            </p>

            {description && (
                <p className="text-gray-700 leading-relaxed mt-5 text-sm sm:text-base">
                    {description}
                </p>
            )}
        </>
    );
}

export default ProductInfoCard;