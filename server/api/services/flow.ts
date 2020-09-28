import * as mongoose from "mongoose";
import {UserModel} from "../models/user";

const User = mongoose.model("User", UserModel);

export class FlowService {
    static createFlow(flowName : string, services : Array<string>, meta: any, userInfo) {
        return new Promise((resolve, reject) => {
           userInfo.flows.push({name: flowName, services, meta});
           return userInfo.save(function(err){
               if (err) reject({ code: 500, message: err });
               resolve({code: 201});
           })
        });
    }
}