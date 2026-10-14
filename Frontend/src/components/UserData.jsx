import { useEffect, useState, useRef } from "react";
import api from "../utils/api.js";
import { Link, useNavigate } from "react-router-dom";
import { FiSettings, FiShoppingBag, FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";

export default function UserData() {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            api.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
                localStorage.removeItem("token");
            });
        }
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsOpen(false);
        navigate("/*");
    };

    return (
        <div className="relative text-sm" ref={dropdownRef}>
            {user ? (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-white/5 transition duration-300 focus:outline-none"
                    >
                        <img
                            src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80"}
                            alt="Profile"
                            className="w-8 h-8 rounded-lg object-cover border border-blue-500/30"
                        />
                        <span className="hidden sm:inline font-semibold text-slate-200 text-xs max-w-[100px] truncate">
                            {user.firstName}
                        </span>
                        <FiChevronDown className={`text-slate-400 text-xs transition duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
                    </button>

                    {/* Custom Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl glass-panel border border-white/10 shadow-2xl py-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-4 py-2 border-b border-white/5">
                                <p className="text-[11px] text-slate-450 uppercase font-bold tracking-wider">Signed In As</p>
                                <p className="font-bold text-slate-200 text-xs truncate mt-0.5">{user.firstName} {user.lastName}</p>
                            </div>
                            
                            <Link
                                to="/profile"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition duration-200"
                            >
                                <FiUser className="text-slate-400 text-sm" />
                                My Profile
                            </Link>

                            <Link
                                to="/settings"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition duration-200"
                            >
                                <FiSettings className="text-slate-400 text-sm" />
                                Settings
                            </Link>

                            <Link
                                to="/my-orders"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition duration-200"
                            >
                                <FiShoppingBag className="text-slate-400 text-sm" />
                                My Orders
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-rose-400 hover:text-rose-350 hover:bg-rose-500/10 transition duration-200 text-left border-t border-white/5 mt-1"
                            >
                                <FiLogOut className="text-rose-400 text-sm" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/5 hover:border-white/10 rounded-xl font-bold transition duration-300 text-xs"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition duration-300 text-xs"
                    >
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
}