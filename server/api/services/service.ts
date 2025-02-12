import * as mongoose from "mongoose";
import * as fetch from "node-fetch";
import {URLSearchParams} from "url";
import {UserModel} from "../models/user";

const User = mongoose.model("User", UserModel);

export class ServiceProviderService {
    static saveService(payload) {
        return new Promise(async (resolve, reject) => {
            User.findOne(
                {email: payload.email, "services.name": payload.name},
                (err, service) => {
                    if (err) reject({code: 500, message: err});
                    let query;
                    let find;
                    if (service) {
                        find = {email: payload.email, "services.name": payload.name};
                        query = {
                            $set: {
                                "services.$": {name: payload.name, token: payload.token},
                            },
                        };
                    } else {
                        find = {email: payload.email};
                        query = {
                            $push: {services: {name: payload.name, token: payload.token}},
                        };
                    }
                    User.updateOne(find, query, (err, updated) => {
                        if (err) reject({code: 500, message: err});
                        if (updated.nModified == 1) resolve("Service linked successfully!");
                        else reject({code: 500, message: "Failed to save the service."});
                    });
                }
            );
        });
    }

    static linkAsana(code: string, redirect_uri: string) {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append("grant_type", "authorization_code");
            params.append("client_id", process.env.ASANA_CLIENT_ID);
            params.append("client_secret", process.env.ASANA_CLIENT_SECRET);
            params.append("code", unescape(code));
            params.append("redirect_uri", redirect_uri);

            fetch(process.env.ASANA_TOKEN_EXCHANGE_URL, {
                method: "post",
                body: params,
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.error)
                        reject({code: 500, message: response.error_description});
                    else resolve(response.access_token);
                });
        });
    }

    static linkDiscord(code: string, redirect_uri: string) {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append("client_id", process.env.DISCORD_CLIENT_ID);
            params.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
            params.append("grant_type", "authorization_code");
            params.append("redirect_uri", redirect_uri);
            params.append("code", code);
            params.append("scope", process.env.DISCORD_SCOPE.replace(/\,/g, "%20"));

            fetch(process.env.DISCORD_TOKEN_EXCHANGE_URL, {
                method: "post",
                body: params,
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.redirect_uri)
                        reject({code: 400, message: response.redirect_uri[0]});
                    if (response.error)
                        reject({code: 500, message: response.error_description});
                    else resolve(response.access_token);
                });
        });
    }

    static linkGithub(code: string) {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append("client_id", process.env.GITHUB_CLIENT_ID);
            params.append("client_secret", process.env.GITHUB_CLIENT_SECRET);
            params.append("code", code);

            fetch(process.env.GITHUB_TOKEN_EXCHANGE_URL, {
                method: "post",
                body: params,
                headers: {Accept: "application/json"},
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.error)
                        reject({code: 500, message: response.error_description});
                    else resolve(response.access_token);
                });
        });
    }

    static linkHeroku(code: string) {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append("grant_type", "authorization_code");
            params.append("code", code);
            params.append("client_secret", process.env.HEROKU_CLIENT_SECRET);

            fetch(process.env.HEROKU_TOKEN_EXCHANGE_URL, {
                method: "post",
                body: params,
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.id == "unauthorized")
                        reject({code: 500, message: response.message});
                    else resolve(response.access_token);
                });
        });
    }

    static linkZoom(code: string, redirect_uri: string) {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append("grant_type", "authorization_code");
            params.append("code", unescape(code));
            params.append("redirect_uri", redirect_uri);

            fetch(process.env.ZOOM_TOKEN_EXCHANGE_URL, {
                method: "post",
                body: params,
                headers: {
                    Authorization:
                        "Basic " +
                        Buffer.from(
                            process.env.ZOOM_CLIENT_ID + ":" + process.env.ZOOM_CLIENT_SECRET
                        ).toString("base64"),
                },
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.error) reject({code: 500, message: response.reason});
                    else resolve(response.access_token);
                });
        });
    }

    static linkZoho(code: string, redirect_uri: string, accounts_server: string) {
        return new Promise((resolve, reject) => {
            const zohoExchange =
                accounts_server +
                process.env.ZOHO_TOKEN_EXCHANGE_URL +
                `?code=${code}&redirect_uri=${redirect_uri}&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&grant_type=authorization_code`;

            fetch(zohoExchange, {method: "post"})
                .then((res) => res.json())
                .then((response) => {
                    if (response.error) reject({code: 500, message: response.error});
                    else resolve(response.access_token);
                });
        });
    }

    static getZohoProfiles(token: string) {
        return new Promise((resolve, reject) => {
            fetch(`https://www.zohoapis.in/crm/v2/settings/profiles`, {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.error) {
                        reject({code: 500, message: response.error});
                    }
                    resolve(response);
                });
        });
    }

    static getZohoRoles(token: string) {
        return new Promise((resolve, reject) => {
            fetch(`https://www.zohoapis.in/crm/v2/settings/roles`, {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.error) {
                        reject({code: 500, message: response.error});
                    }
                    resolve(response);
                });
        });
    }
}
