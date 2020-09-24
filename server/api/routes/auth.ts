import { AuthController } from "../controllers/auth";

export class AuthRoutes {
  public auth: AuthController = new AuthController();

  public routes(app): void {
    app.route("/").get(this.auth.welcome);
  }
}
