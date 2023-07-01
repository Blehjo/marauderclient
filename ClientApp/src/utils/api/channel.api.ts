import axios from "axios";
import { Channel } from "../../store/channel/channel.types";

const api = "https://marauderserver.azurewebsites.net/api/channel";

const headers = {
    'Accept': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/x-www-form-urlencoded'
}

export async function getSingleChannel(channelId: number | undefined): Promise<Channel> {
    const response = await axios({
        method: 'get',
        url:`${api}/${channelId}`,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export async function getChannels(communityId: number): Promise<Channel[]> {
    const response = await axios({
        method: 'get',
        url: `${api}/${communityId}`,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export async function addChannel(
    description: string,
    communityId: number
): Promise<Channel[]> {
    const response = await axios({
        method: 'post',
        url: api,
        data: {
            description,
            communityId
        },
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export async function editChannel(
    channelId: number,
    description: string
): Promise<Channel[]> {
    const response = await axios({
        method: 'put',
        url: `${api}/${channelId}`, 
        data: {
            description
        },
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export async function deleteChannel(channelId: number): Promise<Channel[]> {
    const response = await axios({
        method: 'delete',
        url: `${api}/${channelId}`,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}