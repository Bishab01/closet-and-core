import { useState } from "react";
import { PackagePlus, X } from "lucide-react";
import ProductForm from "../../components/retailer/productForm";
import { useProducts } from "../../hooks/useProducts";
import ProductList from "../../components/retailer/productList";
import Footer from "../../components/footer";
import Categories from "../../components/categories";
import {useCategories} from "../../hooks/useCategories";
import { fetchOneProduct } from "../../hooks/fetchOneProduct";
import { useContext } from "react";
import { SearchContext } from "../../core/App";

const apiURL = import.meta.env.VITE_API_URL;

function AdminProducts() {
    const { products, setProducts, loading, error, loadProducts } = useProducts();
    const { categories, setCategories } = useCategories();
    const fetchProduct = fetchOneProduct();

    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState("add");
    const [editingProduct, setEditingProduct] = useState(null);

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const[selectedCategory, setSelectedCategory] = useState("all");

    const [banner, setBanner] = useState("");
    const {searchTerm} = useContext(SearchContext);

    const filteredProducts = products.filter(product => {
        const matchesCategory =
            selectedCategory === "all" ||
            product.cat_name === selectedCategory;

        const matchesSearch =
            product.pname
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const openAddForm = () => {
        setFormMode("add");
        setEditingProduct(null);
        setShowForm(true);
    };

    const openEditForm = async (pid) => {
        const product = await fetchProduct(pid);
        if (product) {
            setEditingProduct(product);
            setFormMode("edit");
            setShowForm(true);
        }
    };

    const handleSaved = () => {
        setShowForm(false);
        setBanner(formMode === "edit" ? "Product updated." : "Product added.");
        loadProducts();
        setTimeout(() => setBanner(""), 2500);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            const data = await response.json();
            if (data.success) {
                setProducts((prev) => prev.filter((p) => p.pid !== deleteTarget.pid));
                
                setBanner("Product deleted.");
                setTimeout(() => setBanner(""), 2500);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDeleting(false);
            setDeleteTarget(null);
        }
    };

    return (
        <div className="body flex flex-col">
            <div className="flex-1">
            <div className="responsiveM">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <p className="text-xl md:text-2xl font-serif font-bold">Products</p>
                        <p className="text-sm text-gray-600">Manage what shows up on your storefront.</p>
                    </div>
                    <button
                        onClick={openAddForm}
                        className="button flex items-center gap-2 bg-green-800 text-white hover:bg-green-900"
                    >
                        <PackagePlus className="size-4.5" />
                        Add Product
                    </button>
                </div>
            

                {banner && (
                    <p className="font-medium rounded-md text-center py-3 text-green-600 w-fit">
                        {banner}
                    </p>
                )}
            </div>

            <Categories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                products={products}
            />

            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="responsiveM flex items-center gap-2 justify-center py-12 text-gray-500">
                        <div className="size-8 rounded-full border-2 border-green-900 border-t-transparent animate-spin" />
                        Loading products...
                    </div>
                </div>
            ) : error ? (
                <div className="responsiveM py-12 text-center text-red-600">
                    {error}
                </div>
            ) : (
                <ProductList
                    products={filteredProducts}
                    onEdit = {(pid) => openEditForm(pid)}
                    onDelete={(product) => setDeleteTarget(product)}
                />
            )}   
            </div>

            <Footer/>

            {/* Add / Edit form */}
            {showForm && (
                <ProductForm
                    mode={formMode}
                    initialProduct={editingProduct}
                    categories={categories}
                    onCategoryAdded={(category) => setCategories((prev) => [...prev, category])}
                    onClose={() => setShowForm((prev) => !prev)}
                    onSaved={handleSaved}
                />
            )}

            {/* Delete confirmation */}
            {deleteTarget && (
                <div className="popUp">
                    <div className="bg-white rounded-xl flex flex-col items-center justify-center w-80 p-5 font-sans">
                        <h1 className="font-medium text-lg mb-3 text-gray-800">Delete product?</h1>
                        <p className="text-sm text-gray-600 text-center mb-5">
                            "{deleteTarget.pname}" will be permanently removed from your storefront. This can't be undone.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="button border border-gray-400 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="button bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProducts;