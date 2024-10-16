import ProductModel from "../model/productModel.js"

import { v2 as cloudinary } from "cloudinary";

async function addProduct(req, res) {

    const isimage = [];
    for (const field of ['image1', 'image2', 'image3', 'image4']) {
        if (req.files[field] && req.files[field].length > 0) {
            isimage.push(req.files[field][0]);
        }
    }

    if (isimage.length === 0) {
        return res.json({
            success: false,
            message: "At least one image is required."
        });
    }

    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    if (!name || !description || !price || !category || !subCategory || !sizes || !bestseller) {
        return res.json({
            success: false,
            message: "Each field is required"
        })
    }

    try {

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        const images = [image1, image2, image3, image4].filter(item => item != undefined);
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url;
            })
        )
        const data = new ProductModel({
            name: name,
            description: description,
            price: Number(price),
            image: imageUrl,
            category: category,
            subCategory: subCategory,
            date: Date.now(),
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
        })
        await data.save();

        return res.json({
            success: true,
            message: "Product added"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Eroor occured"
        })
    }

}

async function getProduct(req, res) {
    try {
        const data = await ProductModel.find({});
        return res.json({
            success: true,
            data: data
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Error occured"
        })
    }

}
async function removeProduct(req, res) {
    const product_id = req.body.product_id;
    try {
        const product = await ProductModel.findById(product_id);

        if (!product) {
            return res.json({
                success: false,
                message: "Product is not available"
            });
        }

        const imageUrl = product.image;

        // Check if there are no images
        if (!imageUrl || imageUrl.length === 0) {
            await ProductModel.deleteOne({ _id: product_id });
            return res.json({
                success: true, // Changed to true here
                message: "Product removed successfully"
            });
        }

        // Create an array of promises for deleting images
        const deletePromises = imageUrl.map(async (item) => {
            const publicId = item.split('/').pop().split('.')[0]; // Extract public ID
            console.log(publicId);
            const result = await cloudinary.uploader.destroy(publicId);

            if (result.result === 'ok') {
                console.log('Image deleted successfully');
            } else if (result.result === 'not_found') {
                console.log('Image already deleted or does not exist');
            } else {
                console.log('Error deleting image:', result);
            }
        });

        // Wait for all image deletions to complete
        await Promise.all(deletePromises);

        // Now delete the product
        await ProductModel.deleteOne({ _id: product_id });

        return res.json({
            success: true,
            message: "Product removed successfully"
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Error occurred: " + error.message // Added space for clarity
        });
    }
}


async function getOneProduct(req, res) {

}

export { addProduct, getProduct, removeProduct, getOneProduct }