import axios from "axios";
import { Device } from "../../store/device/device.types";

const api = "https://marauderserver.azurewebsites.net/api/device";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSingleDevice(deviceId: number): Promise<Device> {
  const response = await axios({
    method: 'get',
    url: `${api}/${deviceId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllDevices(): Promise<Device[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addDevice(deviceName: string, deviceType: number): Promise<Device[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: {
        deviceName,
        deviceType
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editDevice(deviceId: number, deviceName: string, deviceType: number): Promise<Device[]> {
  const response = await axios({
    method: 'put',
    url:`${api}/${deviceId}`, 
    data: {
        deviceName,
        deviceType
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteDevice(deviceId: number): Promise<Device[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${deviceId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}