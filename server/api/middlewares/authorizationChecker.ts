import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {DecodedUserTokenInfo} from "../interfaces/user";

export interface DecodedUserTokenRequest extends Request {
    user: DecodedUserTokenInfo,
    isAuthorized: true
};

export const AuthorizationChecker = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers["authorization"]) {
        jwt.verify(
            req.headers["authorization"],
            process.env.JWT_SECRET,
            async (err, decoded) => {
                if (!err && decoded) {
                    const request = req as DecodedUserTokenRequest;
                    request.user = { email: decoded.email };
                    request.isAuthorized = true;
                }
                next();
            }
        );
    } else {
        next();
    }
}