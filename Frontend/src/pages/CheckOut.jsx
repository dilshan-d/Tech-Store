import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getcart, addToCart, getCartTotal } from "../utils/cart";
import CreateOrderModal from "../components/CreateOrderModal";
import { FiArrowLeft, FiCheckSquare } from "react-icons/fi";
import toast from "react-hot-toast";

export default function CheckOutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(location.state);

    const handleQtyChange = (product, val) => {
        addToCart(product, val);
        setCartItems(getcart());
        toast.success("Updated item quantities");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition duration-300 text-xs font-bold"
                    >
                        <FiArrowLeft /> Back
                    </button>
                </div>

                <div className="flex items-center gap-3 mb-10">
                    <FiCheckSquare className="text-blue-400 text-2xl" />
                    <h1 className="text-3xl font-black text-white tracking-tight">
                        Checkout <span className="text-gradient">Details</span>
                    </h1>
                </div>

                {!cartItems || cartItems.length === 0 ? (
                    <div className="glass-panel rounded-3xl border border-white/5 p-12 text-center shadow-2xl">
                        <p className="text-slate-400 text-sm mb-8">No gear selected for checkout.</p>
                        <Link to="/cart" className="inline-flex items-center gap-2 glow-btn glow-btn-primary text-white font-bold px-6 py-3.5 rounded-2xl text-xs shadow-lg">
                            Return to Cart
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4">
                            {cartItems.map((productItem) => (
                                <div
                                    key={productItem.product.productID}
                                    className="bg-slate-900/30 backdrop-blur-md rounded-3xl border border-white/5 p-6 hover:border-blue-500/20 transition-all duration-300 shadow-lg"
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
                                        {/* Product Section */}
                                        <div className="flex gap-5 flex-1 items-center w-full md:w-auto">
                                            <div className="w-20 h-20 bg-slate-950/50 border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
                                                <img
                                                    src={productItem.product.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150"}
                                                    alt={productItem.product.name}
                                                    className="w-full h-full object-cover p-1"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-base font-bold text-slate-100 truncate">
                                                    {productItem.product.name}
                                                </h2>
                                                <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-wider">
                                                    ID: {productItem.product.productID}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <p className="text-base font-black text-cyan-400">
                                                        LKR {productItem.product.price.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quantity + Total */}
                                        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t border-white/5 pt-4 md:border-0 md:pt-0">
                                            <div className="flex items-center bg-slate-950 border border-white/10 rounded-2xl overflow-hidden p-0.5">
                                                <span className="w-16 text-center font-black text-slate-200 text-xs">
                                                    Qty: {productItem.quantity}
                                                </span>
                                            </div>

                                            <div className="text-right min-w-[120px]">
                                                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                                                    Total
                                                </p>
                                                <p className="text-lg font-black text-slate-200 mt-0.5">
                                                    LKR {(productItem.product.price * productItem.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Block */}
                        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-2xl backdrop-blur-sm">
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-5 py-4 w-full sm:w-auto">
                                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Order Grand Total</p>
                                <p className="text-2xl font-black text-cyan-400 mt-1 tracking-tight">
                                    LKR {getCartTotal(cartItems).toLocaleString()}
                                </p>
                            </div>

                            <CreateOrderModal cartItems={cartItems} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}