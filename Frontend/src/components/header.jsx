import { BiCart } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import UserData from "./UserData";
import { getcart } from "../utils/cart";
import { useState, useEffect } from "react";

export default function Header() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Read initial cart size
    const cart = getcart();
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalQty);

    // Listen to changes in localStorage
    const handleStorageChange = () => {
      const updatedCart = getcart();
      const updatedQty = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(updatedQty);
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full h-[76px] bg-slate-950/80 backdrop-blur-md border-b border-white/10 flex items-center px-6 md:px-12 justify-between transition-all duration-300">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
          <span className="text-white font-black text-lg">T</span>
        </span>
        <span className="text-white group-hover:text-blue-400 text-2xl font-black tracking-tight transition duration-300 bg-gradient-to-r from-white via-white to-blue-400 bg-clip-text text-transparent">
          TechStore
        </span>
      </Link>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className={`text-sm font-medium transition duration-300 relative py-1 hover:text-blue-400 ${
            location.pathname === "/" ? "text-blue-400 font-semibold" : "text-slate-300"
          }`}
        >
          Home
          {location.pathname === "/" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
          )}
        </Link>
        <Link
          to="/products"
          className={`text-sm font-medium transition duration-300 relative py-1 hover:text-blue-400 ${
            location.pathname === "/products" ? "text-blue-400 font-semibold" : "text-slate-300"
          }`}
        >
          Products
          {location.pathname === "/products" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
          )}
        </Link>
        <Link
          to="/contact-us"
          className={`text-sm font-medium transition duration-300 relative py-1 hover:text-blue-400 ${
            location.pathname === "/contact-us" ? "text-blue-400 font-semibold" : "text-slate-300"
          }`}
        >
          Contact Us
          {location.pathname === "/contact-us" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
          )}
        </Link>
      </nav>

      {/* User Actions */}
      <div className="flex items-center gap-6">
        <UserData />
        <Link
          to="/cart"
          className="p-2.5 bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/10 rounded-xl transition duration-300 relative flex items-center justify-center group"
        >
          <BiCart className="text-slate-200 group-hover:text-blue-400 text-2xl transition duration-300" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse border border-slate-950">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}