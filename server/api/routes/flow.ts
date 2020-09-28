import {FlowController} from "../controllers/flow";
import {StrictlyAuthorizedRoutes} from "../middlewares/strictlyAuthorizedRoutes";

export class FlowRoutes {
    public flow: FlowController = new FlowController();

    public routes(app): void {
        app.use(StrictlyAuthorizedRoutes);
        app.route("/").get(this.flow.getFlowsList);
        app.route("/create").post(this.flow.create);
    }
}
