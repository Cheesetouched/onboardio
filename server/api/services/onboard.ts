import e = require("express");
import * as fetch from "node-fetch";
import { URLSearchParams } from "url";

function sendAsanaInvite(email, gid, token) {
  let body = {
    data: {
      user: email,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`https://app.asana.com/api/1.0/workspaces/${gid}/addUser`, {
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status == 200) return res.json();
        else
          reject({
            service: "Asana",
            code: 500,
            message: "Couldn't invite to Asana",
          });
      })
      .then((response) => {
        if (response.data.email == email)
          resolve({ service: "Asana", status: true });
        else
          reject({
            service: "Asana",
            code: 500,
            message: "Couldn't invite to Asana",
          });
      });
  });
}

function sendHerokuInvite(email, team, token) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("role", "member");

    fetch(`https://api.heroku.com/teams/${team}/invitations`, {
      method: "put",
      headers: {
        Accept: "application/vnd.heroku+json; version=3",
        Authorization: `Bearer ${token}`,
      },
      body: params,
    })
      .then((res) => {
        if (res.status == 200) return res.json();
        else
          reject({
            service: "Heroku",
            code: 500,
            message: "Couldn't invite to Heroku",
          });
      })
      .then((response) => {
        if (response) resolve({ service: "Heroku", status: true });
        else
          reject({
            service: "Heroku",
            code: 500,
            message: "Couldn't invite to Heroku",
          });
      });
  });
}

function sendGitHubInvite(email, team, token) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/orgs/${team}/invitations`, {
      method: "post",
      headers: {
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then(async (res) => {
        if (res.status == 200) return res.json();
        else
          reject({
            service: "GitHub",
            code: 500,
            message: "Couldn't invite to GitHub",
          });
      })
      .then((response) => {
        if (response) resolve({ service: "GitHub", status: true });
        else
          reject({
            service: "GitHub",
            code: 500,
            message: "Couldn't invite to GitHub",
          });
      });
  });
}

function sendZohoInvite(email, role, profile, token) {
  let body = {
    users: [
      {
        role: role,
        first_name: "Change",
        email: email,
        profile: profile,
        last_name: "This",
      },
    ],
  };

  return new Promise((resolve, reject) => {
    fetch(`https://www.zohoapis.in/crm/v2/users`, {
      method: "post",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status == 200) return res.json();
        else
          reject({
            service: "Zoho",
            code: 500,
            message: "Couldn't invite to Zoho",
          });
      })
      .then((response) => {
        if (response.users[0].code == "SUCCESS")
          resolve({ service: "Zoho", status: true });
        else
          reject({
            service: "Zoho",
            code: 500,
            message: "Couldn't invite to Zoho",
            error: response.users[0].message,
          });
      });
  });
}

export class OnboardService {
  static onboardUsers(
    flowId: string,
    email: string,
    services: any,
    flows: any
  ) {
    return new Promise(async (resolve) => {
      let selectedFlow;
      let promiseArray = [];

      flows.forEach((flow) => {
        if (flowId == flow._id) selectedFlow = flow;
      });

      selectedFlow.services.forEach((selectedService) => {
        services.forEach((service) => {
          if (selectedService.toString() == service._id.toString()) {
            if (service.name == "Heroku") {
              promiseArray.push(
                sendHerokuInvite(
                  email,
                  selectedFlow.meta.heroku.teams[0].label,
                  service.token
                )
              );
            }
            if (service.name == "GitHub") {
              promiseArray.push(
                sendGitHubInvite(
                  email,
                  selectedFlow.meta.github.organizations[0].label,
                  service.token
                )
              );
            }
            if (service.name == "Asana") {
              promiseArray.push(
                sendAsanaInvite(
                  email,
                  selectedFlow.meta.asana.workspaces[0].value,
                  service.token
                )
              );
            }
            if (service.name == "Zoho") {
              promiseArray.push(
                sendZohoInvite(
                  email,
                  selectedFlow.meta.zoho.role.value,
                  selectedFlow.meta.zoho.profile.value,
                  service.token
                )
              );
            }
          }
        });
      });

      Promise.allSettled(promiseArray).then((result) => {
        let report = [];

        result.forEach((serviceResult: any) => {
          if (serviceResult.status == "fulfilled") {
            let obj = {};
            obj["service"] = serviceResult.value.service;
            obj["inviteSent"] = serviceResult.value.status;
            report.push(obj);
          } else {
            let obj = {};
            obj["service"] = serviceResult.reason.service;
            obj["inviteSent"] = false;
            obj["error"] = serviceResult.reason.message;
            report.push(obj);
          }
        });
        resolve(report);
      });
    });
  }
}
