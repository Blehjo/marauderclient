import axios from "axios";
import { Moon } from "../../store/member/member.types";

const api = "https://planetnineserver.azurewebsites.net/api/moon";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSingleMoon(moonId: number): Promise<Moon> {
  const response = await axios({
    method: 'get',
    url: `${api}/${moonId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getMoons(): Promise<Moon[]> {
  const response = await axios({
    method: 'get',
    url: api, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserMoons(): Promise<Moon[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersMoons(userId: number): Promise<Moon[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addMoon(planetId: number, formData: FormData): Promise<Moon> {
  const response = await axios({
    method: 'post',
    url: `${api}/${planetId}`, 
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editMoon(moonId: number, moonName: string, moonMass: number, perihelion: number, aphelion: number, gravity: number, temperature: number, planetId: number | null, imageLink: string | null, imageFile: File | null): Promise<Moon> {
  const response = await axios({
    method: 'put',
    url:`${api}/${moonId}`, 
    data: {
      moonId,
      moonName,
      moonMass,
      perihelion,
      aphelion,
      gravity,
      temperature,
      planetId,
      imageLink,
      imageFile
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteMoon(moonId: number): Promise<Moon[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${moonId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}