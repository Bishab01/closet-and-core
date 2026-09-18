import { getOneProduct } from "../api/oneProduct";

export function fetchOneProduct() {
    const fetchProduct = async (pid) => {
        try {
            const response = await getOneProduct(pid);
            return response;
        } 
        catch (error) {
            console.error("Error fetching product:", error);
            return null;
        }
    };

    return fetchProduct;
}