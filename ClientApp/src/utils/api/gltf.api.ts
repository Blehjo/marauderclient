import axios from "axios";
import { Gltf } from "../../store/gltf/gltf.types";

const api = "https://planetnineserver.azurewebsites.net/api/gltf";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSingleGltf(gltfId: number): Promise<Gltf> {
  const response = await axios({
    method: 'get',
    url: `${api}/${gltfId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllGltfs(): Promise<Gltf[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersGltfs(userId: number): Promise<Gltf[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addGltf(fileInformation: string): Promise<Gltf[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: {
      fileInformation
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editGltf(gltfId: number, fileInformation: string): Promise<Gltf[]> {
  const response = await axios({
    method: 'put',
    url:`${api}/${gltfId}`, 
    data: {
      fileInformation
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteGltf(gltfId: number): Promise<Gltf[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${gltfId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}