import {z} from "zod";

export const createuserschema=z.object({
    username:z.string(),
    password:z.string(),
    name:z.string(),
})

export const signinschema=z.object({
    username:z.string(),
    password:z.string(),
})

export const createroomschema=z.object({
    name:z.string(),
})
