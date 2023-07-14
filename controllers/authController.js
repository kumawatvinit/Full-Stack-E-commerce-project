import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import Jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // null check
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // user already exists?
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).json({
                success: true,
                message: 'Already registered! Please login'
            });
        }

        const hashedPassword = await hashPassword(password);

        // register user => save user to DB
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in registering user',
            error
        });
    }
};

// POST login 
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;

        // null check
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Does user even exists?
        const user = await userModel.findOne({email});

        if(!user) {
            return res.status(400).json({
                success: false,
                message: 'Email is not registered!'
            });
        }

        // Is password correct?
        const match = await comparePassword(password, user.password);
        if(!match) {
            return res.status(400).json({
                success: false,
                message: 'Wrong password!'
            });
        }

        // Create token
        const token = Jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        // Send token to client
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in logging user',
            error
        })
    }
};

// test controller
export const testController = (req,res) => {
    res.send("Protected route");
}