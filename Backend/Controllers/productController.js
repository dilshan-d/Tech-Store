import Product from "../models/product.js";
import isAdmin from "./userController.js";

export async function createProduct(req, res) {

    if (!isAdmin(req)){

        if(req.user == null){
            res.status(401).json({
                message : "Unauthorized. Please log in."
            })
            return
        }
        console.log(req.user)
        res.status(403).json({
            message : "Access denied. Admins only."
        })
        return
    }

    try{
        const existingProduct = await Product.findOne({
            productID : req.body.productID
        })

        if (existingProduct != null){
            res.json({
                message : "Product with this productID already exists"
            })
            return
        }

        const newProduce = new Product({
            productID : req.body.productID,
            productName : req.body.productName,
            alternativeName : req.body.alternativeName,
            price : req.body.price,
            labelledPrice : req.body.labelledPrice,
            description : req.body.description,
            images : req.body.images,
            brand : req.body.brand,
            model : req.body.model,
            category : req.body.category,
            isAvailable : req.body.isAvailable,
            stock : req.body.stock
        })

        await newProduce.save()

        res.json({
            message : "Product created successfully",
            product : newProduce
        })

    }catch(error){
        res.json({
            message : "Error creating product",
            error : error.message
        })
    }
}

export async function getAllProducts(req, res) {

    try{

        if(isAdmin(req)){

            const products = await Product.find();

            res.json(products);
            
        }else{

            const products = await Product.find({isAvailable : true});
            res.json(products);
        }

    }catch(error){
        res.json({
            message : "Error fetching products",
            error : error.message
        })
    }
}

export async function editProduct(req, res) {

    if (!isAdmin(req)){
        if(req.user == null){
            res.status(401).json({
                message : "Unauthorized. Please log in."
            })
            return
        }
        console.log(req.user)
        res.status(403).json({
            message : "Access denied. Admins only."
        })
        return
    }

    try{
        const productID = req.params.productID
        const product = await Product.findOne({
            productID : productID
        })
        if(product == null){
            res.json({
                message : "Product not found"
            })
            return
        }
        product.productName = req.body.productName || product.productName
        product.alternativeName = req.body.alternativeName || product.alternativeName
        product.price = req.body.price || product.price
        product.labelledPrice = req.body.labelledPrice || product.labelledPrice
        product.description = req.body.description || product.description
        product.images = req.body.images || product.images
        product.brand = req.body.brand || product.brand
        product.model = req.body.model || product.model
        product.category = req.body.category || product.category
        product.isAvailable = req.body.isAvailable != null ? req.body.isAvailable : product.isAvailable
        product.stock = req.body.stock != null ? req.body.stock : product.stock
        await product.save()
        res.json({
            message : "Product updated successfully",
            product : product
        })
    }catch(error){
        res.json({
            message : "Error updating product",
            error : error.message
        })
    }
}


export async function deleteProduct(req, res) { 
    if (!isAdmin(req)){
        res.status(403).json({
            message : "Access denied. Admins only."
        })
        return
    }

    try{
       await Product.deleteOne({
        productID : req.params.productID
       })
       res.json({
        message : "Product deleted successfully"
       })
    }catch(error){
        res.json({
            message : "Error deleting product",
            error : error.message
        })
    }
}

export async function getProductById(req, res) {

    try{
        const productID = await Product.findOne({
            productID : req.params.productID
        })
        if(productID == null){
            res.json({
                message : "Product not found"
            })
        }else{
            if(productID.isAvailable){
                res.json(productID);
            }else{
                if(isAdmin(req)){
                    res.json(productID);
                }else{
                    res.status(403).json({
                        message : "Access denied. Product is not available."
                    })
                }
            }
        }
        
    }catch(error){
        res.json({
            message : "Error fetching product",
            error : error.message
        })
    }
}