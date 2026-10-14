import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function authenticateUser(req, res, next) {

    const header = req.header("Authorization"); // ✅ declare first
    console.log("HEADER:", header);

    try {
        if (header) {
            const token = header.replace("Bearer ", "");
            console.log("TOKEN:", token);

            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {

                if (error) {
                    return res.status(401).json({
                        message: "Token is invalid"
                    });
                }

                req.user = decoded;
                console.log("USER:", req.user);

                next();
            });

        } else {
            next();
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error authenticating user",
            error: error.message
        });
    }
}   