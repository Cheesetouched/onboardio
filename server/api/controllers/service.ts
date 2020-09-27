import { Response } from "express";
import { HeaderMiddleware } from "../middlewares/header";
import { ServiceProviderService } from "../services/service";

export class ServiceController {
  public getServices(req: HeaderMiddleware, res: Response) {
    res.send(req.user.services);
  }

  public linkGithub(req: HeaderMiddleware, res: Response) {
    const { code } = req.body;

    ServiceProviderService.linkGithub(code)
      .then((accessToken) => {
        ServiceProviderService.saveService({
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

  public linkHeroku(req: HeaderMiddleware, res: Response) {
    const { code } = req.body;

    ServiceProviderService.linkHeroku(code)
      .then((accessToken) => {
        ServiceProviderService.saveService({
          email: req.user.email,
          name: "Heroku",
          token: accessToken,
        })
          .then((result) => {
            return res.send({
              status: "SAVED_HEROKU_SERVICE",
              message: result,
            });
          })
          .catch((err) => {
            return res.status(err.code).send({
              status: "FAILED_TO_SAVE_HEROKU_SERVICE",
              message: err.message,
            });
          });
      })
      .catch((err) => {
        return res
          .status(err.code)
          .send({ status: "FAILED_TO_LINK_HEROKU", message: err.message });
      });
  }

  public linkAsana(req: HeaderMiddleware, res: Response) {
    const { code, redirect_uri } = req.body;

    ServiceProviderService.linkAsana(code, redirect_uri)
      .then((accessToken) => {
        ServiceProviderService.saveService({
          email: req.user.email,
          name: "Asana",
          token: accessToken,
        })
          .then((result) => {
            return res.send({
              status: "SAVED_ASANA_SERVICE",
              message: result,
            });
          })
          .catch((err) => {
            return res.status(err.code).send({
              status: "FAILED_TO_SAVE_ASANA_SERVICE",
              message: err.message,
            });
          });
      })
      .catch((err) => {
        return res
          .status(err.code)
          .send({ status: "FAILED_TO_LINK_ASANA", message: err.message });
      });
  }
}
