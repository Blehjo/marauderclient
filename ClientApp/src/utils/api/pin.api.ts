import axios from "axios";
import { Pin } from "../../store/pin/pin.types";

const api = "https://planetnineserver.azurewebsites.net/api/pin";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSinglePin(pinId: number): Promise<Pin> {
  const response = await axios({
    method: 'get',
    url: `${api}/${pinId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserPins(userId: number): Promise<Pin[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllPins(): Promise<Pin[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addPin(pinLocation: string, isAnalog: boolean, deviceId: number): Promise<Pin[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: {
      pinLocation,
      isAnalog,
      deviceId
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editPin(pinId: number, pinLocation: string, isAnalog: boolean, deviceId: number): Promise<Pin[]> {
  const response = await axios({
    method: 'put',
    url:`${api}/${pinId}`, 
    data: {
      pinId,
      pinLocation,
      isAnalog,
      deviceId
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deletePin(pinId: number): Promise<Pin[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${pinId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}