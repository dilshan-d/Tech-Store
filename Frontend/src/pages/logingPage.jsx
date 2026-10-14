import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleLogin() {
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("API URL:", import.meta.env.VITE_API_URL);

        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }
        
        setLoading(true);
        axios.post(import.meta.env.VITE_API_URL + "/users/login", {
            email: email,
            password: password
        }).then((response) => {
            localStorage.setItem("token", response.data.token);
            toast.success("Welcome back!");

            if (response.data.user.isAdmin) {
                navigate("/admin");
            } else {
                navigate("/");
            }
        }).catch((error) => {
            toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-950 text-slate-100 px-4 relative overflow-hidden">
            {/* Glowing Decorative Background Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

            <div className="w-full max-w-[420px] glass-panel rounded-3xl shadow-2xl border border-white/5 flex flex-col p-8 md:p-10 relative z-10">
                <div className="text-center mb-8">
                    <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                        Secure Access
                    </span>
                    <h1 className="text-3xl font-black text-white mt-4 tracking-tight">
                        Sign <span className="text-gradient">In</span>
                    </h1>
                    <p className="text-slate-400 text-xs mt-2">Enter your credentials to manage your tech gear.</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Email Address</label>
                        <input 
                            onChange={
                                (e)=>{
                                    console.log(e.target.value)
                                    setEmail(e.target.value)
                                }
                            }
                            type="email" 
                            value={email}
                            placeholder="Email Address" 
                            className="bg-slate-900/60 border border-white/5 rounded-2xl w-full px-4 py-3.5 text-slate-100 text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all duration-300 placeholder-slate-500" 
                        />
                    </div>

                    <div>
                        <label className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Password</label>
                        <input 
                            onChange={
                                (e)=>{
                                    console.log(e.target.value)
                                    setPassword(e.target.value)
                                }
                            }
                            type="password" 
                            value={password} 
                            placeholder="Password" 
                            className="bg-slate-900/60 border border-white/5 rounded-2xl w-full px-4 py-3.5 text-slate-100 text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all duration-300 placeholder-slate-500" 
                        />
                    </div>
                </div>
                
                <button 
                    onClick={handleLogin} 
                    disabled={loading}
                    className="w-full glow-btn glow-btn-primary text-white font-bold py-4 px-4 rounded-2xl transition duration-300 text-xs shadow-lg mt-8 disabled:opacity-50"
                >
                    {loading ? "Authenticating..." : "Sign In"}
                </button>

                <div className="mt-6 text-center">
                    <p className="text-slate-400 text-xs">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-400 hover:text-cyan-400 font-bold transition duration-300">
                            Register Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}