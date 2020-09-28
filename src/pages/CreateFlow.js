import React, {useCallback, useEffect, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
} from "@chakra-ui/core";
import ErrorMessage from "../components/ErrorMessage";
import {MultiSelect} from "../components/MultiSelect";
import {fetchConnectedServicesList} from "../services/flow";
import {useSelector} from "react-redux";
import {getConnectedServices} from "../redux/stateUtils/user";
import {
    getServicesInPriorityOrder,
    getServicesThatNeedExtraInput
} from "../utils/helpers";
import {fetchAllAsanaWorkspaces, fetchAllHerokuTeams, fetchAvailableGithubOrganizations} from "../services/serviceProviders";
import {getAsanaWorkspacesList, getGithubOrganizationsList, getHerokuTeamsList} from "../redux/stateUtils/services";

const FORMS = {
    CREATE_FLOW_FORM: "CREATE_FLOW_FORM",
    GITHUB_USER_INPUT_FORM: "GITHUB_USER_INPUT_FORM",
    ASANA_USER_INPUT_FORM: "ASANA_USER_INPUT_FORM",
    DISCORD_USER_INPUT_FORM: "DISCORD_USER_INPUT_FORM",
    HEROKU_USER_INPUT_FORM: "HEROKU_USER_INPUT_FORM"
};

const SERVICE_FORM_MAP = {
    "github": FORMS.GITHUB_USER_INPUT_FORM,
    "asana": FORMS.ASANA_USER_INPUT_FORM,
    "discord": FORMS.DISCORD_USER_INPUT_FORM,
    "heroku": FORMS.HEROKU_USER_INPUT_FORM
};

const ServiceInputForm = (props) => {
    const {formType, isLastForm, goToNextFormCallback} = props;
    const [state, setState] = useState({
        isLoading: false,
        error: null
    });

    const githubOrganizations = useSelector(getGithubOrganizationsList);
    const asanaWorkspaces = useSelector(getAsanaWorkspacesList);
    const herokuTeams = useSelector(getHerokuTeamsList);

    const {error, isLoading} = state;

    const handleSubmitForm = (event) => {
        event.preventDefault();
        goToNextFormCallback();
    };

    let renderedServiceForm = null;

    useEffect(()=>{
        switch (formType) {
            case FORMS.GITHUB_USER_INPUT_FORM:
                fetchAvailableGithubOrganizations();
                break;
            case FORMS.ASANA_USER_INPUT_FORM:
                fetchAllAsanaWorkspaces();
                break;
            case FORMS.HEROKU_USER_INPUT_FORM:
                fetchAllHerokuTeams();
                break;
        }
    }, [formType]);

    switch (formType) {
        case FORMS.GITHUB_USER_INPUT_FORM:
            const organizationsOptions = githubOrganizations.map(org => {
                return {label: org.login, value: org.id}
            });

            renderedServiceForm = (
                <>
                    <FormControl isRequired>
                        <FormLabel mt={4} mb={2}>
                            Select your Github organization
                        </FormLabel>
                        <MultiSelect
                            onChange={()=>{}}
                            options={organizationsOptions}
                            placeholder={"Select your services"}
                        />
                    </FormControl>
                </>
            );
            break;
        case FORMS.DISCORD_USER_INPUT_FORM:
            renderedServiceForm = (
                <>
                    <FormControl isRequired>
                        <FormLabel mt={4} mb={2}>
                            Select your Github organization
                        </FormLabel>
                        <MultiSelect
                            onChange={()=>{}}
                            options={organizationsOptions}
                            placeholder={"Select your organizations"}
                        />
                    </FormControl>
                </>
            );
            break;
        case FORMS.ASANA_USER_INPUT_FORM:
            const asanaWorkspacesOptions = asanaWorkspaces.map(org => {
                return {label: org.name, value: org.gid}
            });

            renderedServiceForm = (
                <>
                    <FormControl isRequired>
                        <FormLabel mt={4} mb={2}>
                            Select your Asana workspaces
                        </FormLabel>
                        <MultiSelect
                            onChange={()=>{}}
                            options={asanaWorkspacesOptions}
                            placeholder={"Select your workspaces"}
                        />
                    </FormControl>
                </>
            )
            break;
        case FORMS.HEROKU_USER_INPUT_FORM:
            const herokuTeamsOptions = herokuTeams.map(team => {
                return {label: team.name, value: team.id}
            });

            renderedServiceForm = (
                <>
                    <FormControl isRequired>
                        <FormLabel mt={4} mb={2}>
                            Select your Heroku Teams
                        </FormLabel>
                        <MultiSelect
                            onChange={()=>{}}
                            options={herokuTeamsOptions}
                            placeholder={"Select your teams"}
                        />
                    </FormControl>
                </>
            )
            break;
        default:
           break;
    }
    ;

    return (
        <Box my={8} mb={4} textAlign="left">
            <form onSubmit={handleSubmitForm}>
                {error ? <ErrorMessage message={error}/> : null}
                {renderedServiceForm}
                <Button
                    width="full"
                    mt={8}
                    type="submit"
                    variantColor="teal"
                    variant="outline"
                >
                    {isLastForm ? "Create flow" : "Continue"}
                </Button>
            </form>
        </Box>
    );
};

