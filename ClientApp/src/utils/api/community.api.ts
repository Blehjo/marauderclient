import axios from "axios";
import { Community } from "../../store/community/community.types";

const api = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/community`;

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSingleCommunity(communityId: number): Promise<Community> {
  const response = await axios({
    method: 'get',
    url: `${api}/${communityId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllCommunities(): Promise<Community[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserCommunities(userId: string | undefined): Promise<Community[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersCommunities(): Promise<Community[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addCommunity(formData: FormData): Promise<Community[]> {
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

export async function editCommunity(communityId: number, formData: FormData): Promise<Community> {
  const response = await axios({
    method: 'put',
    url:`${api}/${communityId}`, 
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteCommunity(communityId: number): Promise<Community[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${communityId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}