import axios from "axios";
import { CommunityPost } from "../../store/communitypost/communitypost.types";

const api = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/communitypost`;

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSinglePost(postId: number): Promise<CommunityPost> {
  const response = await axios({
    method: 'get',
    url: `${api}/${postId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllPosts(): Promise<CommunityPost[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserPosts(userId: string): Promise<CommunityPost[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersPosts(): Promise<CommunityPost[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getPosts(): Promise<CommunityPost[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addPost(formData: FormData): Promise<CommunityPost[]> {
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

export async function editPost(postId: number, formData: FormData): Promise<CommunityPost> {
  const response = await axios({
    method: 'put',
    url:`${api}/${postId}`, 
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deletePost(postId: number): Promise<CommunityPost[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${postId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}