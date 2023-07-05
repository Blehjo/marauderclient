import axios from "axios";
import { ChannelComment } from "../../store/channelcomment/channelcomment.types";

const api = "https://localhost:7144/api/channelcomment";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export async function getSingleComment(channelCommentId: number): Promise<ChannelComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/${channelCommentId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllComments(channelId: number): Promise<ChannelComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/channel/${channelId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addComment(channelId: number, formData: FormData): Promise<ChannelComment[]> {
  const response = await axios({
    method: 'post',
    url: `${api}/${channelId}`,
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editComment(channelCommentId: number, formData: FormData): Promise<ChannelComment[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${channelCommentId}`, 
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteComment(channelCommentId: number): Promise<ChannelComment[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${channelCommentId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}