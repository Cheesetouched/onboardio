import { Response } from "express";
import { FlowService } from "../services/flow";
import { UserInfoRequest } from "../middlewares/strictlyAuthorizedRoutes";

export class FlowController {
  public getFlows(req: UserInfoRequest, res: Response) {
    res.send(req.userInfo.flows);
  }
}
