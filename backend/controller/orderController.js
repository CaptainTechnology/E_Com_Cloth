import UserModel from "../model/userModel.js";


const Add=async(req,res)=>{
    const {userId,order}=req.body;
    if(!userId){
        return res.json({
            success:false,
            message:"Authontication failed"
        })
    }
    try {
        const user = await UserModel.findById(userId);
        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            })
        }
        const addOrder=await UserModel.findByIdAndUpdate(
            userId,
            {$push:{orders:order}},
            { new: true, useFindAndModify: false } 
        )
        return res.json({
            success:true,
            message:"added"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Error Occured"
        })
    }
}
const Get=async(req,res)=>{
    const {userId,order}=req.body;
    if(!userId){
        return res.json({
            success:false,
            message:"Authontication failed"
        })
    }
    try {
        const user = await UserModel.findById(userId);
        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            })
        }
        return res.json({
            success:true,
            orders:user.orders
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Error Occured"
        })
    }
}

export {Add,Get};