import axios from "axios";
import { Panel } from "../../store/panel/panel.types";


const api = "https://planetnineserver.azurewebsites.net/api/panel";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSinglePanel(panelId: number): Promise<Panel> {
  const response = await axios({
    method: 'get',
    url: `${api}/${panelId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserPanels(userId: number): Promise<Panel[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllPanels(): Promise<Panel[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addPanel(title: string, xCoord: number, yCoord: number): Promise<Panel[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: {
      title,
      xCoord,
      yCoord
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editPanel(panelId: number, title: string, xCoord: number, yCoord: number): Promise<Panel[]> {
  const response = await axios({
    method: 'put',
    url:`${api}/${panelId}`, 
    data: {
      title,
      xCoord,
      yCoord
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deletePanel(panelId: number): Promise<Panel[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${panelId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}