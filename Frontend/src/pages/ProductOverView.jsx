import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { LifeLine } from "react-loading-indicators";
import ImageSlideShow from "../components/ImageSlideShow";
import { addToCart, getcart } from "../utils/cart";
import toast from "react-hot-toast";
import { FiArrowLeft, FiShoppingCart, FiCreditCard, FiTrash2, FiCpu, FiTag, FiBox } from "react-icons/fi";

export default function ProductOverView() {
    const parameters = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("Loading");

    useEffect(() => {
        api.get("/products/" + parameters.productID)
            .then((response) => {
                setProduct(response.data);
                setStatus("Success");
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setStatus("Error");
            });
    }, [parameters.productID]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, 1);
            toast.success(`${product.productName} added to cart!`);
        }
    };

    const handleClearCart = () => {
        localStorage.removeItem("cart");
        toast.success("Cart cleared!");
    };

    if (status === "Error") {
        return (
            <div className="w-full min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4">
                <div className="glass-panel p-8 rounded-3xl text-center max-w-sm border border-rose-500/20">
                    <h1 className="text-2xl font-black text-rose-500 mb-2">Product Not Found</h1>
                    <p className="text-slate-400 text-xs mb-6">The requested product could not be loaded or doesn't exist.</p>
                    <button
                        onClick={() => navigate("/products")}
                        className="w-full glow-btn glow-btn-primary py-3 rounded-xl text-xs font-bold text-white"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 py-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition duration-300 text-xs font-bold"
                >
                    <FiArrowLeft /> Back
                </button>
            </div>

            {status === "Loading" && (
                <div className="w-full min-h-[60vh] flex flex-col justify-center items-center">
                    <LifeLine
                        color="#3b82f6"
                        size="medium"
                        text="Loading Gear Specifications..."
                        textColor="#94a3b8"
                    />
                </div>
            )}

            {status === "Success" && product && (
                <div className="max-w-6xl mx-auto glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                    <div className="grid md:grid-cols-2 gap-10 p-6 md:p-12">
                        {/* Slide Show Section */}
                        <div className="flex justify-center items-start">
                            <ImageSlideShow images={product.images} />
                        </div>

                        {/* Details Section */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                                    <FiTag /> {product.category}
                                </span>

                                <h1 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
                                    {product.productName}
                                </h1>

                                <p className="text-slate-400 leading-relaxed mb-8 text-xs">
                                    {product.description}
                                </p>

                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-3xl font-black text-cyan-400 tracking-tight">
                                        LKR {Number(product.price).toLocaleString()}
                                    </span>

                                    {product.stock > 0 ? (
                                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                {/* Specifications Table */}
                                <div className="space-y-3.5 border-t border-b border-white/5 py-6">
                                    <div className="flex justify-between text-xs">
                                        <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                                            <FiCpu className="text-slate-400" /> Brand
                                        </span>
                                        <span className="font-bold text-slate-200">
                                            {product.brand}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-xs">
                                        <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                                            <FiTag className="text-slate-400" /> Model
                                        </span>
                                        <span className="font-bold text-slate-200">
                                            {product.model}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-xs">
                                        <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                                            <FiBox className="text-slate-400" /> Available Stock
                                        </span>
                                        <span className="font-bold text-slate-200">
                                            {product.stock} units
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Dashboard */}
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <button
                                    className="bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-white/10 hover:border-white/20 font-bold py-3.5 rounded-2xl transition duration-300 flex items-center justify-center gap-2 text-xs"
                                    onClick={handleAddToCart}
                                >
                                    <FiShoppingCart /> Add To Cart
                                </button>

                                <Link
                                    className="glow-btn glow-btn-primary text-white font-bold py-3.5 rounded-2xl transition duration-300 flex items-center justify-center gap-2 text-xs shadow-lg"
                                    to="/checkout"
                                    state={[
                                        {
                                            product: {
                                                productID: product.productID,
                                                name: product.productName,
                                                image: product.images?.[0] || product.image || "",
                                                labelledPrice: product.labelledPrice,
                                                price: product.price
                                            },
                                            quantity: 1
                                        }
                                    ]}
                                >
                                    <FiCreditCard /> Buy Now
                                </Link>

                                <button
                                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-350 border border-rose-500/20 font-bold py-3.5 rounded-2xl transition duration-300 flex items-center justify-center gap-2 text-xs"
                                    onClick={handleClearCart}
                                >
                                    <FiTrash2 /> Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
