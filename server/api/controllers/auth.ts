import { Request, Response } from "express";

export class AuthController {
  public welcome(req: Request, res: Response) {
    return res.send({
      message: "Welcome to Onboardio Authentication Gateway!",
    });
  }
}
