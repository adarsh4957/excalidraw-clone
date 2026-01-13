import { Request,Response,NextFunction } from "express";
import jwt  from "jsonwebtoken";
import { JWT_SECRET } from "./config";

const middleware=async(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers["authorization"] ?? "";

    const decoded=jwt.verify(token,JWT_SECRET);

    if(decoded){
        //@ts-ignore
        req.userId=decoded.userId;
        next();
    }
    res.status(403).json({
        message:"Unauthorized"
    })
}

export default middleware;