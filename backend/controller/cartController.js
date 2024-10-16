import UserModel from "../model/userModel.js";


const Add = async (req, res) => {
    const { userId, cartData } = req.body;
    if (!userId) {
        return res.json({
            success: false,
            message: "Authontication Failed"
        })
    }
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        const isCart =await user.cart.find(item => item._id === cartData._id && item.size === cartData.size);
        if (isCart) {
            const upladte_cart = await user.cart.map(item => item._id === cartData._id && item.size === cartData.size
                ? { ...item, quantity: item.quantity + 1}
                : item)
            console.log(upladte_cart)
            const edituser = await UserModel.findByIdAndUpdate(
                userId,
                 { cart: upladte_cart } , // Use $push to add to the cart array
                { new: true, useFindAndModify: false } // Return the updated user document
            );
            return res.json({
                success: true
            })
        } else {
            const edituser = await UserModel.findByIdAndUpdate(
                userId,
                { $push: { cart: cartData } }, // Use $push to add to the cart array
                { new: true, useFindAndModify: false } // Return the updated user document
            );
            return res.json({
                success: true
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: "error occured"
        })
    }
}

const Get = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.json({
            success: false,
            message: "Authontication Failed"
        })
    }
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            })
        }

        return res.json({
            success: true,
            cart: user.cart
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Error occured: " + error
        })
    }
}
const Remove = async (req, res) => {
    const { userId,cartId,cartSize } = req.body;
    if (!userId) {
        return res.json({
            success: false,
            message: "Authontication Failed"
        })
    }
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            })
        }
        const new_cart =await user.cart.filter(item => !(item._id === cartId && item.size === cartSize));
        const rem_cart=await UserModel.findByIdAndUpdate(
            userId,
            {cart:new_cart},
            { new: true, useFindAndModify: false } // Return the updated user document
        )
        return res.json({
            success: true,
            message:"Removed"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Error occured: " + error
        })
    }
}


const Edit = async (req, res) => {
    const { userId,cartId,cartSize,quantity } = req.body;
    if (!userId) {
        return res.json({
            success: false,
            message: "Authontication Failed"
        })
    }
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            })
        }
        const newCart = user.cart.map(item => {
            if (item._id === cartId && item.size===cartSize) {
              return { ...item, quantity: quantity }; 
            }
            return item; 
          });

        const edit_cart=await UserModel.findByIdAndUpdate(
            userId,
            {cart:newCart},
            { new: true, useFindAndModify: false } // Return the updated user document
        )
        return res.json({
            success: true,
            message:"Removed"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Error occured: " + error
        })
    }
}
const RemoveAll = async (req, res) => {
    const { userId,cartId,cartSize,quantity } = req.body;
    if (!userId) {
        return res.json({
            success: false,
            message: "Authontication Failed"
        })
    }
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            })
        }

        const edit_cart = await UserModel.findByIdAndUpdate(
            userId,
            { cart: [] },
            { new: true, useFindAndModify: false } // Return the updated user document
        )
       
        return res.json({
            success: true,
            message:"Removed cart"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Error occured: " + error
        })
    }
}



export { Add, Get,Remove ,Edit,RemoveAll};

// cartData={...product,size:size,quantity:2}
//               setCart(prev => (
//                   prev.map(item => item._id === cartData._id && item.size === cartData.size
//                           ? { ...item, quantity: item.quantity + 1 } 
//                           : item
//                   )
//               ));