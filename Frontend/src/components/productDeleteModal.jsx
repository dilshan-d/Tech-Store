import axios from "axios";
import AdminAddProductPage from "../pages/admin/AdminAddProductPage";

export default function ProductDeleteModal(props) {

    const product = props.product
    const refresh = props.refresh

    return (
        <button className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100 px-3.5 py-1.5 rounded-xl text-xs font-bold transition duration-150 cursor-pointer"
            onClick={
                ()=>{
                    if (!confirm("Are you sure you want to delete this product?")) {
                        return;
                    }


                    const token = localStorage.getItem("token");
                    axios.delete(import.meta.env.VITE_API_URL + "/products/" + product.productID,
                        {
                            headers: {
                                Authorization: "Bearer " + token
                            }
                        }).then(
                            ()=>{
                            alert("Product deleted successfully!");
                            refresh();
                            }
                        ).catch((error) => {
                            console.log("Product ID:", product.productID);
                            console.log("Status:", error.response?.status);
                            console.log("Response:", error.response?.data);
                            console.error(error);

                        }
                    )
                }
            }
                        
        >
            Delete
        </button>
    );
}