import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import { UserModel } from "../models/user";
import { HeaderMiddleware } from "../middlewares/header";
import { ServiceController } from "../controllers/service";
import { Request, Response, NextFunction } from "express";

const User = mongoose.model("User", UserModel);

export class ServiceRoutes {
  public service: ServiceController = new ServiceController();

  public routes(app): void {
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.headers["authorization"]) {
        jwt.verify(
          req.headers["authorization"],
          process.env.JWT_SECRET,
          async (err, decoded) => {
            if (err) {
              return res.status(403).send({
                success: false,
                message: "Invalid token",
              });
            } else {
              let profile = await User.findOne({ mobile: decoded.mobile });
              const request = req as HeaderMiddleware;
              request.user = profile;
              next();
            }
          }
        );
      } else {
        return res.status(403).send({
          success: false,
          message: "No Authorization",
        });
      }
    });
    app.route("/").get(this.service.getServices);
    app.route("/github/link").post(this.service.linkGithub);
  }
}
