import { Request,Response,NextFunction } from "express";
import jwt  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/back-common/config";

    
export function middleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers["authorization"] ?? "";
        
        // Remove "Bearer " prefix if present
        const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;

        const decoded = jwt.verify(actualToken, JWT_SECRET) as any;
        console.log(decoded);
        
        if (decoded && decoded.userId) {
            // @ts-ignore: TODO: Fix this
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).json({
                message: "Unauthorized"
            })
        }
    } catch (error) {
        res.status(403).json({
            message: "Unauthorized",
            error: error instanceof Error ? error.message : "Invalid token"
        })
    }
}