const CreateFlow = (props) => {
    const [state, setState] = useState({
        flowName: "",
        selectedServices: [],
        servicesInputs: {},
        currentForm: FORMS.CREATE_FLOW_FORM,
        isLastForm: false,
        isLoading: false,
        error: null,
    });

    const servicesAvailable = useSelector(getConnectedServices);

    useEffect(() => {
        fetchConnectedServicesList();
    }, [])

    const serviceOptions = servicesAvailable.map((service) => {
        return {label: service.name, value: service._id};
    });

    const {flowName, selectedServices, servicesInputs, isLastForm, currentForm, error, isLoading} = state;

    const submitForm = () => {
        setState({...state, error: null});
        alert(`Creating a flow now`);
    };

    const selectedServiceOptionsInPriority = getServicesInPriorityOrder(selectedServices);

    const checkIfItIsLastForm = (currentServiceIndex) => {
        return selectedServiceOptionsInPriority.length > 0 && currentServiceIndex === selectedServiceOptionsInPriority.length - 1;
    };

    const goToPreviousForm = () => {
        const currentServiceFormIndex = selectedServiceOptionsInPriority.findIndex(service => {
            return SERVICE_FORM_MAP[service.label.toLowerCase()] === currentForm;
        });

        if(currentServiceFormIndex > 0){
            const previousService = selectedServiceOptionsInPriority[currentServiceFormIndex - 1];
            setState({
                ...state,
                isLastForm: checkIfItIsLastForm(currentServiceFormIndex - 1),
                currentForm: SERVICE_FORM_MAP[previousService.label.toLowerCase()]
            });
        } else {
            setState({
                ...state,
                isLastForm:checkIfItIsLastForm(0),
                currentForm: FORMS.CREATE_FLOW_FORM
            });
        }
    };

    const goToNextForm = () =>{
        if(isLastForm){
            submitForm();
        } else {
            const currentServiceFormIndex = selectedServiceOptionsInPriority.findIndex(service => {
                return SERVICE_FORM_MAP[service.label.toLowerCase()] === currentForm;
            });

            if(currentServiceFormIndex === -1){
                setState({
                    ...state,
                    isLastForm: checkIfItIsLastForm(0),
                    currentForm: SERVICE_FORM_MAP[selectedServiceOptionsInPriority[0].label.toLowerCase()]
                });
            } else {
                const nextService = selectedServiceOptionsInPriority[currentServiceFormIndex + 1];
                setState({...state, isLastForm: checkIfItIsLastForm(currentServiceFormIndex + 1), currentForm: SERVICE_FORM_MAP[nextService.label.toLowerCase()]});
            }

        }
    };

    const handleCreateFlowFormSubmit = (event) => {
        event.preventDefault();
        if(isLastForm){
           submitForm();
        } else {
            goToNextForm();
        }
    };

    const handleFlowNameChange = (event) => {
        const {value, name} = event.target;

        setState({...state, flowName: value});
    };

    const handleSelectedServicesChange = (value) => {

        setState({...state, selectedServices: value, isLastForm: getServicesThatNeedExtraInput(value).length === 0});
    };

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box
                p={8}
                maxWidth="500px"
                width={440}
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
                mt={10}
            >
                <Box p={2} pb={0}>

                    <Box textAlign="center">
                        <Heading>Create New Flow</Heading>
                    </Box>
                    {currentForm === FORMS.CREATE_FLOW_FORM ? (
                        <Box my={8} mb={4} textAlign="left">
                            <form onSubmit={handleCreateFlowFormSubmit}>
                                {error ? <ErrorMessage message={error}/> : null}
                                <FormControl isRequired>
                                    <FormLabel>Flow Name</FormLabel>
                                    <Input
                                        type="text"
                                        mt={2}
                                        placeholder="Enter the name of the flow"
                                        name="flow_name"
                                        onChange={handleFlowNameChange}
                                        value={flowName}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel mt={4} mb={2}>
                                        Services in the flow
                                    </FormLabel>
                                    <MultiSelect
                                        onChange={handleSelectedServicesChange}
                                        options={serviceOptions}
                                        values={selectedServices}
                                        placeholder={"Select your services"}
                                    />
                                </FormControl>
                                <Button
                                    width="full"
                                    mt={8}
                                    type="submit"
                                    variantColor="teal"
                                    variant="outline"
                                >
                                    {isLoading ? (
                                        <CircularProgress isIndeterminate size="24px" color="teal"/>
                                    ) : (
                                        isLastForm ? "Create Flow" :  "Continue"
                                    )}
                                </Button>
                            </form>
                        </Box>
                    ) : (<ServiceInputForm isLastForm={isLastForm} goToNextFormCallback={goToNextForm} formType={currentForm}/>)}
                </Box>
            </Box>
        </Flex>
    );
};

export default CreateFlow;
