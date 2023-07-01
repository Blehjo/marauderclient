import axios from "axios";
import { ArtificialIntelligence } from "../../store/artificialintelligence/artificialintelligence.types";

const api = "https://marauderserver.azurewebsites.net/api/artificialintelligence";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSingleArtificialIntelligence(artificialIntelligenceId: number): Promise<ArtificialIntelligence> {
  const response = await axios({
    method: 'get',
    url: `${api}/${artificialIntelligenceId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllArtificialIntelligences(): Promise<ArtificialIntelligence[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getOtherUserArtificialIntelligences(userId: number): Promise<ArtificialIntelligence[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersArtificialIntelligences(): Promise<ArtificialIntelligence[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addArtificialIntelligence(formData: FormData): Promise<ArtificialIntelligence[]> {
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

export async function editArtificialIntelligence(artificialIntelligenceId: number, name: string, role: string, imageFile: File): Promise<ArtificialIntelligence[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${artificialIntelligenceId}`, 
    data: {
      artificialIntelligenceId,
      name,
      role,
      imageFile
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteArtificialIntelligence(artificialIntelligenceId: number): Promise<ArtificialIntelligence[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${artificialIntelligenceId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}