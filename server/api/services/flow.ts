import * as mongoose from "mongoose";
import {UserModel} from "../models/user";

const User = mongoose.model("User", UserModel);

export class FlowService {
    static createFlow(flowName : string, services : Array<string>, userInfo) {
        return new Promise((resolve, reject) => {
           userInfo.flows.push({name: flowName, services});
           return userInfo.save(function(err){
               if (err) reject({ code: 500, message: err });
               resolve({code: 201});
           })
        });
    }
}
