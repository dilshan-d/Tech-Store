import mongoose, { model } from 'mongoose';

const orderSchema = new mongoose.Schema(
    {

        orderId : {
            type : String,
            required : true,
            unique : true  // ORD000000001
        },

        email : {
            type : String,
            required : true
        },

        firstName : {
            type : String,
            required : true
        },

        lastName : {
            type : String,
            required : true
        },

        addressLineOne : {
            type : String,
            required : true
        },

        addressLineTwo : {
            type : String,
            required : false
        },

        city : {
            type : String,
            required : true
        },

        postalCode : {
            type : String,
            required : true
        },

        state : {
            type : String,
            required : true
        },

        status : {
            type : String,
            required : true,
            default : "Pending"
        },

        notes :  {
            type : String,
            required : false
        },

        total : {
            type : Number,
            required : true
        },

        date : {
            type : Date,
            required : true
        },

        phoneNumber : {
            type : String,
            required : true
        },

        items : [
            {
                product : {
                    productID : {
                        type : String,
                        required : true,
                        unique : true   
                    },

                    name :{
                        type : String,
                        required : true
                    },

                    price :{
                        type : Number,
                        required : true
                    },

                    labelledPrice :{
                        type : String,
                        required : true
                    },

                    images : {
                        type : String
                    }
                },

                quantity : {
                    type : Number,
                    required : true
                }
            }
        ]
    }
)

const Order = model("Order",orderSchema);
export default Order;