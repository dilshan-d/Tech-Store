import { useEffect, useState } from "react";
import axios from "axios";
import OrderDataModal from "../../components/orderDataModal";

export default function AdminOrdersPage() {
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
                setOrders(response.data.orders || []);
                setTotalPages(response.data.totalPages || 0);
                setTotalOrders(response.data.total || 0);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, [currentPage, pageSize]);

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8 text-slate-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Order Dashboard
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Manage and monitor all customer store orders
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 shadow-sm min-w-[120px]">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                                Total Orders
                            </p>
                            <p className="text-2xl font-extrabold text-blue-600 mt-0.5">
                                {totalOrders}
                            </p>
                        </div>

                        <div className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 shadow-sm min-w-[120px]">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                                Total Pages
                            </p>
                            <p className="text-2xl font-extrabold text-sky-600 mt-0.5">
                                {totalPages}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">First Name</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Last Name</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="text-center py-12 text-slate-400 text-base"
                                        >
                                            No Orders Found
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((item) => (
                                        <tr
                                            key={item.orderId}
                                            className="hover:bg-slate-50/70 transition duration-150"
                                        >
                                            <td className="px-6 py-4 text-blue-600 font-mono font-bold text-xs">
                                                {item.orderId}
                                            </td>

                                            <td className="px-6 py-4 text-slate-600 font-medium">
                                                {item.email}
                                            </td>

                                            <td className="px-6 py-4 text-slate-800 font-bold">
                                                {item.firstName}
                                            </td>

                                            <td className="px-6 py-4 text-slate-600 font-medium">
                                                {item.lastName}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 rounded-full text-xs font-semibold">
                                                    {item.phoneNumber}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-slate-500 font-medium">
                                                {item.date
                                                    ? new Date(item.date).toLocaleDateString()
                                                    : "N/A"}
                                            </td>

                                            <td className="px-6 py-4 font-bold text-slate-800">
                                                LKR {Number(item.total || 0).toLocaleString()}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                                        item.status === "Delivered"
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                            : item.status === "Processing" || item.status === "Pending"
                                                            ? "bg-amber-50 text-amber-700 border-amber-100"
                                                            : item.status === "Cancelled"
                                                            ? "bg-rose-50 text-rose-700 border-rose-100"
                                                            : "bg-blue-50 text-blue-700 border-blue-100"
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

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                        <div className="text-slate-500 text-sm">
                            Page <span className="text-slate-800 font-bold">{currentPage}</span> of <span className="text-blue-600 font-bold">{totalPages}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                className="px-4 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                ← Previous
                            </button>

                            <button
                                disabled={currentPage >= totalPages}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-blue-600/10"
                            >
                                Next →
                            </button>

                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="bg-white text-slate-750 border border-slate-200 rounded-xl px-3 py-1.5 outline-none cursor-pointer text-xs font-semibold focus:border-blue-500"
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