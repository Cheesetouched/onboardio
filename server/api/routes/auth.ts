import { AuthController } from "../controllers/auth";

export class AuthRoutes {
  public auth: AuthController = new AuthController();

  public routes(app): void {
    app.route("/login").post(this.auth.login);
    app.route("/register").post(this.auth.register);
  }
}
