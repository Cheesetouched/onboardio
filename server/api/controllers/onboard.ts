import { Response } from "express";
import { OnboardService } from "../services/onboard";
import { UserInfoRequest } from "../middlewares/strictlyAuthorizedRoutes";

export class OnboardController {
  public onboardUsers(req: UserInfoRequest, res: Response) {
    const { flow, emails } = req.body;

    OnboardService.onboardUsers(flow, emails)
      .then((result) => {
        return res.send({ status: "ONBOARDING_SUCESSFUL", report: result });
      })
      .catch((err) => {
        return res.send({ status: "FAILED_TO_ONBOARD", message: err.message });
      });
  }
}
