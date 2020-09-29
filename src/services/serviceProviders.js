import {
    setAsanaWorkspacesList,
    setGithubOrganizationList,
    setHerokuTeamsList,
    setZohoRolesList
} from "../redux/actions/services";
import {store} from "../redux/store";
import axios from "axios";
import {useSelector} from "react-redux";
import {getConnectedServices} from "../redux/stateUtils/user";

export const fetchAvailableGithubOrganizations = () => {
    const githubLinkedService = getConnectedServices(store.getState()).find((service)=>{
        return service.name.toLowerCase() === "github"
    });

    return axios({
        url: "https://api.github.com/user/memberships/orgs?state=active",
        headers: {
            Authorization: `token ${githubLinkedService.token}`
        }
    }).then(response => {
        const memberships = response.data;
        const filteredOrganizations = memberships.filter(membership => {
            return membership.role === "admin";
        }).map(membership => {
            return membership.organization;
        });

        store.dispatch(setGithubOrganizationList(filteredOrganizations));

        return filteredOrganizations;
    });
};

export const fetchAllAsanaWorkspaces = () => {
    const asanaLinkedService = getConnectedServices(store.getState()).find((service)=>{
        return service.name.toLowerCase() === "asana"
    });

    return axios({
        url: "https://app.asana.com/api/1.0/workspaces",
        headers: {
            Authorization: `Bearer ${asanaLinkedService.token}`
        }
    }).then(response => {
        const {data: workspacesArr} = response.data;

        store.dispatch(setAsanaWorkspacesList(workspacesArr));
        return workspacesArr;
    });
};

export const fetchAllHerokuTeams = () => {
    const herokuLinkedService = getConnectedServices(store.getState()).find((service)=>{
        return service.name.toLowerCase() === "heroku"
    });

    return axios({
        url: "https://api.heroku.com/teams",
        method: "get",
        headers: {
            Authorization: `Bearer ${herokuLinkedService.token}`,
            Accept: "application/vnd.heroku+json; version=3"
        }
    }).then((response)=>{
        const teams = response.data;
        const filteredTeams = teams.filter((team)=>{
            return team.role === "admin";
        });

        store.dispatch(setHerokuTeamsList(filteredTeams));
        return teams;
    })
}

export const fetchAllZohoProfilesAndRoles = () => {
    const zohoLinkedService = getConnectedServices(store.getState()).find((service)=>{
        return service.name.toLowerCase() === "zoho"
    });

    const getRolesPromise = axios({
        url: "https://www.zohoapis.in/crm/v2/settings/roles",
        method: "get",
        headers: {
            Authorization: `Bearer ${zohoLinkedService.token}`
        }
    }).then((response)=>{
        const {roles} = response.data;

        setZohoRolesList(roles);

        return roles;
    });

    const getProfilesPromise = axios({
        url: "https://www.zohoapis.com/crm/v2/settings/profiles",
        method: "get",
        headers: {
            Authorization: `Bearer ${zohoLinkedService.token}`
        }
    }).then((response)=>{
        const {profiles} = response.data;

        setZohoRolesList(profiles);

        return profiles;
    });

    return Promise.all([getRolesPromise, getProfilesPromise]);
}
