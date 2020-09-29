import { Response } from "express";
import { UserInfoRequest } from "../middlewares/strictlyAuthorizedRoutes";
import { FlowService } from "../services/flow";

export class FlowController {
  public createFlow(req: UserInfoRequest, res: Response) {
    const { name, services, meta } = req.body;
    return FlowService.createFlow(name, services, meta, req.userInfo)
      .then((result: any) => {
        return res.status(result.code).send({ status: "FLOW_CREATED" });
      })
      .catch((err) => {
        return res
          .status(err.code)
          .send({ status: "FAILED_TO_CREATE_FLOW", message: err.message });
      });
  }

  public getFlows(req: UserInfoRequest, res: Response) {
    res.send(req.userInfo.flows);
  }
}
