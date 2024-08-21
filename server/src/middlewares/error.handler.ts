import { NextFunction, Request, Response } from "express";
import { APIHandlerType, APISuccessType } from "../types/middlewares/index.js";


class ErrorHandlerClass extends Error {
    constructor(public message: string, public statusCode: number, public details?: [{ message: string }]) {
        super(message)
        this.statusCode = statusCode;

    }
}

const errorHandler = async (err:ErrorHandlerClass, req: Request, res: Response, next: NextFunction) => {
        if(err?.details){
            err.message = err?.details[0]?.message;
            err.statusCode = 422;
        }else{
            err.message ||= "Internal Server Error";
            err.statusCode ||= 500;
        }

        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
}


const apiHandler = (func:APIHandlerType) => (req:Request, res:Response, next:NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
}

const ok = ({ res, statusCode = 200, message, data }:APISuccessType) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
}

export {
    ErrorHandlerClass,
    errorHandler,
    apiHandler,
    ok
}