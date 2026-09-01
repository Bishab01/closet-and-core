import { useEffect, useState } from "react";
import { PackagePlus, PackageSearch, Pencil, Trash2, X } from "lucide-react";
import ProductForm from "../../components/admin/productForm";

const apiURL = import.meta.env.VITE_API_URL;

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState("add");
    const [editingProduct, setEditingProduct] = useState(null);

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const [banner, setBanner] = useState("");

    const loadCategories = async () => {
        try {
            const response = await fetch(`${apiURL}getCategories.php`, { credentials: "include" });
            const data = await response.json();
            if (data.success) setCategories(data.categories);
        } catch (error) {
            console.error(error);
        }
    };

    const loadProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiURL}getProducts.php`, { credentials: "include" });
            const data = await response.json();
            if (data.success) setProducts(data.products);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
        loadProducts();
    }, []);

    const openAddForm = () => {
        setFormMode("add");
        setEditingProduct(null);
        setShowForm(true);
    };

    const openEditForm = async (pid) => {
        try {
            const response = await fetch(`${apiURL}getProduct.php?pid=${pid}`, { credentials: "include" });
            const data = await response.json();
            if (data.success) {
                setEditingProduct(data.product);
                setFormMode("edit");
                setShowForm(true);
            }
        } catch (error) {
            console.error(error);
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
            const response = await fetch(`${apiURL}deleteProduct.php`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pid: deleteTarget.pid }),
            });
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
        <div className="body">
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
                    <p className="mt-4 font-medium rounded-md text-center px-3 py-1.5 text-green-600 bg-green-200 w-fit">
                        {banner}
                    </p>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center py-16">
                        <div className="size-8 rounded-full border-2 border-green-900 border-t-transparent animate-spin" />
                    </div>
                )}

                {/* Empty state */}
                {!loading && products.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-center p-16 gap-4 mt-6
                        border border-dashed bg-white/60 rounded-3xl">
                        <PackageSearch className="w-12 h-12 text-gray-400" />
                        <p className="text-xl sm:text-2xl font-serif font-bold">No products yet</p>
                        <p className="text-gray-600 max-w-md">
                            Add your first product and it'll show up on the storefront right away.
                        </p>
                        <button
                            onClick={openAddForm}
                            className="button bg-green-800 text-white px-6 hover:bg-green-900"
                        >
                            Add Product
                        </button>
                    </div>
                )}

                {/* Product list */}
                {!loading && products.length > 0 && (
                    <div className="gridLayout my-6">
                        {products.map((product) => (
                            <div
                                key={product.pid}
                                className="flex flex-col rounded-2xl border-gray-400 border bg-white/60 overflow-hidden"
                            >
                                <div className="aspect-8/9 overflow-hidden bg-gray-100">
                                    <img
                                        src={`${apiURL}productImage.php?pid=${product.pid}&v=${product.imageVersion}`}
                                        alt={product.pname}
                                        className="object-cover h-full w-full"
                                    />
                                </div>

                                <div className="mx-3 my-3 font-serif flex-1">
                                    <p className="text-gray-600 mb-1 text-sm">{product.cat_name}</p>
                                    <p className="text-[16px] line-clamp-2">{product.pname}</p>
                                </div>

                                <div className="mx-3 mb-2 flex items-center justify-between text-sm">
                                    <span className="font-medium font-serif">Rs {product.price.toLocaleString()}</span>
                                    <span className={product.stock > 0 ? "text-gray-600" : "text-red-500 font-medium"}>
                                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                    </span>
                                </div>

                                <div className="border-t border-gray-300 flex divide-x divide-gray-300">
                                    <button
                                        onClick={() => openEditForm(product.pid)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        <Pencil className="size-3.5" /> Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteTarget(product)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                                    >
                                        <Trash2 className="size-3.5" /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add / Edit form */}
            {showForm && (
                <ProductForm
                    mode={formMode}
                    initialProduct={editingProduct}
                    categories={categories}
                    onCategoryAdded={(cat) => setCategories((prev) => [...prev, cat])}
                    onClose={() => setShowForm(false)}
                    onSaved={handleSaved}
                />
            )}

            {/* Delete confirmation */}
            {deleteTarget && (
                <div className="popUp">
                    <div className="bg-white rounded-xl w-80 p-5 font-sans">
                        <div className="flex items-center justify-between mb-3">
                            <h1 className="font-medium text-lg text-gray-800">Delete product?</h1>
                            <button onClick={() => setDeleteTarget(null)}>
                                <X className="size-5 text-gray-600 hover:text-gray-800" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-5">
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