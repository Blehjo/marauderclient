import axios from "axios";
import { UserChatComment } from "../../store/userchatcomment/userchatcomment.types";

const api = "https://localhost:7144/api/userchatcomment";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export async function getSingleComment(chatId: number): Promise<UserChatComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/chat/${chatId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllComments(): Promise<UserChatComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserComments(userId: number): Promise<UserChatComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersComments(): Promise<UserChatComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/comments`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getComments(): Promise<UserChatComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addComment(chatId: number, formData: FormData): Promise<UserChatComment[]> {
  const response = await axios({
    method: 'post',
    url: `${api}/${chatId}`,
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editComment(UserChatCommentId: number, commentValue: string, mediaLink: string): Promise<UserChatComment[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${UserChatCommentId}`, 
    data: {
      UserChatCommentId,
      commentValue,
      mediaLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteComment(UserChatCommentId: number): Promise<UserChatComment[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${UserChatCommentId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}