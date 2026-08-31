import { useState, useEffect, useMemo } from "react";

export function useProductVariants(product) {
  const variants = product?.variants ?? [];

  const colors = useMemo(() => {
    const seen = new Set();
    return variants
      .filter((v) => v.color)
      .filter((v) => {
        const key = `${v.color}-${v.hex ?? ""}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((v) => ({ name: v.color, hex: v.hex || "#d1d5db" }));
  }, [variants]);

  const sizes = useMemo(() => {
    const seen = new Set();
    return variants
      .filter((v) => v.size)
      .filter((v) => {
        if (seen.has(v.size)) return false;
        seen.add(v.size);
        return true;
      })
      .map((v) => v.size);
  }, [variants]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const firstAvailable = variants.find((v) => v.stock > 0) ?? variants[0];
    setSelectedColor(firstAvailable?.color ?? colors[0]?.name ?? null);
    setSelectedSize(firstAvailable?.size ?? sizes[0] ?? null);
  }, [product?.id]);

  const getVariant = (color, size) => {
    if (color && size) return variants.find((v) => v.color === color && v.size === size);
    if (color) return variants.find((v) => v.color === color);
    if (size) return variants.find((v) => v.size === size);
    return variants[0];
  };

  const selectedVariant = getVariant(selectedColor, selectedSize);

  return {
    variants,
    colors,
    sizes,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    selectedVariant,
    hasVariants: variants.length > 0,
    stock: selectedVariant?.stock ?? 0,
  };
}