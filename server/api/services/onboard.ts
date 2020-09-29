import * as mongoose from "mongoose";
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

function sendHerokuInvite() {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}

function sendZohoInvite() {
  return new Promise((resolve, reject) => {
    reject("Access token expired");
  });
}

export class OnboardService {
  static onboardUsers(flow: string, emails: Array<string>) {
    return new Promise((resolve, reject) => {
      let report = [];
      emails.forEach((email, index) => {
        let promiseArray = [
          sendAsanaInvite(),
          sendDiscordInvite(),
          sendGitHubInvite(),
          sendHerokuInvite(),
          sendZohoInvite(),
        ];
        Promise.allSettled(promiseArray).then((result) => {
          report.push({
            email: email,
            asana: result[0],
            discord: result[1],
            github: result[2],
            heroku: result[3],
            zoho: result[4],
          });
          if (index == emails.length - 1) resolve(report);
        });
      });
    });
  }
}
