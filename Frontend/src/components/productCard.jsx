import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function ProductCard(props) {
    const product = props.product;
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div className="glass-panel rounded-3xl overflow-hidden hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group">
            <Link to={"/Overview/" + product.productID} state={product} className="block flex-1">
                <div className="relative overflow-hidden aspect-[4/3] bg-slate-950/40 border-b border-white/5 flex items-center justify-center">
                    <img
                        src={product.images?.[currentImage] || product.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500"}
                        alt={product.productName}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                        onMouseEnter={() => product.images?.length > 1 && setCurrentImage(1)}
                        onMouseLeave={() => setCurrentImage(0)}
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                </div>

                <div className="p-6">
                    <h2 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                        {product.productName}
                    </h2>

                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>
            </Link>

            <div className="p-6 pt-0 mt-auto">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Price</span>
                        <p className="text-xl font-black text-cyan-400 tracking-tight">
                            LKR {Number(product.price).toLocaleString()}
                        </p>
                    </div>
                    {product.labelledPrice && product.labelledPrice > product.price && (
                        <p className="text-xs text-slate-500 line-through">
                            LKR {Number(product.labelledPrice).toLocaleString()}
                        </p>
                    )}
                </div>

                <Link
                    className="w-full glow-btn glow-btn-primary text-white font-bold py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-xs shadow-lg"
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
                    Buy Now
                    <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}