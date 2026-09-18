import { useState, useEffect, useMemo } from "react";
import { getProductDetails } from "../api/productDetailsApi";

export function useProductDetails(pid) {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (!pid) {
      setProductDetails(null);
      return;
    }

    const reqPid = pid;
    const loadProductDetails = async () => {
      try {
        const data = await getProductDetails(reqPid);
        if (Number(data.pid) !== Number(reqPid)) {
          console.error("Product ID mismatch.");
          return;
        }
        setProductDetails(data);
      } catch (err) {
        console.error(err);
        setProductDetails(null);
      }
    };

    loadProductDetails();
  }, [pid]);

  const variants = useMemo(
    () => productDetails?.variants ?? [],
    [productDetails]
  );

  const description = useMemo(
    () => productDetails?.description ?? "", 
    [productDetails]
  );

  const colors = useMemo(() => {
    return [
      ...new Map(
        variants
          .filter(v => v.color)
          .map(v => [
            v.color,
            {
              name: v.color,
              hex: v.hex || "#d1d5db"
            }
          ])
      ).values()
    ];
  }, [variants]);

  const sizes = useMemo(() => {
    return [
      ...new Set(
        variants
          .filter(v => v.size)
          .map(v => v.size)
      )
    ];
  }, [variants]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const firstAvailable = variants.find((v) => v.stock > 0) ?? variants[0];
    setSelectedColor(firstAvailable?.color ?? colors[0]?.name ?? null);
    setSelectedSize(firstAvailable?.size ?? sizes[0] ?? null);
  }, [productDetails?.pid]);

  const selectedVariant = useMemo(() => {
    if (selectedColor && selectedSize) {
      return variants.find((v) => v.color === selectedColor && v.size === selectedSize);
    }
    if (selectedColor) return variants.find((v) => v.color === selectedColor);
    if (selectedSize) return variants.find((v) => v.size === selectedSize);
    return variants[0];
  }, [variants, selectedColor, selectedSize]);

  return {
    variants,
    description,
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