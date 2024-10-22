import { Response } from "express";
import { ServiceProviderService } from "../services/service";
import { UserInfoRequest } from "../middlewares/strictlyAuthorizedRoutes";

export class ServiceController {
  public getServices(req: UserInfoRequest, res: Response) {
    res.send(req.userInfo.services);
  }

  public linkAsana(req: UserInfoRequest, res: Response) {
    const { code, redirect_uri } = req.body;

    ServiceProviderService.linkAsana(code, redirect_uri)
      .then((accessToken) => {
        ServiceProviderService.saveService({
          email: req.userInfo.email,
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

  public linkDiscord(req: UserInfoRequest, res: Response) {
    const { code, redirect_uri } = req.body;

    ServiceProviderService.linkDiscord(code, redirect_uri)
      .then((accessToken) => {
        ServiceProviderService.saveService({
          email: req.userInfo.email,
          name: "Discord",
          token: accessToken,
        })
          .then((result) => {
            return res.send({
              status: "SAVED_DISCORD_SERVICE",
              message: result,
            });
          })
          .catch((err) => {
            return res.status(err.code).send({
              status: "FAILED_TO_SAVE_DISCORD_SERVICE",
              message: err.message,
            });
          });
      })
      .catch((err) => {
        return res
          .status(err.code)
          .send({ status: "FAILED_TO_LINK_DISCORD", message: err.message });
      });
  }

  public linkGithub(req: UserInfoRequest, res: Response) {
    const { code } = req.body;

    ServiceProviderService.linkGithub(code)
      .then((accessToken) => {
        ServiceProviderService.saveService({
          email: req.userInfo.email,
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

  public linkHeroku(req: UserInfoRequest, res: Response) {
    const { code } = req.body;

    ServiceProviderService.linkHeroku(code)
      .then((accessToken) => {
        ServiceProviderService.saveService({
          email: req.userInfo.email,
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

  public linkZoom(req: UserInfoRequest, res: Response) {
    const { code, redirect_uri } = req.body;

    ServiceProviderService.linkZoom(code, redirect_uri)
      .then((accessToken) => {
        ServiceProviderService.saveService({
          email: req.userInfo.email,
          name: "Zoom",
          token: accessToken,
        })
          .then((result) => {
            return res.send({
              status: "SAVED_ZOOM_SERVICE",
              message: result,
            });
          })
          .catch((err) => {
            return res.status(err.code).send({
              status: "FAILED_TO_SAVE_ZOOM_SERVICE",
              message: err.message,
            });
          });
      })
      .catch((err) => {
        return res
          .status(err.code)
          .send({ status: "FAILED_TO_LINK_ZOOM", message: err.message });
      });
  }

  public linkZoho(req: UserInfoRequest, res: Response) {
    const { code, redirect_uri, accounts_server } = req.body;

    ServiceProviderService.linkZoho(code, redirect_uri, accounts_server)
      .then((accessToken) => {
        ServiceProviderService.saveService({
          email: req.userInfo.email,
          name: "Zoho",
          token: accessToken,
        })
          .then((result) => {
            return res.send({
              status: "SAVED_ZOHO_SERVICE",
              message: result,
            });
          })
          .catch((err) => {
            return res.status(err.code).send({
              status: "FAILED_TO_SAVE_ZOHO_SERVICE",
              message: err.message,
            });
          });
      })
      .catch((err) => {
        return res
          .status(err.code)
          .send({ status: "FAILED_TO_LINK_ZOHO", message: err.message });
      });
  }

  public getZohoProfiles(req: UserInfoRequest, res: Response){
      const {token} = req.body;
      return ServiceProviderService.getZohoProfiles(token)
          .then((profilesResponse)=>{
            res.send(profilesResponse)
          }).catch(error=>{
            res
                .status(error.code)
                .send({status: "CANT_FETCH_ZOHO_PROFILES", message: error.message});
          });
  }

  public getZohoRoles(req: UserInfoRequest, res: Response){
    const {token} = req.body;
    return ServiceProviderService.getZohoRoles(token)
        .then((rolesResponse)=>{
          res.send(rolesResponse)
        }).catch(error=>{
          res
              .status(error.code)
              .send({status: "CANT_FETCH_ZOHO_ROLES", message: error.message});
        });
  }
}
