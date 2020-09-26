import { Response } from "express";
import { HeaderMiddleware } from "../middlewares/header";
import { ServiceService } from "../services/service";

export class ServiceController {
  public getServices(req: HeaderMiddleware, res: Response) {
    res.send(req.user.services);
  }

  public linkGithub(req: HeaderMiddleware, res: Response) {
    const { code } = req.body;

    ServiceService.linkGithub(code)
      .then((accessToken) => {
        ServiceService.saveService({
          email: req.user.email,
          name: "GitHub",
          token: accessToken,
        })
          .then((result) => {
            return res.send({
              status: "SAVED_GITHUB_SERVICE",
              message: result,
            });
          })
          .catch((err) => {
            return res.status(err.code).send({
              status: "FAILED_TO_SAVE_GITHUB_SERVICE",
              message: err.message,
            });
          });
      })
      .catch((err) => {
        return res
          .status(err.code)
          .send({ status: "FAILED_TO_LINK_GITHUB", message: err.message });
      });
  }
}
