function ProductInfoCard({ product }) {
    return (
        <>
            <p className="text-xs tracking-[0.2em] uppercase text-green-900 font-medium">
                {product.category}
            </p>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mt-2">
                {product.productName}
            </h1>

            <p className="text-lg font-semibold mt-3">
                Rs {product.productPrice}
            </p>

            {product.description && (
                <p className="text-gray-700 leading-relaxed mt-5 text-sm sm:text-base">
                    {product.description}
                </p>
            )}
        </>
    );
}

export default ProductInfoCard;