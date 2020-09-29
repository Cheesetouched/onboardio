import { Response } from "express";
import { OnboardService } from "../services/onboard";
import { UserInfoRequest } from "../middlewares/strictlyAuthorizedRoutes";

export class OnboardController {
  public onboardUsers(req: UserInfoRequest, res: Response) {
    const { flow, emails } = req.body;

    req.userInfo.flows.forEach((theflow) => {
      if (flow == theflow._id) {
        OnboardService.onboardUsers(req.userInfo.services, theflow, emails)
          .then((result) => {
            return res.send({
              status: "ONBOARDING_SUCCESSFUL",
              report: result,
            });
          })
          .catch((err) => {
            return res.status(500).send({ status: "FAILED_TO_ONBOARD" });
          });
      }
    });
  }
}
