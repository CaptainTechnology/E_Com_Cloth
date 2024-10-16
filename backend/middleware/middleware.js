import jwt from "jsonwebtoken";
const middleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({
            success:false,
            messsage:"Authontication failed"
        })
    }
    try {
    const token_decoded=jwt.verify(token,process.env.SECRET_KEY);
    req.body.userId=token_decoded.userId;
    next();
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            messsage:"Error"
        })
    }
}

export default middleware;