import { Request, Response, NextFunction } from "express"

export function headerValidation (req: Request, res: Response, next: NextFunction) {
    if(req.headers.user && typeof req.headers.user === "string"){
        //@ts-ignore
        req.user = req.headers.user
        next()
    }
    else{
        res.status(400).send("Invalid header")
    } 
    
}

export function errorHandler (error: Error, req: Request, res: Response, next: NextFunction) {
    res.status(400).send(error.message)
  }