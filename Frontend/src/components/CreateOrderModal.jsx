import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { FiX, FiCheckCircle } from "react-icons/fi";

export default function CreateOrderModal(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLineOne, setAddressLineOne] = useState("");
    const [addressLineTwo, setAddressLineTwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const cart = props.cartItems;

    async function createOrder() {
        if (!firstName || !lastName || !addressLineOne || !city || !postalCode || !phoneNumber) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const data = {
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phoneNumber,
                items: []
            };
            
            for (let i = 0; i < cart.length; i++) {
                const item = cart[i];
                data.items.push({
                    productId: item.product.productID,
                    quantity: item.quantity
                });
            }

            await api.post("/orders", data, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            toast.success("Order Placed Successfully!");
            setIsModalOpen(false);
            
            // Clear cart
            localStorage.removeItem("cart");

            // Redirect home
            setTimeout(() => {
                window.location.href = "/my-orders";
            }, 1000);

        } catch (error) {
            toast.error("Error Placing Order: " + (error.response?.data?.message || error.message));
        }
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto glow-btn glow-btn-emerald text-white px-8 py-4 rounded-2xl font-bold text-xs shadow-lg transition duration-200"
            >
                Order Now
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-slate-900 border border-white/10 w-full max-w-xl rounded-3xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
                        
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-white transition duration-200 focus:outline-none"
                        >
                            <FiX className="text-xl" />
                        </button>

                        <div className="mb-6">
                            <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                Shipping Details
                            </span>
                            <h2 className="text-xl md:text-2xl font-black text-white mt-3 tracking-tight">
                                Delivery Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div>
                                <label className="block text-slate-400 font-bold text-[10px] mb-1.5 uppercase tracking-wider">
                                    First Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-slate-200 text-xs transition"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 font-bold text-[10px] mb-1.5 uppercase tracking-wider">
                                    Last Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-slate-200 text-xs transition"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-slate-400 font-bold text-[10px] mb-1.5 uppercase tracking-wider">
                                    Address Line 1 <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={addressLineOne}
                                    onChange={(e) => setAddressLineOne(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-slate-200 text-xs transition"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-slate-400 font-bold text-[10px] mb-1.5 uppercase tracking-wider">
                                    Address Line 2
                                </label>
                                <input
                                    type="text"
                                    value={addressLineTwo}
                                    onChange={(e) => setAddressLineTwo(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-slate-200 text-xs transition"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 font-bold text-[10px] mb-1.5 uppercase tracking-wider">
                                    City <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-slate-200 text-xs transition"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 font-bold text-[10px] mb-1.5 uppercase tracking-wider">
                                    State
                                </label>
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-slate-200 text-xs transition"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 font-bold text-[10px] mb-1.5 uppercase tracking-wider">
                                    Postal Code <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-slate-200 text-xs transition"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 font-bold text-[10px] mb-1.5 uppercase tracking-wider">
                                    Phone Number <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none text-slate-200 text-xs transition"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/5">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-3 bg-slate-950 hover:bg-slate-900 border border-white/5 text-slate-400 hover:text-white rounded-xl font-bold text-xs transition duration-200"
                            >
                                Cancel
                            </button>

                            <button
                                className="px-6 py-3 glow-btn glow-btn-emerald text-white rounded-xl font-bold text-xs shadow-lg transition duration-200 flex items-center gap-1.5"
                                onClick={createOrder}
                            >
                                <FiCheckCircle /> Place Order
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}