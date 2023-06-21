import axios from "axios";
import { PlanetComment } from "../../store/planetcomment/planetcomment.types";


const api = "https://planetnineserver.azurewebsites.net/api/planetcomment";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export async function getSingleComment(postId: number): Promise<PlanetComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/planet/${postId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllComments(): Promise<PlanetComment[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserComments(userId: number): Promise<PlanetComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersComments(): Promise<PlanetComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getComments(): Promise<PlanetComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/planetcomments`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addComment(planetId: number, formData: FormData): Promise<PlanetComment[]> {
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

export async function editComment(planetCommentId: number, commentValue: string, mediaLink: string): Promise<PlanetComment[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${planetCommentId}`, 
    data: {
      planetCommentId,
      commentValue,
      mediaLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteComment(planetCommentId: number): Promise<PlanetComment[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${planetCommentId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}