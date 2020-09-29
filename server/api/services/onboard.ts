import * as mongoose from "mongoose";
import { UserModel } from "../models/user";

const User = mongoose.model("User", UserModel);

function sendAsanaInvite() {
  return new Promise((resolve, reject) => {
    resolve({ asana: true });
  });
}

function sendDiscordInvite() {
  return new Promise((resolve, reject) => {
    reject({ discord: "403: Forbidden" });
  });
}

function sendGitHubInvite() {
  return new Promise((resolve, reject) => {
    resolve({ github: true });
  });
}

function sendHerokuInvite() {
  return new Promise((resolve, reject) => {
    resolve({ heroku: true });
  });
}

function sendZohoInvite() {
  return new Promise((resolve, reject) => {
    reject({ zoho: "Access token expired" });
  });
}

export class OnboardService {
  static onboardUsers(services: any, flow: any, emails: Array<string>) {
    return new Promise(async (resolve) => {
      let report = [];
      let promiseArray = [];

      flow.forEach((flow) => {
        const flowService = flow.service;
        services.forEach((service) => {
          if (flowService == service.id) {
            if (service.name == "Asana") promiseArray.push(sendAsanaInvite());
            if (service.name == "Discord")
              promiseArray.push(sendDiscordInvite());
            if (service.name == "GitHub") promiseArray.push(sendGitHubInvite());
            if (service.name == "Heroku") promiseArray.push(sendHerokuInvite());
            if (service.name == "Zoho") promiseArray.push(sendZohoInvite());
          }
        });
      });

      emails.forEach((email, index) => {
        Promise.allSettled(promiseArray).then((result) => {
          report.push({
            email: email,
            result: result,
          });
          if (index == emails.length - 1) resolve(report);
        });
      });
    });
  }
}
