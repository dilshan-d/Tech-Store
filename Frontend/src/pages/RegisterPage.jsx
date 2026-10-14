import { useState } from "react";
import { uploadMedia } from "../utils/mediaUpload";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserRegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);
    
    async function handleSave() {
        if (!email || !firstName || !lastName || !password) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        try {
            let imageUrl = "";
            if (image.length > 0) {
                imageUrl = await uploadMedia(image[0]);
            }
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                ...(imageUrl && { image: imageUrl })
            };
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/users/",
                userData
            );

            console.log("Server response:", response.data);
            toast.success("Registration successful!");
            
            setEmail("");
            setFirstName("");
            setLastName("");
            setPassword("");
            setImage([]);
            
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        } catch (error) {
            console.error("Register Failed:", error);
            const errMsg = error.response?.data?.message || error.message;
            toast.error("Register Failed: " + errMsg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 py-12 px-4 md:px-8 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/5 blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Glassmorphic Sticky Header */}
                <div className="w-full glass-panel backdrop-blur-md text-white rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-6 z-20 shadow-2xl border border-white/5">
                    <div>
                        <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                            Join TechStore
                        </span>
                        <h1 className="text-xl md:text-2xl font-black mt-2">Create <span className="text-gradient">Account</span></h1>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 text-xs disabled:opacity-50"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                        <button
                            className="flex-1 sm:flex-none px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 rounded-2xl transition duration-300 text-xs"
                            onClick={() => window.location.href = "/login"}
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="w-full mt-8 p-6 md:p-8 flex flex-col gap-6 bg-slate-900/30 border border-white/5 shadow-2xl rounded-3xl backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/60 border border-white/5 p-5 rounded-2xl">
                            <label className="block text-slate-400 font-bold text-[10px] uppercase tracking-wider">Email Address <span className="text-rose-500">*</span></label>
                            <input
                                type="email"
                                className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 mt-2 text-slate-200 text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="bg-slate-900/60 border border-white/5 p-5 rounded-2xl">
                            <label className="block text-slate-400 font-bold text-[10px] uppercase tracking-wider">Password <span className="text-rose-500">*</span></label>
                            <input
                                type="password"
                                className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 mt-2 text-slate-200 text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition"
                                placeholder="Enter a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/60 border border-white/5 p-5 rounded-2xl">
                            <label className="block text-slate-400 font-bold text-[10px] uppercase tracking-wider">First Name <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 mt-2 text-slate-200 text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="bg-slate-900/60 border border-white/5 p-5 rounded-2xl">
                            <label className="block text-slate-400 font-bold text-[10px] uppercase tracking-wider">Last Name <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 mt-2 text-slate-200 text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition"
                                placeholder="Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-white/5 p-5 rounded-2xl">
                        <label className="block text-slate-400 font-bold text-[10px] uppercase tracking-wider">Profile Picture <span className="text-slate-500 font-normal lowercase">(optional)</span></label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 mt-2 text-slate-400 text-xs focus:border-blue-500 outline-none transition cursor-pointer file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20"
                            onChange={(e) => setImage(Array.from(e.target.files))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}