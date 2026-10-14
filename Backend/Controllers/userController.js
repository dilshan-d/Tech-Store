import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function createUser(req, res) {

    const { email, firstName, lastName, password, image } = req.body;

    if (!email || !firstName || !lastName || !password) {
        return res.status(400).json({
            message: "All fields (email, firstName, lastName, password) are required"
        });
    }

    try {

        const passwordHash = bcrypt.hashSync(password, 10);

        const newUser = new User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: passwordHash,
            ...(image && { image: image })
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "A user with this email already exists",
                error: error.message
            });
        }
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user == null) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const payload = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            isBlocked: user.isBlocked,
            isEmailVerified: user.isEmailVerified,
            image: user.image
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "365d"
        });

        let message;

        if (user.isAdmin === true) {
            message = "Admin logged in successfully";
        } else {
            message = "User logged in successfully";
        }

        return res.status(200).json({
            token: token,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin
            },
            message: message
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error logging in user",
            error: error.message
        });
    }
}

export default function isAdmin(req){
    if(req.user == null){
        return false
    }
    if(req.user.isAdmin == true){
        return true
    }else{
        return false
    }
}

export async function getUserData(req,res) {
    if(req.user == null){
        res.status(402).json({
            message : "Unauthorized"
        })
    }else{
        res.json(req.user)
    }
}
