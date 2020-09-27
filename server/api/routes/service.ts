import { ServiceController } from "../controllers/service";
import {StrictlyAuthorizedRoutes} from "../middlewares/strictlyAuthorizedRoutes";

export class ServiceRoutes {
  public service: ServiceController = new ServiceController();

  public routes(app): void {
    app.use(StrictlyAuthorizedRoutes);
    app.route("/").get(this.service.getServices);
    app.route("/github/link").post(this.service.linkGithub);
    app.route("/heroku/link").post(this.service.linkHeroku);
    app.route("/asana/link").post(this.service.linkAsana);
  }
}
