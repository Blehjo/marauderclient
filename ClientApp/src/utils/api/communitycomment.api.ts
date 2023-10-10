import axios from "axios";
import { CommunityComment } from "../../store/communitycomment/communitycomment.types";

const api = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/communitycomment`;

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export async function getSingleComment(postId: number): Promise<CommunityComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/post/${postId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllComments(): Promise<CommunityComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserComments(userId: string): Promise<CommunityComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersComments(): Promise<CommunityComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/comments`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getComments(): Promise<CommunityComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addComment(postId: number, formData: FormData): Promise<CommunityComment[]> {
  const response = await axios({
    method: 'post',
    url: `${api}/${postId}`,
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editComment(commentId: number, commentValue: string, mediaLink: string): Promise<CommunityComment[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${commentId}`, 
    data: {
      commentId,
      commentValue,
      mediaLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteComment(commentId: number): Promise<CommunityComment[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${commentId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}