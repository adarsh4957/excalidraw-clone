import { Request,Response } from "express"
import jwt  from "jsonwebtoken"
import { JWT_SECRET } from "@repo/back-common/config";
import {createuserschema} from "@repo/common/types";
import {signinschema} from "@repo/common/types";
import {createroomschema} from "@repo/common/types";
import {prismaClient} from "@repo/db/client"

const signup=async(req:Request,res:Response)=>{
    try {
        //dbcall to create user
        const input = createuserschema.safeParse(req.body);
        
        if(!input){
            res.status(403).json({
                message:"Invalid Inputs",
            })
            return ;
        }
        const existuser=await prismaClient.user.findFirst({where:{
            email:input.data?.username
        }})
        if(existuser){
            return res.status(400).json({
                message:"user already exist",
            })
        }
        const user= await prismaClient.user.create({
            data:{
                //@ts-ignore
                name:input.data?.name,
                //@ts-ignore
                email:input.data?.username,
                //@ts-ignore
                password:input.data?.password
            }
        })
        
        if(!user){
            return res.status(400).json({
                message:"user not registered",
            })
        }
        return res.status(200).json({
            message:"User signup completed",
            user:user
        })
    } catch (error) {
        return res.status(400).json({
            message:"Error in user signup",
            error:error
        })
    }
}

const signin=async(req:Request,res:Response)=>{
    try {
        const input =signinschema.safeParse(req.body);
        if(!input){
            res.status(403).json({
                message:"Invalid Inputs"
            })
            return;
        }
        const user=await prismaClient.user.findFirst({
            where:{
                email:input.data?.username,
                password:input.data?.password
            }
        })
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials",
            })
        }
        const userid=user?.id;
        const token = jwt.sign({userid:userid},JWT_SECRET)
        res.json({
            token:token,
        })
    } catch (error) {
        return res.status(400).json({
            message:"Error in signing in",
            error:error,
        })
    }
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