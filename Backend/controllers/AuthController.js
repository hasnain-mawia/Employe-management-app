import User from '../model/userSchema.js';
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const RegisterController = async (req, res) => {
    try {
        const { fullname, email, password } = req.body || {};

        if (!fullname || !email || !password) {
            res.json({
                message: "required fields are missing!",
                status: false
            })
            return;
        }

        let newPassword = password.toString();
        const hashPass = await bcrypt.hash(newPassword, 10);
        const user = await User.findOne({ email })
        console.log(user, "user")
        if (user) {
            res.json({
                message: "email address already in use!",
                status: false
            })
            return;
        }

        const dataObj = {
            fullname: fullname,
            email: email,
            password: hashPass, //password
        }

        const userResponse = await User.create(dataObj)
        res.status(201).json({
            Data: userResponse,
            message: "User Register Successfully",
            status: true
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
            data: [],
        })
    }
}
export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.json({
                message: "Required Fields are missing",
                status: false,
            });
            return;
        }
        const user = await User.findOne({ email })
        console.log("User Modal", user);
        if (!user) {
            return res.json({
                message: "User does not exists",
                status: false,
            });
        }
        let LoginHashPass = password.toString();
        const comparePassword = await bcrypt.compare(LoginHashPass, user.password);
        // console.log("Compare Password", comparePassword)

        if (!comparePassword) {
            return res.json({ message: "Email Password Not Exists", 
                status: false 
            });

        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.status(200).json({
            message: "User Successfully Login",
            user: user,
            jwtToken,
            email,
            name: user.name,
            status: true,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            status: false,
            data: [],
        })
    }
}

