import Joi from "joi"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const signUpValidation = (req, res, next) => {
    const schema = Joi.object({
        fullname: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
}
const signInValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
}

const inSureAutenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({ message: "Unauthroized jwt token is require" });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthroized jwt token wrong or expired" });
    }
}




export { signUpValidation, signInValidation, inSureAutenticated }