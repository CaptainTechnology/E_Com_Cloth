
// upload multiple images on cloudnary withougt changing name
import express from 'express';
import dotenv from 'dotenv/config';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('images', 60);

// Route for uploading images
app.post('/api/product/images/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading images', error: err });
        }
        try {
            const uploadPromises = req.files.map(file => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({
                        resource_type: 'auto',
                        public_id: file.originalname, // Keep original filename
                    }, (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }).end(file.buffer);
                });
            });
    
            const uploadedImages = await Promise.all(uploadPromises);
            const imageUrls = uploadedImages.map(img => img.secure_url); // Get the secure URLs
            res.status(200).json({ message: 'Images uploaded successfully', urls: imageUrls });
        } catch (uploadError) {
            res.status(500).json({ message: 'Error processing images', error: uploadError });
        }
    });
    
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
