import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";
import { FiSearch, FiCpu, FiMonitor, FiSmartphone, FiClock } from "react-icons/fi";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        if (!isLoaded) {
            axios.get(import.meta.env.VITE_API_URL + "/products")
                .then((response) => {
                    setProducts(response.data);
                    setFilteredProducts(response.data);
                    setIsLoaded(true);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                });
        }
    }, [isLoaded]);

    // Handle search and filtering
    useEffect(() => {
        let result = products;

        if (searchQuery.trim() !== "") {
            result = result.filter(p => 
                p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== "All") {
            result = result.filter(p => p.category === selectedCategory);
        }

        setFilteredProducts(result);
    }, [searchQuery, selectedCategory, products]);

    const categories = [
        { name: "All", icon: <FiCpu /> },
        { name: "Laptops", icon: <FiMonitor /> },
        { name: "Audio", icon: <FiClock /> },
        { name: "Smartphones", icon: <FiSmartphone /> }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-blue-950/30 via-slate-950 to-slate-950 border-b border-white/5 py-16 md:py-24 px-6">
                {/* Glowing decorative blobs */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                        Next-Gen Gear
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-6 leading-tight">
                        Power Your Future. <br />
                        <span className="text-gradient">Upgrade Today.</span>
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base mt-6 max-w-xl mx-auto leading-relaxed">
                        Explore the absolute best in laptops, computing setups, smartphones, and ultra-high-definition audio gear.
                    </p>

                    {/* Search and Filters */}
                    <div className="mt-10 max-w-lg mx-auto relative flex items-center bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 p-1.5 shadow-2xl">
                        <FiSearch className="text-slate-400 text-lg ml-3" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-0 outline-none w-full px-3 py-2 text-slate-200 text-xs placeholder-slate-500 focus:ring-0"
                        />
                    </div>
                </div>
            </div>

            {/* Category Quick Filter */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none justify-start md:justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold tracking-tight border transition-all duration-300 ${
                                selectedCategory === cat.name
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/20"
                                    : "bg-slate-900/40 text-slate-400 border-white/5 hover:border-white/15 hover:text-slate-200"
                            }`}
                        >
                            {cat.icon}
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-6 mt-8">
                {filteredProducts.length === 0 ? (
                    <div className="w-full text-center py-20 bg-slate-900/20 rounded-3xl border border-white/5">
                        <p className="text-slate-500 text-sm">No products found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((p) => (
                            <ProductCard key={p.productID} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}