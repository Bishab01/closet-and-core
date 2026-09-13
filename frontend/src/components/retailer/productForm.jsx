import { useState } from "react";
import { PackagePlus, X, ImagePlus, Plus, ChevronDown } from "lucide-react";
import VariantRow from "./variantRow";

const apiURL = import.meta.env.VITE_API_URL;
const emptyVariant = () => ({ color: "", color_hex: "#1f2421", size: "", stock: "0" });

function ProductForm({ mode, initialProduct, categories, onCategoryAdded, onClose, onSaved }) {
    const isEdit = mode === "edit";

    const [formData, setFormData] = useState({
        pname: initialProduct?.pname || "",
        cat_id: initialProduct?.cat_id ? String(initialProduct.cat_id) : "",
        price: initialProduct?.price ?? "",
        description: initialProduct?.description || "",
    });

    const [variants, setVariants] = useState(
        initialProduct?.variants?.length
            ? initialProduct.variants.map((v) => ({
                  color: v.color || "",
                  color_hex: v.color_hex || "#1f2421",
                  size: v.size || "",
                  stock: String(v.stock ?? 0),
              }))
            : [emptyVariant()]
    );

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(
        isEdit && initialProduct?.pid
            ? `${apiURL}productImage.php?pid=${initialProduct.pid}&v=${Date.now()}`
            : ""
    );

    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [addingCategory, setAddingCategory] = useState(false);

    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const updateVariant = (index, updated) => {
        setVariants((prev) => prev.map((v, i) => (i === index ? updated : v)));
    };

    const removeVariant = (index) => {
        setVariants((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
    };

    const addVariant = () => setVariants((prev) => [...prev, emptyVariant()]);

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        setAddingCategory(true);
        try {
            const response = await fetch(`${apiURL}addCategory.php`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cat_name: newCategoryName.trim() }),
            });
            const data = await response.json();
            if (data.success) {
                onCategoryAdded(data.category);
                setFormData((prev) => ({ ...prev, cat_id: String(data.category.cat_id) }));
                setNewCategoryName("");
                setShowAddCategory(false);
            } else {
                setMsg(data.message);
                setMsgType("error");
            }
        } catch (error) {
            console.error(error);
            setMsg("Failed to connect to the server.");
            setMsgType("error");
        } finally {
            setAddingCategory(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        if (!formData.pname.trim() || !formData.cat_id || formData.price === "") {
            setMsg("Product name, category and price are required.");
            setMsgType("error");
            return;
        }

        if (Number(formData.price) < 0) {
            setMsg("Price cannot be negative.");
            setMsgType("error");
            return;
        }

        if (!isEdit && !imageFile) {
            setMsg("Please choose a product image.");
            setMsgType("error");
            return;
        }

        // Drop fully-empty extra rows; keep at least the stock number
        const cleanedVariants = variants
            .filter((v) => v.color.trim() || v.size.trim() || Number(v.stock) > 0)
            .map((v) => ({
                color: v.color.trim(),
                color_hex: v.color_hex,
                size: v.size.trim(),
                stock: Number(v.stock) || 0,
            }));

        const payload = new FormData();
        payload.append("pname", formData.pname.trim());
        payload.append("cat_id", formData.cat_id);
        payload.append("price", formData.price);
        payload.append("description", formData.description.trim());
        payload.append("variants", JSON.stringify(cleanedVariants));
        if (imageFile) payload.append("image", imageFile);
        if (isEdit) payload.append("pid", initialProduct.pid);

        setSubmitting(true);
        try {
            const response = await fetch(`${apiURL}${isEdit ? "updateProduct.php" : "addProduct.php"}`, {
                method: "POST",
                credentials: "include",
                body: payload,
            });
            const data = await response.json();

            if (data.success) {
                setMsg(data.message);
                setMsgType("success");
                setTimeout(() => onSaved(), 500);
            } else {
                setMsg(data.message);
                setMsgType("error");
            }
        } catch (error) {
            console.error(error);
            setMsg("Failed to connect to the server.");
            setMsgType("error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="popUp p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-none
                font-sans text-[14.5px]"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-2">
                        <PackagePlus className="size-5 text-green-900 shrink-0" />
                        <h1 className="font-serif font-bold text-lg text-gray-900">
                            {isEdit ? "Edit Product" : "Add Product"}
                        </h1>
                    </div>
                    <button type="button" onClick={onClose}>
                        <X className="size-5 text-gray-600 hover:text-gray-800" />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    {/* Product name */}
                    <div>
                        <label className="label">Product Name</label>
                        <input
                            type="text"
                            name="pname"
                            maxLength={40}
                            value={formData.pname}
                            onChange={handleChange}
                            placeholder="e.g. Round Neck Cotton T-shirt"
                            className="inputBox"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="label">Category</label>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="relative w-full">
                                <select
                                    name="cat_id"
                                    value={formData.cat_id}
                                    onChange={handleChange}
                                    className="w-full h-8.5 px-2 pr-8 rounded-sm border border-gray-400 bg-gray-200
                                    outline-none focus:outline-green-800 appearance-none"
                                >
                                    <option value="" disabled>Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.cat_id} value={cat.cat_id}>
                                            {cat.cat_name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="size-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowAddCategory((prev) => !prev)}
                                title="Add new category"
                                className="shrink-0 flex items-center justify-center size-8.5 rounded-sm border
                                border-gray-400 text-gray-700 hover:bg-gray-100"
                            >
                                <Plus className="size-4" />
                            </button>
                        </div>

                        {showAddCategory && (
                            <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="New category name"
                                    className="inputBox mt-0"
                                />
                                <button
                                    type="button"
                                    disabled={addingCategory}
                                    onClick={handleAddCategory}
                                    className="button bg-green-800 text-white text-sm whitespace-nowrap hover:bg-green-900 disabled:opacity-60"
                                >
                                    {addingCategory ? "Adding..." : "Add"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="label">Price (Rs)</label>
                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="e.g. 1499"
                            className="inputBox"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="label">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Fabric, fit, styling notes..."
                            className="inputBox h-auto! py-2 resize-none"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="label">Product Image</label>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="size-20 rounded-xl border border-gray-300 border-dashed overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="object-cover h-full w-full" />
                                ) : (
                                    <ImagePlus className="size-6 text-gray-400" />
                                )}
                            </div>
                            <label className="button border border-gray-400 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm">
                                Choose File (png/jpeg/webp)
                                <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Variants */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="label">Variants & Stock</label>
                            <button
                                type="button"
                                onClick={addVariant}
                                className="flex items-center gap-1 text-sm text-green-800 font-medium hover:text-green-950"
                            >
                                <Plus className="size-4" /> Add Variant
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 mb-2">
                            Leave size blank for a single "one size" product — set the stock count and color.
                        </p>
                        <div className="space-y-2">
                            {variants.map((variant, i) => (
                                <VariantRow
                                    key={i}
                                    variant={variant}
                                    onChange={(updated) => updateVariant(i, updated)}
                                    onRemove={() => removeVariant(i)}
                                />
                            ))}
                        </div>
                    </div>

                    {msg && (
                        <p
                            className={`font-medium rounded-md text-center px-3 py-1.5 ${
                                msgType === "success" ? "text-green-600 bg-green-200" : "text-red-500 bg-red-200"
                            }`}
                        >
                            {msg}
                        </p>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="button border border-gray-400 text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <input
                            type="submit"
                            disabled={submitting}
                            value={submitting ? "Saving..." : isEdit ? "Save Changes" : "Save Product"}
                            className="button bg-green-800 text-white hover:bg-green-900 disabled:opacity-60 cursor-pointer"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;