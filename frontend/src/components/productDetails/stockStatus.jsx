function StockStatus({ hasVariants, selectedVariant, stock }) {
    if (!hasVariants) {
        return <p className="text-sm text-gray-500 mb-5">
            No variants have been added for this product yet.
        </p>;
    }

    const message = !selectedVariant
        ? <p className="text-red-400">This variant is currently unavailable.</p>
        : stock === 0
        ? <p className="text-red-400">This is out of stock.</p>
        : `${stock} pieces currently in stock.`;

    return <p className="text-sm text-gray-700 mb-5 font-semibold">
        {message}
    </p>;
}

export default StockStatus;