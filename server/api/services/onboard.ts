import * as fetch from "node-fetch";
import * as mongoose from "mongoose";
import { URLSearchParams } from "url";
import { UserModel } from "../models/user";

const User = mongoose.model("User", UserModel);

function sendAsanaInvite() {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}

function sendDiscordInvite() {
  return new Promise((resolve, reject) => {
    reject("403: Forbidden");
  });
}

function sendGitHubInvite() {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}

function sendHerokuInvite(herokuToken, email, team) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("role", "member");
    fetch(`https://api.heroku.com/teams/${team}/invitations`, {
      method: "put",
      headers: {
        Accept: "application/vnd.heroku+json; version=3",
        Authorization: `Bearer ${herokuToken}`,
      },
      body: params,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        resolve({ heroku: true });
      });
  });
}

function sendZohoInvite() {
  return new Promise((resolve, reject) => {
    reject("Access token expired");
  });
}

export class OnboardService {
  static onboardUsers(services: any, flows: any, emails: string) {
    console.log(services, flows, emails);
    return new Promise(async (resolve) => {
      let report = [];
      let promiseArray = [];

      flows.services.forEach((flow) => {
        services.forEach((service) => {
          if (flow == service.id) {
            if (service.name == "Asana") promiseArray.push(sendAsanaInvite());
            if (service.name == "Discord")
              promiseArray.push(sendDiscordInvite());
            if (service.name == "GitHub") promiseArray.push(sendGitHubInvite());
            if (service.name == "Heroku")
              promiseArray.push(
                sendHerokuInvite(
                  service.token,
                  emails,
                  flows.meta.heroku.teams[0].label
                )
              );
            if (service.name == "Zoho") promiseArray.push(sendZohoInvite());
          }
        });
      });

      Promise.allSettled(promiseArray).then((result) => {
        report.push({
          email: emails,
          result: result,
        });
        resolve(report);
      });
    });
  }
}
