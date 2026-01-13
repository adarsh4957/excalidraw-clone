import { Request,Response } from "express"
import jwt  from "jsonwebtoken"
import { JWT_SECRET } from "./config"

const signup=async(req:Request,res:Response)=>{
    //dbcall to create user
    res.json({
        userId:1
    })
}

const signin=async(req:Request,res:Response)=>{
    const userid=1;
    const token = jwt.sign({userid:userid},JWT_SECRET)
    res.json({
        token:token,
    })
}

const room=async(req:Request,res:Response)=>{
    //dbcall
    res.json({
        roomId:123
    })
}


export {signin,signup,room};