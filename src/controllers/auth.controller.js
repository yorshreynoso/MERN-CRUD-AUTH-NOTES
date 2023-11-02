import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createToken } from '../libs/jwt.js';
import jwt  from "jsonwebtoken";
import config from 'config';


const { TOKEN_SECRET_JWT } = config.get("Auth");


export const register = async (req, res) => {
    const { email, password, username } = req.body;
    
    try {
        const userExist = await User.findOne({email});
        if(userExist) return res.status(400).json( ["The user already exist"]);

        const passwordEncrypted = await bcrypt.hash(password, 10); // encrypt the password
        const user = new User({
            email,
            password:passwordEncrypted,
            username
        });
        const userSaved = await user.save();

        const token = await createToken({ id:userSaved._id });

        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.json({
            id: userSaved._id,
            email: userSaved.email,
            username:userSaved.username,
            createdAt:userSaved.createdAt,
            updatedAt:userSaved.updatedAt
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const userFound = await User.findOne({ email });

        if(!userFound) return res.status(400).json({ message: "user not found" });

        const isPasswordEqual = await bcrypt.compare(password, userFound.password);

        if(!isPasswordEqual) return res.status(400).json( { message: "Password Incorrect"});

        const token = await createToken({ id:userFound._id });
     

        
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            email: userFound.email,
            username:userFound.username,
            createdAt:userFound.createdAt,
            updatedAt:userFound.updatedAt
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
}


export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });
    res.status(200).json({message:"logout successfully"});
}

export const profile = async(req, res) => {

    try {
        const userFound = await User.findById(req.user.id);
    
        if(!userFound) return res.status(400).json({message: 'User not found'});
    
        return res.json({
            id:userFound.id,
            username: userFound.username,
            email:userFound.email,
            createdAt:userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error});
    }
}

export const verifyToken = async(req, res) => {
    const {token} = req.cookies || {} ;

    if(!token) return res.status(401).json({message: "Unauthorized1"});

    jwt.verify(token, TOKEN_SECRET_JWT, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Unauthorized2' });

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: "Unauthorized3" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    })
}