import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";


const generateToken = (id: ObjectId) => {
    if ('process.env.JWT_SECRET' !== undefined) {
        return jwt.sign({ id }, 'process.env.JWT_SECRET', {
            expiresIn: "30d",
        });
    }
};

export default generateToken;