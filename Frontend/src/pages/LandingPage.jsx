import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiPercent, FiPhoneCall, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import TrendingProduct from "../components/trendingProduct";

export default function LandingPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
            title: "Premium Computing",
            desc: "Ultra-thin design, high resolution displays, and maximum CPU performance."
        },
        {
            image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
            title: "Next-Gen Wearables",
            desc: "Track fitness metrics, notifications, and vital stats in real-time."
        },
        {
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
            title: "Immersive Audio",
            desc: "Studio-grade noise cancelling headsets and true wireless earbuds."
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 pb-16">
            {/* Hero Main Banner Container */}
            <div className="relative overflow-hidden bg-gradient-to-b from-blue-950/20 via-slate-950 to-slate-950 py-16 md:py-24 px-6 md:px-12 border-b border-white/5">
                {/* Neon Background Decorative Glows */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    {/* Left Column Content */}
                    <div className="text-left space-y-6">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest">
                            ● New Arrival
                        </span>
                        
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                            Upgrade Your <br />
                            <span className="text-gradient">Tech Life Style</span>
                        </h1>
                        
                        <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
                            Discover the latest gadgets and electronics that make life smarter, easier, and better. Explore next-gen specifications today.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                to="/products"
                                className="glow-btn glow-btn-primary text-white font-bold py-3.5 px-8 rounded-2xl transition duration-300 text-xs shadow-lg flex items-center gap-2"
                            >
                                Shop now
                                <FiArrowRight className="text-sm" />
                            </Link>

                            <Link
                                to="/contact-us"
                                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-white/10 rounded-2xl font-bold transition duration-300 text-xs"
                            >
                                Contact us
                            </Link>
                        </div>
                    </div>

                    {/* Right Column Slideshow */}
                    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl group">
                        <img
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            className="w-full h-full object-cover transition-all duration-700 ease-out"
                        />
                        {/* Slide Overlay Info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6 md:p-8">
                            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                                {slides[currentSlide].title}
                            </h3>
                            <p className="text-slate-350 text-xs mt-1 max-w-md">
                                {slides[currentSlide].desc}
                            </p>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-950/80 hover:bg-blue-600 text-white flex items-center justify-center border border-white/5 hover:border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none"
                        >
                            <FiChevronLeft className="text-lg" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-950/80 hover:bg-blue-600 text-white flex items-center justify-center border border-white/5 hover:border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none"
                        >
                            <FiChevronRight className="text-lg" />
                        </button>

                        {/* Bullets Indicator */}
                        <div className="absolute top-4 right-4 flex gap-1.5 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                        currentSlide === idx ? "bg-blue-400 w-3.5" : "bg-slate-500"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Row */}
            <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all duration-300 shadow-xl flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 text-xl">
                            <FiShield />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white">Top Quality Products</h4>
                            <p className="text-slate-400 text-xs mt-1">Premium brands, highest industry quality.</p>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all duration-300 shadow-xl flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400 text-xl">
                            <FiPercent />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white">Best Prices</h4>
                            <p className="text-slate-400 text-xs mt-1">Competitive prices & unbeatable value.</p>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all duration-300 shadow-xl flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 text-xl">
                            <FiPhoneCall />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white">Expert Support</h4>
                            <p className="text-slate-400 text-xs mt-1">We are ready to assist you 24/7/365.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending Products Showcase */}
            <div className="mt-8">
                <TrendingProduct />
            </div>
        </div>
    );
}
