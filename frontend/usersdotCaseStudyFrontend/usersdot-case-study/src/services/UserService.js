import NetworkManager from "./NetworkManager/NetworkManager";

import { NetworkRequestType } from "./NetworkManager/network_request_type.enum";
import { NetworkAPI } from "./NetworkManager/network_api.enum";

export default{
    getAllUsers(params){
        const method = NetworkRequestType.GET
        const path = NetworkAPI.GET_ALL_USERS
        const urlParams = path + params
        const dataPromise = NetworkManager.sendRequest(method,urlParams).then((response) => response.data)
        return dataPromise;
    },

    getUserById(params){
        const method = NetworkRequestType.GET
        const path = NetworkAPI.GET_USER_BY_ID
        const urlParams = path + params
        const dataPromise = NetworkManager.sendRequest(method, urlParams).then((response) => response.data)
        return dataPromise;
    },

    saveUser(data){
        const method = NetworkRequestType.POST
        const path = NetworkAPI.SAVE_USER
        const dataPromise = NetworkManager.sendRequest(method, path, data).then((response) => response.data)
        return dataPromise;
    },

    updateUser(data, params){
        const method = NetworkRequestType.POST
        const path = NetworkAPI.UPDATE_USER
        const urlParams = path + params
        const dataPromise = NetworkManager.sendRequest(method, urlParams, data).then((response) => response.data)
        return dataPromise;
    }
}