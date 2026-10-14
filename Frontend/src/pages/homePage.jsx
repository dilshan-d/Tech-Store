import Header from "../components/header";
import ProductPage from "./productPage";
import { Routes, Route } from "react-router-dom";
import ProductOverView from "./productOverview";
import CartPage from "./cartPage";
import CheckOutPage from "./CheckOut";
import CustomerOrders from "./CustomerMyOrdersPage";
import Profile from "../components/profile";
import LandingPage from "./LandingPage";

export default function HomePage(){
    return(
        <div className="w-full min-h-screen flex flex-col bg-slate-950 text-slate-100">
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/products/" element={<ProductPage />} />
                    <Route path="/Overview/:productID" element={<ProductOverView />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckOutPage />} />
                    <Route path="/my-orders" element={<CustomerOrders />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
    )
}