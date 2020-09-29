import { Response } from "express";
import { OnboardService } from "../services/onboard";
import { UserInfoRequest } from "../middlewares/strictlyAuthorizedRoutes";

export class OnboardController {
  public onboardUsers(req: UserInfoRequest, res: Response) {
    const { flowId, email } = req.body;

    OnboardService.onboardUsers(
      flowId,
      email,
      req.userInfo.services,
      req.userInfo.flows
    )
      .then((result) => {
        return res.send({
          status: "ONBOARDING_SUCCESSFUL",
          report: result,
        });
      })
      .catch((err) => {
        return res
          .status(err.code)
          .send({ status: "FAILED_TO_ONBOARD", message: err.message });
      });
  }
}
