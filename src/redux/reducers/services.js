import {
    SET_ASANA_WORKSPACES_LIST,
    SET_GITHUB_ORGANIZATIONS_LIST,
    SET_HEROKU_TEAMS_LIST, SET_ZOHO_PROFILES_LIST,
    SET_ZOHO_ROLES_LIST
} from "../actions/services";

const initialState = {
    github: {
        organizations: []
    },
    asana: {
        workspaces: []
    },
    heroku: {
        teams: []
    }

};

const services = (state = initialState, action) => {
    switch (action.type) {
        case SET_GITHUB_ORGANIZATIONS_LIST:
            return {
                ...state,
                github: {
                    ...state.github,
                    organizations: action.organizations
                }
            };
        case SET_ASANA_WORKSPACES_LIST:
            return {
                ...state,
                asana: {
                    ...state.asana,
                    workspaces: action.workspaces
                }
            }
        case SET_HEROKU_TEAMS_LIST:
            return {
                ...state,
                heroku: {
                    ...state.heroku,
                    teams: action.teams
                }
            }
        case SET_ZOHO_ROLES_LIST:
            return {
                ...state,
                zoho: {
                    ...state.zoho,
                    roles: action.roles
                }
            }
        case SET_ZOHO_PROFILES_LIST:
            return {
                ...state,
                zoho: {
                    ...state.zoho,
                    profiles: action.profiles
                }
            }
        default:
            return state;
    }
};

export default services;
