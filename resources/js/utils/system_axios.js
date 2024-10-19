import axios from "axios";

import config from "./config"

const baseClient = axios.create({
    baseURL: config.InventoryApiHost,
    headers : {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "X-requested-with" : 'XMLHttpRequest'
    }
})

const inventoryAxiosClient = axios.create({
    baseURL: config.InventoryApiHost+'/api',
    headers : {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "X-requested-with" : 'XMLHttpRequest',
        "Authorization" : 'Bearar'+config.apiToken
    }
});

export {
    baseClient,
    inventoryAxiosClient
}
