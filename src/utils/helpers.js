const servicesThatNeedsExtraInput = ["Github", "Discord", "Asana", "Heroku"];
const servicesThatNeedListInput = ["Github", "Discord", "Asana", "Heroku"];

export const getServicesThatNeedExtraInput = (serviceOptions) => {
    return serviceOptions.filter(serviceOption=>{
        return servicesThatNeedsExtraInput.findIndex((serviceName) =>{
            return serviceName.toLowerCase() === serviceOption.label.toLowerCase();
        }) !== -1;
    });
};

const doesServiceNeedListInput = (service) => {
    return servicesThatNeedListInput.includes(service);
}

export const getServicesInPriorityOrder = (selectedServices) => {
    const selectedServicesWhichNeedsList = selectedServices.reduce((prev, service)=>{
        const doesItNeedList = doesServiceNeedListInput(service.label);
        const label = [doesItNeedList ? "listArr" : "noListArr"];
        return {
            ...prev,
            [label]: [
                ...prev[label],
                service
            ]
        }
    }, {listArr: [], noListArr: []});

    return [...selectedServicesWhichNeedsList.listArr.sort(), ...selectedServicesWhichNeedsList.noListArr.sort()];
}