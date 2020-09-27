import * as mongoose from "mongoose";

import {NextFunction, Response} from "express";
import {UserInterface} from "../interfaces/user";
import {UserModel} from "../models/user";
import {DecodedUserTokenRequest} from "./authorizationChecker";

const User = mongoose.model("User", UserModel);

export interface UserInfoRequest extends DecodedUserTokenRequest {
    userInfo: UserInterface;
}

export const StrictlyAuthorizedRoutes = async (req: DecodedUserTokenRequest, res: Response, next: NextFunction) => {
    if (req.isAuthorized) {
        const {email} = req.user;

        let userInfo = await User.findOne({email: email});
        const request = req as UserInfoRequest;
        request.userInfo = userInfo;

        next();
    } else {
        return res.status(403).send({
            success: false,
            message: "Not Authroized",
        });
    }
}