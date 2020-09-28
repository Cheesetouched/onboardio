import { FlowController } from "../controllers/flow";
import { StrictlyAuthorizedRoutes } from "../middlewares/strictlyAuthorizedRoutes";

export class FlowRoutes {
  public flow: FlowController = new FlowController();

  public routes(app): void {
    app.use(StrictlyAuthorizedRoutes);
    app.route("/").get(this.flow.getFlows);
    app.route("/").post(this.flow.createFlow);
  }
}
