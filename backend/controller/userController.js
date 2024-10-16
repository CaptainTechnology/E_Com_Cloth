import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const genToken = async (userId) => {
    const secret_key = process.env.SECRET_KEY;
    if (!secret_key) {
        throw new Error('Secret key is not defined');
    }
    const options = {
        expiresIn: '30d', // Token expires in 1 hour
    };
    const token = jwt.sign({ userId }, secret_key, options);
    return token;
}

const Register=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name){
        return res.json({
            success:false,
            message:"Enter user name",
        })
    }
    const isExist=await userModel.findOne({email});
    if(isExist){
       return res.json({
            success:false,
            message:"User already exist"
        })
    }
    if(!validator.isEmail(email)){
       return res.json({
            success:false,
            message:"Enter a valid email"
        })
    }
    if(password.length<8){
        return res.json({
            success:false,
            message:"Password is not strong"
        })
    }
    try {
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password, salt);
    const user=await new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })
    user.save();
    const token=await genToken(user._id);
   return res.json({
        success:true,
        token:token
    })   

    } catch (error) {
       return res.json({
            success:false,
            message:"Error occured!"
        })
    }
}


const Login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"User does'nt exist"
            })
        }
        const compare=await bcrypt.compare(password,user.password)
        if(!compare){
            return res.json({
                success:false,
                message:"Password is incurrect"
            })
        }
        const token=await genToken(user._id);
        return res.json({
            success:true,
            token:token
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Error occured"+error
        })
    }

}

const AdminLogin=async(req,res)=>{
    const {email,password}=req.body;
    if(email!==process.env.ADMIN_EMAIL){
        return res.json({
            success:false,
            message:"Incurrect Email"
        })
    }
    if(password!==process.env.ADMIN_PASSWORD){
        return res.json({
            success:false,
            message:"Incurrect Password"
        })
    }
    const token=await genToken(email);
    return res.json({
        success:true,
        token:token
    })
}

export {Register,Login,AdminLogin};