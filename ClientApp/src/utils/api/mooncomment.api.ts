import axios from "axios";
import { MoonComment } from "../../store/mooncomment/mooncomment.types";

const api = "https://planetnineserver.azurewebsites.net/api/mooncomment";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export async function getSingleComment(postId: number): Promise<MoonComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/moon/${postId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllComments(): Promise<MoonComment[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserComments(userId: number): Promise<MoonComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersComments(): Promise<MoonComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getComments(): Promise<MoonComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/mooncomments`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addComment(moonId: number, formData: FormData): Promise<MoonComment[]> {
  const response = await axios({
    method: 'post',
    url: `${api}/${moonId}`,
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editComment(moonCommentId: number, commentValue: string, mediaLink: string): Promise<MoonComment[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${moonCommentId}`, 
    data: {
      moonCommentId,
      commentValue,
      mediaLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteComment(moonCommentId: number): Promise<MoonComment[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${moonCommentId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}