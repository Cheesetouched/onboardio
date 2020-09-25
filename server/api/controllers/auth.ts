import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  public welcome(req: Request, res: Response) {
    return res.send({
      message: "Welcome to Onboardio Authentication Gateway!",
    });
  }

  public login(req: Request, res: Response) {
    const { email, password } = req.body;

    return AuthService.loginUser(email, password)
      .then((userToken) => {
        return res.send({ status: "LOGGED_IN", message: userToken });
      })
      .catch((err) => {
        return res.send({ status: "FAILED_TO_LOG_IN", message: err.message });
      });
  }

  public register(req: Request, res: Response) {
    const { email, password } = req.body;

    return AuthService.registerUser(email, password)
      .then((userToken) => {
        return res.send({ status: "USER_REGISTERED", token: userToken });
      })
      .catch((err) => {
        return res.send({ status: "FAILED_TO_REGISTER", reason: err.message });
      });
  }
}
