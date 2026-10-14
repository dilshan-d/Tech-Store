import mongoose, { model } from "mongoose";    

const productSchema = new mongoose.Schema({ 
    productID : {
        type : String,
        required : true,
        unique : true   
    },

    productName :{
        type : String,
        required : true
    },

    alternativeName :{
        type :[String],
        required : false,
        default : []
    },

    price :{
        type : Number,
        required : true
    },

    labelledPrice :{
        type : String,
        required : true
    },

    description :{
        type : String,
        required : false
    },

    images : {
        type : [String],    
        required : true,
        default : [
            "/images/default-product-00-image.jpg",
            "/images/default-product-01-image.jpg",
        ]
    },

    brand : {
        type : String,
        required : false
    },

    model : {
        type : String,
        required : false
    },

    category : {
        type : String,
        required : true
    },

    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    },

    stock : {
        type : Number,
        required : true,
        default : 0
    }
})

const Product = model("Product", productSchema) 
export default Product