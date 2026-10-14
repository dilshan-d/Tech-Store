import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
import axios from "axios";
import ProductDeleteModal from "../../components/ProductDeleteModal";

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const token = localStorage.getItem("token");

            axios
                .get(import.meta.env.VITE_API_URL + "/products", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    setProducts(response.data);
                    setIsLoading(true);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                });
        }
    }, [isLoading]);

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8 text-slate-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Product Dashboard
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Manage all store products, stock levels, and pricing.
                        </p>
                    </div>

                    <Link
                        to="/admin/add-product"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/10 transition duration-150 hover:scale-[1.02] text-sm"
                    >
                        <MdOutlineAdd size={18} />
                        Add Product
                    </Link>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto max-h-[75vh]">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 z-10">
                                <tr className="bg-slate-900 text-white">
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Label Price</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Brand</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Model</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {products.map((product) => (
                                    <tr
                                        key={product.productID}
                                        className="hover:bg-slate-50/70 transition duration-150"
                                    >
                                        <td className="px-6 py-4">
                                            <img
                                                src={product.images?.[0]}
                                                alt={product.productName}
                                                className="w-14 h-14 rounded-xl object-cover border border-slate-100 shadow-sm transition hover:scale-105"
                                            />
                                        </td>

                                        <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                                            {product.productID}
                                        </td>

                                        <td className="px-6 py-4 text-slate-800 font-bold">
                                            {product.productName}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-emerald-600 font-extrabold">
                                                LKR {Number(product.price).toLocaleString()}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-slate-400 line-through">
                                            LKR {Number(product.price * 1.2).toLocaleString()}
                                        </td>

                                        <td className="px-6 py-4 text-slate-600 font-medium">
                                            {product.brand}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="bg-sky-50 text-sky-800 border border-sky-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            {product.stock > 0 ? (
                                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                                    In Stock
                                                </span>
                                            ) : (
                                                <span className="bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-slate-500 font-medium">
                                            {product.model || "N/A"}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold">
                                                {product.stock}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <ProductDeleteModal
                                                    product={product}
                                                    refresh={() => setIsLoading(false)}
                                                />

                                                <Link
                                                    to="/admin/edit-product"
                                                    state={product}
                                                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 px-3.5 py-1.5 rounded-xl text-xs font-bold transition duration-150"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}