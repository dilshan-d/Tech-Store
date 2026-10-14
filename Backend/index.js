import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routers/userRouter.js';   
import productRouter from './Routers/productRouter.js';
import jwt from "jsonwebtoken";
import authenticateUser from './middlewares/authentication.js';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRouter from './Routers/OrderRouter.js';

dotenv.config();

const app = express();

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
app.use(cors());
app.use(express.json());

app.use(authenticateUser)

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
