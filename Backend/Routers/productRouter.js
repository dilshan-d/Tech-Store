import express from "express";
import { createProduct, getAllProducts,deleteProduct,editProduct ,getProductById} from "../Controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:productID", getProductById);
productRouter.delete("/:productID", deleteProduct);
productRouter.put("/:productID", editProduct);


export default productRouter;