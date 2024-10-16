import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        // Test the connection
        // await cloudinary.v2.api.ping(); // This will ping the Cloudinary API to check connectivity
        console.log("Connected to Cloudinary successfully!");
        
    } catch (error) {
        console.log("CAN'T CONNECT to Cloudinary: " + error.message);
    }
};

export default connectCloudinary;
