import {SET_ASANA_WORKSPACES_LIST, SET_GITHUB_ORGANIZATIONS_LIST, SET_HEROKU_TEAMS_LIST} from "../actions/services";

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
                    ...state.asana,
                    teams: action.teams
                }
            }
        default:
            return state;
    }
};

export default services;
