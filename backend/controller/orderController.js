import OrderModel from "../model/orderModel.js";
import UserModel from "../model/userModel.js";


const Add = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.json({
            success: false,
            message: "Authontication failed"
        })
    }
    try {
        
        const nwe_order =await new OrderModel({
            userId: userId,
            items: req.body.items,
            ammount: req.body.ammount,
            address: req.body.address,
            status: req.body.status,
            date: req.body.date,
            payment: req.body.payment
        })

        const saveOrder = await nwe_order.save();
        return res.json({
            success: true
        })
        // const user = await UserModel.findById(userId);
        // if (!user) {
        //     return res.json({
        //         success: false,
        //         message: "User not found"
        //     })
        // }
        // const addOrder = await UserModel.findByIdAndUpdate(
        //     userId,
        //     { $push: { orders: order } },
        //     { new: true, useFindAndModify: false }
        // )
    } catch (error) {
        return res.json({
            success: false,
            message: "Error Occured "+error
        })
    }
}
const Get = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.json({
            success: false,
            message: "Authontication failed"
        })
    }
    try {
       
        const order = await OrderModel.find({userId:userId}); 
        if(!order){
            return res.json({
                success:"False",
                message:"No Order Placed"
            })
        }

        return res.json({
            success: true,
            orders: order
        })

        // const user = await UserModel.findById(userId);
        // if (!user) {
        //     return res.json({
        //         success: false,
        //         message: "User not found"
        //     })
        // }
        //  if (!user) {
        //     return res.json({
        //         success: false,
        //         message: "User not found"
        //     })
        // }
        
        // return res.json({
        //     success: true,
        //     orders: user.orders
        // })

    } catch (error) {
        return res.json({
            success: false,
            message: "Error Occured"+error
        })
    }
}


const GetAdminOrders=async(req,res)=>{
    try {
    const orders=await OrderModel.find({});
    if(!orders){
        return res.json({
            success:false,
            message:"No Orders found"
        })
    }
    return res.json({
        success:true,
        orders:orders
    })
} catch (error) {
    return res.json({
        success:false,
        message:"ERROR"+error
    })
}
}

const Update=async(req,res)=>{
    const {orderId,status}=req.body;

    try {
        const order=await OrderModel.findById(orderId);
        if(!order){
            return res.json({
                success:false,
                message:"Order is not avalible"
            })
        }
        const updatedOrder=await OrderModel.findByIdAndUpdate(
            orderId,
            {status:status},
            {new:true}
        );
        return res.json({
            success:true
        })

    } catch (error) {
        return res.json({
            success:false,
            message:"ERROR"+error
        })
    }
}
export { Add, Get, GetAdminOrders,Update };