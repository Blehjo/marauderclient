import axios from "axios";
import { Device } from "../../store/device/device.types";

const api = "http://localhost:8000/api/devices";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleDevice(deviceId: string): Promise<Device> {
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

export async function editDevice(deviceId: string, deviceName: string, deviceType: number): Promise<Device[]> {
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

export async function deleteDevice(deviceId: string): Promise<Device[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${deviceId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}