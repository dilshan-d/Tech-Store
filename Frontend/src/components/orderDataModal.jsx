import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { FiX, FiCheckCircle, FiUser, FiInfo, FiLayers } from "react-icons/fi";

export default function OrderDataModal(props) {
    const order = props.order;
    const refresh = props.refresh;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notes, setNotes] = useState(props.order.notes || "");
    const [status, setStatus] = useState(props.order.status);
    const [isUpdating, setIsUpdating] = useState(false);

    const orderItems = order.items || order.item || [];

    const totalQuantity = orderItems.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
    );

    async function UpdateOrder() {
        setIsUpdating(true);

        try {
            const token = localStorage.getItem("token");

            await api.put(
                "/orders/" + order.orderId,
                {
                    notes,
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Order updated successfully");

            if (refresh) {
                refresh();
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update order");
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <>
            <button
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 px-4 py-2 rounded-xl text-xs font-bold transition duration-150"
                onClick={() => setIsModalOpen(true)}
            >
                Order Details
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 relative text-left animate-in zoom-in-95 duration-200">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-white transition duration-200 focus:outline-none"
                        >
                            <FiX className="text-xl" />
                        </button>

                        {/* Header */}
                        <div className="mb-8">
                            <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                Order Dashboard Detail
                            </span>
                            <h2 className="text-xl md:text-2xl font-black text-white mt-3 tracking-tight">
                                Order Specification
                            </h2>
                            <p className="text-slate-500 text-xs mt-1 font-mono uppercase tracking-wider">
                                Order ID: #{order.orderId}
                            </p>
                        </div>

                        {/* Customer Information */}
                        <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-6 mb-8">
                            <h3 className="text-sm font-bold text-slate-200 mb-4 tracking-wider flex items-center gap-1.5 uppercase">
                                <FiUser className="text-blue-400" /> Customer & Shipping Info
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                <div>
                                    <span className="font-semibold text-slate-500 mr-2">Status:</span>
                                    <span
                                        className={`px-3 py-0.5 rounded-full text-[10px] font-bold border ${
                                            status === "Delivered"
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : status === "Cancelled"
                                                ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                : status === "Processing" || status === "Pending"
                                                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                        }`}
                                    >
                                        {status}
                                    </span>
                                </div>

                                <div>
                                    <span className="font-semibold text-slate-500 mr-2">Date:</span>
                                    <span className="font-bold text-slate-350">
                                        {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                                    </span>
                                </div>

                                <div>
                                    <span className="font-semibold text-slate-500 mr-2">First Name:</span>
                                    <span className="font-bold text-slate-200">{order.firstName}</span>
                                </div>

                                <div>
                                    <span className="font-semibold text-slate-500 mr-2">Last Name:</span>
                                    <span className="font-bold text-slate-200">{order.lastName}</span>
                                </div>

                                <div>
                                    <span className="font-semibold text-slate-500 mr-2">Email:</span>
                                    <span className="font-bold text-slate-200">{order.email}</span>
                                </div>

                                <div>
                                    <span className="font-semibold text-slate-500 mr-2">Phone:</span>
                                    <span className="font-bold text-slate-200">{order.phoneNumber}</span>
                                </div>

                                <div>
                                    <span className="font-semibold text-slate-500 mr-2">City:</span>
                                    <span className="font-bold text-slate-200">{order.city}</span>
                                </div>

                                <div>
                                    <span className="font-semibold text-slate-500 mr-2">State:</span>
                                    <span className="font-bold text-slate-200">{order.state}</span>
                                </div>

                                <div className="md:col-span-2">
                                    <span className="font-semibold text-slate-500 mr-2">Address:</span>
                                    <span className="font-bold text-slate-200">
                                        {order.addressLineOne}, {order.addressLineTwo}
                                    </span>
                                </div>

                                {/* Notes */}
                                <div className="md:col-span-2 mt-4">
                                    <label className="block text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-2">
                                        Order Notes
                                    </label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full min-h-[80px] bg-slate-950 border border-white/5 rounded-xl p-3 text-slate-200 text-xs resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition"
                                        placeholder="Add internal manager notes here..."
                                    />
                                </div>

                                {/* Status Action */}
                                <div className="md:col-span-2 mt-2">
                                    <label className="block text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-2">
                                        Order Status Action
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-slate-200 text-xs cursor-pointer focus:border-blue-500 outline-none flex-1"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>

                                        <button
                                            disabled={isUpdating}
                                            onClick={UpdateOrder}
                                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition duration-150 disabled:opacity-50 text-xs sm:w-auto w-full"
                                        >
                                            {isUpdating ? "Updating..." : "Update Status"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-200 mb-4 tracking-wider flex items-center gap-1.5 uppercase">
                                <FiLayers className="text-cyan-400" /> Ordered Products
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {orderItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 shadow-sm flex gap-4"
                                    >
                                        <img
                                            src={item.product?.image || item.product?.images?.[0] || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150"}
                                            alt={item.product?.productName}
                                            className="w-16 h-16 object-cover rounded-xl border border-white/5 shadow-sm"
                                        />

                                        <div className="flex-1 flex flex-col justify-between min-w-0">
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-200 truncate">
                                                    {item.product?.productName}
                                                </h4>
                                                <p className="text-[10px] text-slate-500 mt-1">
                                                    Qty: <span className="font-bold text-slate-350">{item.quantity}</span> × LKR {Number(item.product?.price || 0).toLocaleString()}
                                                </p>
                                            </div>

                                            <p className="text-xs font-black text-cyan-400 text-right mt-2">
                                                LKR {Number((item.product?.price || 0) * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary Footer */}
                            <div className="mt-8 bg-slate-950/50 border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="text-xs text-slate-400 font-semibold">
                                    Total Items: <span className="text-slate-200 font-bold ml-1">{totalQuantity}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-400 font-semibold mr-2">Grand Total</span>
                                    <span className="text-lg font-black text-cyan-400 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2 shadow-sm">
                                        LKR {Number(order.total || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}