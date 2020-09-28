export const SAVE_CONNECTED_SERVICES = "SAVE_CONNECTED_SERVICES";

export const saveConnectedServices = (services) => ({
    type: SAVE_CONNECTED_SERVICES,
    services: services
});