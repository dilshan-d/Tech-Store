import { useEffect, useState } from "react";
import api from "../utils/api";
import { FiUser, FiMail, FiShield, FiCpu } from "react-icons/fi";
import { LifeLine } from "react-loading-indicators";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("Loading");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            api.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setUser(response.data);
                setStatus("Success");
            })
            .catch((error) => {
                console.log(error);
                setStatus("Error");
            });
        } else {
            setStatus("Error");
        }
    }, []);

    if (status === "Loading") {
        return (
            <div className="w-full min-h-screen bg-slate-950 flex justify-center items-center">
                <LifeLine
                    color="#3b82f6"
                    size="medium"
                    text="Decrypting Profile..."
                    textColor="#94a3b8"
                />
            </div>
        );
    }

    if (status === "Error" || !user) {
        return (
            <div className="w-full min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4">
                <div className="glass-panel p-8 rounded-3xl text-center max-w-sm border border-rose-500/20">
                    <h1 className="text-xl font-black text-rose-500 mb-2">Access Denied</h1>
                    <p className="text-slate-400 text-xs mb-6 font-medium">Please sign in to view your profile details.</p>
                    <a
                        href="/login"
                        className="w-full inline-block text-center glow-btn glow-btn-primary py-3 rounded-xl text-xs font-bold text-white"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-76px)] bg-slate-950 flex justify-center items-center p-6 text-slate-100 relative overflow-hidden">
            {/* Glowing background highlights */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

            <div className="glass-panel p-8 rounded-3xl border border-white/5 shadow-2xl w-full max-w-[420px] relative z-10 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                            alt="Profile"
                            className="w-24 h-24 rounded-2xl object-cover border border-blue-500/30 p-1 bg-slate-950 shadow-lg shadow-blue-500/10"
                        />
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-green-500 border border-slate-950 flex items-center justify-center text-[10px] text-white font-bold">✓</span>
                    </div>

                    <h1 className="text-xl font-black mt-5 text-white tracking-tight">
                        {user.firstName} {user.lastName}
                    </h1>

                    <span className="mt-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-extrabold uppercase tracking-wider rounded-full">
                        {user.isAdmin ? "Administrator" : "Customer"}
                    </span>

                    <div className="w-full mt-8 space-y-3">
                        <div className="p-4 bg-slate-950/40 border border-white/5 rounded-2xl flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <FiUser className="text-slate-405" /> First Name
                            </span>
                            <span className="text-slate-200 font-bold">{user.firstName}</span>
                        </div>

                        <div className="p-4 bg-slate-950/40 border border-white/5 rounded-2xl flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <FiUser className="text-slate-405" /> Last Name
                            </span>
                            <span className="text-slate-200 font-bold">{user.lastName}</span>
                        </div>

                        <div className="p-4 bg-slate-950/40 border border-white/5 rounded-2xl flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <FiMail className="text-slate-405" /> Email
                            </span>
                            <span className="text-slate-200 font-bold truncate max-w-[190px]">{user.email}</span>
                        </div>

                        <div className="p-4 bg-slate-950/40 border border-white/5 rounded-2xl flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <FiShield className="text-slate-405" /> Admin Access
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase border ${
                                user.isAdmin 
                                    ? "bg-blue-500/15 text-blue-450 border-blue-500/25" 
                                    : "bg-slate-950 text-slate-500 border-white/5"
                            }`}>
                                {user.isAdmin ? "Granted" : "Denied"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}