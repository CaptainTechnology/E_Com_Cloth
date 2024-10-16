
import path from 'path'
import multer  from 'multer';
import express from 'express'
import { addProduct, getOneProduct, getProduct, removeProduct } from '../controller/productController.js';
const productRoute=express.Router();


const storage = multer.diskStorage({
  filename: (req, file, cb) => {
      cb(null, file.originalname); // Append date to filename
  }
});

const upload = multer({ storage });

productRoute.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),
  addProduct
);
productRoute.get("/get",getProduct);
productRoute.post("/remove",removeProduct);
productRoute.get("getOne",getOneProduct);

export default productRoute;