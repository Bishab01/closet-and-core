function StockStatus({ hasVariants, selectedVariant, stock }) {
    if (!hasVariants) {
        return <p className="text-sm text-gray-500 mb-5">
            No variants have been added for this product yet.
        </p>;
    }

    const message = !selectedVariant
        ? <span className="text-red-400">Currently unavailable.</span>
        : stock === 0
        ? <span className="text-red-400">Out of stock.</span>
        : `${stock} pieces currently in stock.`;

    return <p className="text-sm text-gray-700 mb-5 font-semibold">
        {message}
    </p>;
}

export default StockStatus;