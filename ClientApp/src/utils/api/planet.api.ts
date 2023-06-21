import axios from "axios";
import { Planet } from "../../store/planet/planet.types";

const api = "https://planetnineserver.azurewebsites.net/api/planet";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSinglePlanet(planetId: number): Promise<Planet> {
  const response = await axios({
    method: 'get',
    url: `${api}/${planetId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getPlanets(): Promise<Planet[]> {
  const response = await axios({
    method: 'get',
    url: api, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserPlanets(userId: number): Promise<Planet[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersPlanets(): Promise<Planet[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addPlanet(formData: FormData): Promise<Planet[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editPlanet(planetId: number, formData: FormData): Promise<Planet> {
  const response = await axios({
    method: 'put',
    url:`${api}/${planetId}`, 
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deletePlanet(planetId: number): Promise<Planet[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${planetId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}