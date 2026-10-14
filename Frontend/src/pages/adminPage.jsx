import Header from "../components/header";
import AdminProductPage from "./admin/AdminProductPage";
import AdminAddProductPage from "./admin/AdminAddProductPage";
import { Link , Route , Routes } from "react-router-dom";
import AdminEditProductPage from "./admin/AdminEditProductPage";
import AdminOrdersPage from "./admin/AdminOrdersPage";

export default function AdminPage(){
    return(
        <div className="w-full h-screen flex bg-slate-50 text-slate-850">

            <div className="w-[260px] h-full bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col py-6 px-4 gap-1.5 flex-shrink-0">
                <div className="px-4 mb-8">
                    <h2 className="text-xl font-extrabold text-white tracking-tight">Admin Portal</h2>
                    <p className="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">Management</p>
                </div>

                <Link to="/admin" className="block py-2.5 px-4 rounded-xl font-medium text-sm transition-all hover:bg-blue-600/10 hover:text-blue-400">Orders</Link>
                <Link to="/admin/products" className="block py-2.5 px-4 rounded-xl font-medium text-sm transition-all hover:bg-blue-600/10 hover:text-blue-400">Products</Link>
                <Link to="/admin/add-product" className="block py-2.5 px-4 rounded-xl font-medium text-sm transition-all hover:bg-blue-600/10 hover:text-blue-400">Add Product</Link>
                <Link to="/admin/users" className="block py-2.5 px-4 rounded-xl font-medium text-sm transition-all hover:bg-blue-600/10 hover:text-blue-400">Users</Link>
                <Link to="/admin/reviews" className="block py-2.5 px-4 rounded-xl font-medium text-sm transition-all hover:bg-blue-600/10 hover:text-blue-400">Reviews</Link>
            </div>

            <div className="flex-1 h-full overflow-auto bg-slate-50">
                <Routes>
                    <Route path='/' element={<AdminOrdersPage/>} />
                    <Route path="/products" element={<AdminProductPage />} />
                    <Route path="/add-product" element={<AdminAddProductPage />} />
                    <Route path="/edit-product" element={<AdminEditProductPage />} />
                    <Route path="/reviews" element={<div className="p-8"><h1 className="text-2xl font-bold text-slate-800">Reviews Dashboard</h1></div>} />
                </Routes>
            </div>

        </div>
    )
}