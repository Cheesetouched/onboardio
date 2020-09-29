export const SET_GITHUB_ORGANIZATIONS_LIST = "SET_GITHUB_ORGANIZATIONS_LIST";
export const SET_ASANA_WORKSPACES_LIST = "SET_ASANA_WORKSPACES_LIST";
export const SET_HEROKU_TEAMS_LIST = "SET_HEROKU_TEAMS_LIST";
export const SET_ZOHO_ROLES_LIST = "SET_ZOHO_ROLES_LIST";
export const SET_ZOHO_PROFILES_LIST = "SET_ZOHO_PROFILES_LIST";
export const SAVE_CONNECTED_SERVICES = "SAVE_CONNECTED_SERVICES";

export const saveConnectedServices = (services) => ({
    type: SAVE_CONNECTED_SERVICES,
    services: services
});

export const setGithubOrganizationList = (organizations)=>({
   type: SET_GITHUB_ORGANIZATIONS_LIST,
   organizations: organizations
});

export const setAsanaWorkspacesList = (workspaces)=>({
    type: SET_ASANA_WORKSPACES_LIST,
    workspaces: workspaces
});

export const setHerokuTeamsList = (teams)=>({
    type: SET_HEROKU_TEAMS_LIST,
    teams: teams
});

export const setZohoRolesList = (roles)=>({
    type: SET_ZOHO_ROLES_LIST,
    roles: roles
});

export const setZohoProfilesList = (profiles)=>({
    type: SET_ZOHO_PROFILES_LIST,
    profiles: profiles
});

