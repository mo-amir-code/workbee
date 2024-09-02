import { INVALID_TOKEN, NOT_AUTHORIZED } from "../constants/index.js";
import { getUser } from "../db/services/index.js";
import { JWTTokenVerifier } from "../utils/controllers/auth.js";
import { apiHandler, ErrorHandlerClass } from "./error.handler.js";

const isUserAuthenticated = apiHandler( async (req, _res, next) => {
    const { accesstoken } = req.cookies;

    if(!accesstoken){
        return next(new ErrorHandlerClass(NOT_AUTHORIZED, 401));
    }
    
    const tokenPaylod = JWTTokenVerifier(accesstoken);
    
    if(!tokenPaylod){
        return next(new ErrorHandlerClass(INVALID_TOKEN, 401));
    }
    
    const { userId } = tokenPaylod;
    
    const user = await getUser({id: userId});
    
    if(!user){
        return next(new ErrorHandlerClass(INVALID_TOKEN, 401));
    }

    req.user = user;
    next();    
});

export {
    isUserAuthenticated
}