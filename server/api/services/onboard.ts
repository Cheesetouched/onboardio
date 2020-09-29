import * as mongoose from "mongoose";
import {UserModel} from "../models/user";
import * as fetch from "node-fetch";

const User = mongoose.model("User", UserModel);

function sendAsanaInvite() {
    return new Promise((resolve, reject) => {
        resolve({asana: true});
    });
}

function sendDiscordInvite() {
    return new Promise((resolve, reject) => {
        reject({discord: "403: Forbidden"});
    });
}

function sendGitHubInvite() {
    return new Promise((resolve, reject) => {
        resolve({github: true});
    });
}

function sendHerokuInvite() {
    return new Promise((resolve, reject) => {
        resolve({heroku: true});
    });
}

function sendZohoInvite(emails, token, meta) {
    return new Promise((resolve, reject) => {
        const randomNamesArr = ['John Doe', 'Luis Smith', 'Dark Lord'];
        const userName = randomNamesArr[Math.floor(Math.random() * randomNamesArr.length)];
        const userFirstName = userName.split(" ")[0];
        const userLastName = userName.split(" ")[1];

        const usersArr = emails.map(email => {
            return {
                "role": parseInt(meta["zoho"].role.value),
                "first_name": userFirstName,
                "email": email.value,
                "profile": parseInt(meta["zoho"].profile.value),
                "last_name": userLastName
            };
        });
        console.log({
            url: `https://www.zohoapis.in/crm/v2/users`,
         data: {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                users: JSON.stringify(usersArr)
            }
        }
        });
        return fetch(`https://www.zohoapis.com/crm/v2/users`, {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                users: usersArr
            }
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    reject({code: 500, message: response.error});
                }
                resolve(response);
            }).catch((err)=>{
                reject({code: 500, message: err});
            });

    });
}

export class OnboardService {
    static onboardUsers(services: any, flow: any, emails: Array<string>) {
        return new Promise(async (resolve) => {
            let report = [];
            let promiseArray = [];
            services.forEach((service) => {
                if (service.name == "Zoho") promiseArray.push(sendZohoInvite(emails, service.token, flow.meta));
                    
            });
            return Promise.all(promiseArray);
        });
    }
}
