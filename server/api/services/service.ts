import * as mongoose from "mongoose";
import * as fetch from "node-fetch";
import { URLSearchParams } from "url";
import { UserModel } from "../models/user";

const User = mongoose.model("User", UserModel);

export class ServiceService {
  static saveService(payload) {
    return new Promise((resolve, reject) => {
      User.updateOne(
        { email: payload.email },
        { $push: { services: { name: payload.name, token: payload.token } } },
        (err, updated) => {
          if (err) reject({ code: 500, message: err });
          if (updated.nModified == 1) resolve("Service linked successfully!");
          else reject({ code: 500, message: "Failed to save the service." });
        }
      );
    });
  }

  static linkGithub(code: string) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("client_id", process.env.GITHUB_CLIENT_ID);
      params.append("client_secret", process.env.GITHUB_CLIENT_SECRET);
      params.append("code", code);

      fetch(process.env.GITHUB_OAUTH_ACCESS_TOKEN, {
        method: "post",
        body: params,
        headers: { Accept: "application/json" },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.error)
            reject({ code: 500, message: response.error_description });
          else resolve(response.access_token);
        });
    });
  }

  static linkHeroku(code: string) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("client_secret", process.env.HEROKU_OAUTH_SECRET);
      params.append("code", code);

      fetch(process.env.HEROKU_OAUTH_ACCESS_TOKEN_URL, {
        method: "post",
        body: params,
        headers: { Accept: "application/json" },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.error)
            reject({ code: 500, message: response.error_description });
          else resolve(response.access_token);
        });
    });
  }
}
