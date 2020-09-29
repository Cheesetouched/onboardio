import { OnboardController } from "../controllers/onboard";
import { StrictlyAuthorizedRoutes } from "../middlewares/strictlyAuthorizedRoutes";

export class OnboardRoutes {
  public onboard: OnboardController = new OnboardController();

  public routes(app): void {
    app.use(StrictlyAuthorizedRoutes);
    app.route("/").post(this.onboard.onboardUsers);
  }
}
