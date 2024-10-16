
import express from 'express'
import dotenv from 'dotenv/config'
import path from 'path'
import db_connect from './connection/database.js';
import userRoute from './auth/userRoute.js';
import cors from 'cors'
import cartRoute from './auth/CartRoute.js';
import productRoute from './auth/productRoute.js';
import connectCloudinary from './connection/cloudnary.js';
import orderRoute from './auth/orderRoute.js';
const app=express();
const PORT=process.env.PORT||4000;
app.use(express.json())


app.use(cors())
db_connect();
connectCloudinary();




app.use("/api/product/images/src/assets",express.static("./storage"));
app.use("/api/user",userRoute);
app.use("/api/cart",cartRoute)
app.use("/api/product",productRoute);
app.use("/api/order",orderRoute)


app.listen(PORT,()=>{
console.log(`server is running on : http://localhost:${PORT}`)
})

app.get("/",(req,res)=>{
res.send("server is live captain.")
}) 

