import mongoose from "mongoose";

// Example database connection file
const DATABASE_URL = process.env.DATABASE_URL

const db_connect=async()=>{
    try {
        mongoose.connect(DATABASE_URL).then(()=>{
            console.log("Connected to the database")
        }).catch(()=>{
            console.log("Some error occured");
        })
    } catch (error) {
        
    }
}
export default db_connect;
