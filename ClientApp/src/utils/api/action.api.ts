import axios from "axios";
import { Action } from "../../store/action/action.types";

const api = "https://planetnineserver.azurewebsites.net/api/action";

const headers = {
    'Accept': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/x-www-form-urlencoded'
}

export async function getSingleAction(actionId: number | undefined): Promise<Action> {
    const response = await axios({
        method: 'get',
        url:`${api}/${actionId}`,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export async function getActions(): Promise<Action[]> {
    const response = await axios({
        method: 'get',
        url: api,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export async function addAction(
    eventType: string,
    activity: string,
    pinId: number
): Promise<Action[]> {
    const response = await axios({
        method: 'post',
        url: api,
        data: {
            eventType,
            activity,
            pinId
        },
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export async function editAction(
    actionId: number,
    eventType: string,
    activity: string,
    pinId: number
): Promise<Action[]> {
    const response = await axios({
        method: 'put',
        url: `${api}/${actionId}`, 
        data: {
            eventType,
            activity, 
            pinId
        },
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export async function deleteAction(actionId: number): Promise<Action[]> {
    const response = await axios({
        method: 'delete',
        url: `${api}/${actionId}`,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}