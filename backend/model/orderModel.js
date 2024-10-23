import mongoose from "mongoose";

const orderShema=mongoose.Schema({
    userId:{
        type:String,
        default:"123"
    },
    items:{
        type:Array,
        require:true
    },
    ammount:{
        type:Number,
        required:true
    },
    address:{
        type:Object
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        required:true
    }
})


const OrderModel = mongoose.models.Orders ||mongoose.model("Orders",orderShema);
export default OrderModel;