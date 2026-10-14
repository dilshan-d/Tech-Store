import { useEffect, useState } from "react";
import axios from "axios";
import OrderDataModal from "../components/orderDataModal";
import { FiTrendingUp, FiLayers, FiList } from "react-icons/fi";

export default function CustomerOrders() {
    const [orders, setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + currentPage,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then((response) => {
                setOrders(response.data.orders);
                setTotalPages(response.data.totalPages);
                setTotalOrders(response.data.total);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error.message);
            });
    }, [currentPage, pageSize]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                            Customer Dashboard
                        </span>
                        <h1 className="text-3xl font-black text-white mt-3 tracking-tight">
                            Order <span className="text-gradient">Dashboard</span>
                        </h1>
                        <p className="text-slate-500 text-xs mt-1">
                            Manage and monitor all customer orders & delivery items.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-slate-900/60 border border-white/5 rounded-2xl px-4 py-3.5 shadow-md min-w-[120px] backdrop-blur-sm">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                <FiList className="text-blue-400" /> Total Orders
                            </p>
                            <p className="text-2xl font-black text-blue-400 mt-1">
                                {totalOrders}
                            </p>
                        </div>

                        <div className="bg-slate-900/60 border border-white/5 rounded-2xl px-4 py-3.5 shadow-md min-w-[120px] backdrop-blur-sm">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                <FiLayers className="text-cyan-400" /> Total Pages
                            </p>
                            <p className="text-2xl font-black text-cyan-450 mt-1">
                                {totalPages}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="bg-slate-900/80 border-b border-white/5 text-slate-400 font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">First Name</th>
                                    <th className="px-6 py-4">Last Name</th>
                                    <th className="px-6 py-4">Phone</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-white/5">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="text-center py-16 text-slate-500 text-sm"
                                        >
                                            No Orders Found
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((item) => (
                                        <tr
                                            key={item.orderId}
                                            className="hover:bg-white/5 transition duration-150"
                                        >
                                            <td className="px-6 py-4 text-blue-450 font-mono font-bold">
                                                #{item.orderId.substring(0, 8)}...
                                            </td>

                                            <td className="px-6 py-4 text-slate-300 font-medium">
                                                {item.email}
                                            </td>

                                            <td className="px-6 py-4 text-slate-100 font-bold">
                                                {item.firstName}
                                            </td>

                                            <td className="px-6 py-4 text-slate-300 font-medium">
                                                {item.lastName}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="bg-slate-950 border border-white/5 px-2.5 py-1 rounded-lg text-[10px] font-semibold text-slate-300">
                                                    {item.phoneNumber}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-slate-400 font-medium">
                                                {item.date
                                                    ? new Date(item.date).toLocaleDateString()
                                                    : "N/A"}
                                            </td>

                                            <td className="px-6 py-4 font-bold text-slate-200">
                                                LKR {Number(item.total || 0).toLocaleString()}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                                                        item.status === "Delivered"
                                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                            : item.status === "Processing" || item.status === "Pending"
                                                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                            : item.status === "Cancelled"
                                                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <OrderDataModal
                                                    order={item}
                                                    refresh={() => {
                                                        setCurrentPage(currentPage);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-white/5 bg-slate-900/10">
                        <div className="text-slate-400 text-xs">
                            Page
                            <span className="text-slate-200 font-bold mx-1">
                                {currentPage}
                            </span>
                            of
                            <span className="text-blue-455 font-bold ml-1">
                                {totalPages}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-350 border border-white/5 hover:border-white/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-[11px] font-bold"
                            >
                                ← Previous
                            </button>

                            <button
                                disabled={currentPage >= totalPages}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed text-[11px] shadow-sm shadow-blue-600/10"
                            >
                                Next →
                            </button>

                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="bg-slate-900 text-slate-300 border border-white/5 rounded-xl px-3 py-1.5 outline-none cursor-pointer text-[11px] font-semibold focus:border-blue-500"
                            >
                                <option value={2}>2 / page</option>
                                <option value={5}>5 / page</option>
                                <option value={10}>10 / page</option>
                                <option value={20}>20 / page</option>
                                <option value={50}>50 / page</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}