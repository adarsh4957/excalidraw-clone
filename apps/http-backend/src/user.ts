import { Request,Response } from "express"
import jwt  from "jsonwebtoken"
import { JWT_SECRET } from "@repo/back-common/config";
import {createuserschema} from "@repo/common/types";
import {signinschema} from "@repo/common/types";
import {createroomschema} from "@repo/common/types";

const signup=async(req:Request,res:Response)=>{
    //dbcall to create user
    const data = createuserschema.safeParse(req.body);
    if(!data){
        res.status(403).json({
            message:"Invalid Inputs",
        })
        return ;
    }
    res.json({
        userId:1
    })
}

const signin=async(req:Request,res:Response)=>{
    const data =signinschema.safeParse(req.body);
    if(!data){
        res.status(403).json({
            message:"Invalid Inputs"
        })
        return;
    }
    const userid=1;
    const token = jwt.sign({userid:userid},JWT_SECRET)
    res.json({
        token:token,
    })
}

const room=async(req:Request,res:Response)=>{
    const data=createroomschema.safeParse(req.body);
    if(!data){
        res.status(403).json({
            message:"Invalid Inputs"
        })
        return;
    }
    //dbcall
    res.json({
        roomId:123
    })
}


export {signin,signup,room};