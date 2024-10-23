
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true, 
    },
    password: {
        type: String,
        required: true, 
    },
    cart:{
        type:Array,
        default:[]
    },
    // orders:{
    //     type:Array,
    //     default:[]
    // }
}); 

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
