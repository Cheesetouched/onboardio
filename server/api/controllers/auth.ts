import { Request, Response } from "express";
import { AuthService } from "../services/auth";

export class AuthController {
  public login(req: Request, res: Response) {
    const { email, password } = req.body;

    AuthService.loginUser(email, password)
      .then((userToken) => {
        return res.send({ status: "LOGGED_IN", token: userToken });
      })
      .catch((err) => {
        return res
          .status(err.code)
          .send({ status: "FAILED_TO_LOG_IN", message: err.message });
      });
  }

  public register(req: Request, res: Response) {
    const { email, password } = req.body;

    AuthService.registerUser(email, password)
      .then((userToken) => {
        return res
          .status(201)
          .send({ status: "USER_REGISTERED", token: userToken });
      })
      .catch((err) => {
        return res
          .status(err.code)
          .send({ status: "FAILED_TO_REGISTER", message: err.message });
      });
  }
}
