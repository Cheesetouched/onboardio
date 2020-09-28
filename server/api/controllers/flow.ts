import { Request, Response } from "express";
import {UserInfoRequest} from "../middlewares/strictlyAuthorizedRoutes";
import {FlowService} from "../services/flow";

export class FlowController {
    public create(req: UserInfoRequest, res: Response) {
        const {flowName, services} = req.body;
        return FlowService.createFlow(flowName, services, req.userInfo)
            .then((result : any) => {
                return res
                    .status(result.code)
                    .send({ status: "FLOW_CREATED"});
            }).catch(err => {
                return res
                    .status(err.code)
                    .send({status: "FAILED_TO_CREATE_FLOW", message: err.message});
            })
    }

    public getList(req: UserInfoRequest, res: Response){
        return req.userInfo.flows;
    }
}
