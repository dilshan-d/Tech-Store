import { useEffect, useState } from "react";
import { uploadMedia } from "../../utils/mediaUpload";
import { useLocation , useNavigate} from "react-router-dom";
import axios from "axios";

export default function AdminEditProductPage() {
    
    const location = useLocation();
    const navigate = useNavigate();

    const [productID, setProductID] = useState(location.state?.productID || "");
    const [productName, setProductName] = useState(location.state?.productName || "");
    const [alternativeName, setAlternativeName] = useState(location.state?.alternativeName?.join(", ") || "");
    const [price, setPrice] = useState(location.state?.price || "");
    const [labelledPrice, setLabelledPrice] = useState(location.state?.labelledPrice || "");
    const [description, setDescription] = useState(location.state?.description || "");
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState(location.state?.brand || "");
    const [model, setModel] = useState(location.state?.model || "");
    const [category, setCategory] = useState(location.state?.category || "");
    const [isAvailable, setIsAvailable] = useState(location.state?.isAvailable);
    const [stock, setStock] = useState(location.state?.stock || "");
    const [rating, setRating] = useState(location.state?.rating || "");

    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
            if (!location.state) {
                alert("No product data found. Please select a product to edit.");
                navigate("/admin/products");
            }

        }, []
    );


    async function handleUpdate() {
        try {

            setIsUpdating(true);
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found");
                window.location.href = "/login";
                return;
            }

            const mediaUrls = [];

            for (let i = 0; i < images.length; i++) {
                mediaUrls.push(uploadMedia(images[i]));
            }

            const urls = await Promise.all(mediaUrls);
            const altNamesArray = alternativeName.split(",");

            const productData = {
                productName: productName,
                alternativeName: altNamesArray,
                price: price,
                labelledPrice: labelledPrice,
                description: description,
                images: urls,
                brand : brand,
                model : model,
                category : category,
                isAvailable: isAvailable,
                stock: stock,
                rating: rating
            };

            if(urls.length === 0){
                productData.images = location.state.images;
            }

            const response  = await axios.put(import.meta.env.VITE_API_URL + "/products/" + productID, productData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("Server response:", response.data);

            setIsUpdating(false);

            if (response.status === 200 || response.status === 201) {
                alert("Product updated successfully!");
                navigate("/admin/products");
            } else {
                alert("Failed to update product.");
            }
        } catch (error) {
            setIsUpdating(false);
            console.error("Error Updating product:", error);
            alert("Error Updating product: " + error.message);
        }
    }

    return (
        <div className="w-full min-h-screen bg-slate-50 py-10 px-4 md:px-8 text-slate-800">
            <div className="max-w-4xl mx-auto">
                <div className="w-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white rounded-2xl shadow-md p-6 flex justify-between items-center sticky top-4 z-20">
                    <h1 className="text-2xl font-extrabold tracking-tight">Edit Product</h1>

                    <div className="flex items-center gap-3"> 
                        <button 
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-md shadow-emerald-600/10 hover:scale-[1.02] text-xs disabled:opacity-50" 
                            disabled={isUpdating}
                            onClick={handleUpdate}
                        >
                            {isUpdating ? "Updating..." : "Update Product"}
                        </button> 
                        <button 
                            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition shadow-md shadow-rose-600/10 hover:scale-[1.02] text-xs"
                            onClick={() => navigate("/admin/products")}
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                <div className="w-full mt-8 p-6 md:p-8 bg-white border border-slate-100 shadow-xl rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-800">

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Product ID</label>
                        <input
                            type="text"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-slate-100/70 text-slate-500 text-sm outline-none cursor-not-allowed"
                            value={productID}
                            disabled={true}
                            onChange={(e) => setProductID(e.target.value)}
                        />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Product Name</label>
                        <input
                            type="text"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-800 transition"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Alternative Names</label>
                        <input
                            type="text"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-800 transition"
                            value={alternativeName}
                            onChange={(e) => setAlternativeName(e.target.value)}
                        />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Price (LKR)</label>
                        <input
                            type="number"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-800 transition"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Labelled Price (LKR)</label>
                        <input
                            type="number"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-800 transition"
                            value={labelledPrice}
                            onChange={(e) => setLabelledPrice(e.target.value)}
                        />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center md:col-span-2">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Description</label>
                        <textarea
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-800 transition resize-none"
                            rows="2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center md:col-span-2">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Images</label>
                        <input
                            type="file"
                            multiple={true}
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-800 transition cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={(e) => setImages(Array.from(e.target.files))}
                        />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Brand</label>
                        <input
                            type="text"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-800 transition"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Model</label>
                        <input
                            type="text"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-800 transition"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Category</label>
                        <select 
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-800 transition cursor-pointer"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Smartphone">Smartphone</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Headphones">Headphones</option>
                            <option value="Smartwatch">Smartwatch</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Camera">Camera</option>
                        </select>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Stock Qty</label>
                        <input
                            type="number"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-800 transition"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                        <label className="block text-slate-600 font-bold text-xs uppercase tracking-wider">Rating</label>
                        <input
                            type="number"
                            step="0.1"
                            max="5"
                            min="0"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 mt-2 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-800 transition"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between">
                        <span className="text-slate-600 font-bold text-xs uppercase tracking-wider">Is Available</span>
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            checked={isAvailable}
                            onChange={(e) => setIsAvailable(e.target.checked)}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}