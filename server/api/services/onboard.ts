import * as fetch from "node-fetch";
import { URLSearchParams } from "url";

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
        console.log(await res.json());
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
            if (service.name == "Heroku")
              promiseArray.push(
                sendHerokuInvite(
                  email,
                  selectedFlow.meta.heroku.teams[0].label,
                  service.token
                )
              );
            if (service.name == "GitHub")
              promiseArray.push(
                sendGitHubInvite(
                  email,
                  selectedFlow.meta.github.organizations[0].label,
                  service.token
                )
              );
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
