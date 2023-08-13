import axios from "axios";
import { GltfComment } from "../../store/gltfcomment/gltfcomment.types";

const api = "https://localhost:7144/api/gltfcomment";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export async function getSingleComment(gltfId: number): Promise<GltfComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/gltf/${gltfId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllComments(): Promise<GltfComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserComments(userId: number): Promise<GltfComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersComments(): Promise<GltfComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/comments`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getComments(): Promise<GltfComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addComment(gltfId: number, formData: FormData): Promise<GltfComment[]> {
  const response = await axios({
    method: 'post',
    url: `${api}/${gltfId}`,
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editComment(gltfCommentId: number, commentValue: string, mediaLink: string): Promise<GltfComment[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${gltfCommentId}`, 
    data: {
      gltfCommentId,
      commentValue,
      mediaLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteComment(gltfCommentId: number): Promise<GltfComment[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${gltfCommentId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}