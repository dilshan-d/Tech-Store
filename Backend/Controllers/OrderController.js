import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/product.js";
export async function CreateOrder(req, res) {
    console.log(req.user);
    console.log(req.headers.authorization);
    const user = req.user;
    if (user == null) {
        res.status(401).json({
            message: "You need to be logged in to place an order"
        });
        return;
    }
    const orderData = {
        orderId: "ORD00000001",
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        addressLineOne: req.body.addressLineOne,
        addressLineTwo: req.body.addressLineTwo,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        phoneNumber: req.body.phoneNumber,
        total: 0,
        date: new Date(),
        items: []
    };
    if (req.body.firstName != null && req.body.firstName != "") {
        orderData.firstName = req.body.firstName;
    }
    if (req.body.lastName != null && req.body.lastName != "") {
        orderData.lastName = req.body.lastName;
    }
    try {
        const lastOrder = await Order.findOne().sort({ date: -1 });
        if (lastOrder != null) {
            const lastOrderId = lastOrder.orderId;
            
            const lastOrderNumberInString = lastOrderId.replace("ORD", "");
            const lastOrderNumber = parseInt(lastOrderNumberInString);
            const newOrderNumber = lastOrderNumber + 1;
            const newOrderNumberInString = String(newOrderNumber).padStart(8, "0");
            orderData.orderId = "ORD" + newOrderNumberInString;
        }
        for (let i = 0; i < req.body.items.length; i++) {
            const product = await Product.findOne({ productID: req.body.items[i].productId });
            if (product == null || !product.isAvailable) {
                res.status(400).json({
                    message: "Product Not Found"
                });
                return;
            } else {
                orderData.items.push({
                    product: {
                        productID: product.productID,
                        name: product.productName,
                        price: product.price,
                        labelledPrice: product.labelledPrice,
                        images: product.images[0]
                    },
                    quantity: req.body.items[i].quantity
                });
                orderData.total += product.price * req.body.items[i].quantity;
            }
        }
        const newOrder = new Order(orderData);
        await newOrder.save();
        res.status(201).json({
            message: "Order placed successfully",
            order: newOrder
        });
    } catch (error) {
        console.error("CREATE ORDER ERROR:", error);
        res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }
}

export async function getOrders(req,res){
    try{

        const pageSizeString = req.params.pageSize
        const pageNumberString = req.params.pageNumber

        const pageSize = parseInt(pageSizeString)
        const pageNumber = parseInt(pageNumberString)

    const user = req.user;
        
    if (user == null) {
        res.status(401).json({
            message: "You need to be logged in to view orders"
        });
        return;
    }

    if(req.user.isAdmin){

        const orderCount = await Order.countDocuments()

        const totalPages = Math.ceil(orderCount/pageSize)

        const orders = await Order.find().sort({date : -1}).skip((pageNumber - 1)*pageSize).limit(pageSize)

        res.status(200).json({
            orders : orders,
            totalPages : totalPages,
            total : orderCount
        })


    }else{
        const orderCount = await Order.countDocuments()

        const totalPages = Math.ceil(orderCount/pageSize)

        const orders = await Order.find({email : req.user.email}).sort({date : -1}).skip((pageNumber - 1)*pageSize).limit(pageSize)

        res.status(200).json({
            orders : orders,
            totalPages : totalPages,
            total : orderCount

        })

    }

    }catch(error){
        console.log(error.message)
    }
}

export async function UpdateNotesAndStatus(req,res){
    if(req.user && req.user.isAdmin){

        try{
            const orderId = req.params.orderId

            await Order.findOneAndUpdate({
                orderId : orderId.CreateOrder,
                status : req.body.status,
                notes : req.body.notes
            })

            res.status(200).json({
                message : "Notes and Status Updaed"
            })
        }catch(error){
            console.log(error.message)
            res.status(401).json({
                message : "Error Updading"
            })

        }
        
    }
}