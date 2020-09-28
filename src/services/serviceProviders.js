import {setAsanaWorkspacesList, setGithubOrganizationList} from "../redux/actions/services";
import {store} from "../redux/store";
import axios from "axios";
import {useSelector} from "react-redux";
import {getConnectedServices} from "../redux/stateUtils/user";

export const fetchAvailableGithubOrganizations = () => {
    const githubLinkedService = getConnectedServices(store.getState()).find((service)=>{
        return service.name.toLowerCase() === "github"
    });

    return axios({
        url: "https://api.github.com/user/orgs",
        headers: {
            Authorization: `token ${githubLinkedService.token}`
        }
    }).then(response => {
        const organizations = response.data;

        store.dispatch(setGithubOrganizationList(organizations));

        return organizations;
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