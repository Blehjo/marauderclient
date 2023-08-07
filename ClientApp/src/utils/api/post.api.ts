import axios from "axios";
import { Post } from "../../store/post/post.types";

const api = "https://localhost:7144/api/post";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSinglePost(postId: number): Promise<Post> {
  const response = await axios({
    method: 'get',
    url: `${api}/${postId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllPosts(): Promise<Post[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserPosts(userId: number): Promise<Post[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersPosts(): Promise<Post[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getPosts(): Promise<Post[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addPost(formData: FormData): Promise<Post[]> {
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

export async function editPost(postId: number, formData: FormData): Promise<Post> {
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

export async function deletePost(postId: number): Promise<Post[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${postId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}