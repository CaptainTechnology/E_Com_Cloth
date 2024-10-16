import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, 
    },
    image: {
        type: [String], 
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    sizes: {
        type: [String], 
        required: true,
    },
    date: {
        type: Number, 
        default: Date.now(),
    },
    bestseller: {
        type: Boolean,
        default: false, 
    }
});

// Create the model
const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
