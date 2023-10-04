import axios from "axios";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";

const api = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/aicomment`;

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleAiComment(aiCommentId: number): Promise<ChatComment> {
  return await axios({
    method: 'get',
    url: `${api}/${aiCommentId}`,
    headers: headers,
    withCredentials: true
  });
}

export async function getAllAiComments(): Promise<ChatComment[]> {
  return await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
}

export async function getUserAiComments(id: number): Promise<ChatComment[]> {
  return await axios({
    method: 'get',
    url: `${api}/user/${id}`,
    headers: headers,
    withCredentials: true
  });
}

export async function getUsersAiComments(): Promise<ChatComment[]> {
  return await axios({
    method: 'get',
    url: `${api}/user/AiComments`,
    headers: headers,
    withCredentials: true
  });
}

export async function addAiComment(aiComment: ChatComment): Promise<ChatComment[]> {
  return await axios({
    method: 'post',
    url: api,
    data: aiComment,
    headers: headers,
    withCredentials: true
  });
}

export async function editAiComment(aiComment: ChatComment): Promise<ChatComment> {
  return await axios({
    method: 'put',
    url: `${api}/${aiComment.chatCommentId}`, 
    data: aiComment,
    headers: headers,
    withCredentials: true
  });
}

export async function deleteAiComment(aiCommentId: number): Promise<ChatComment[]> {
  return await axios({
    method: 'delete',
    url: `${api}/${aiCommentId}`,
    headers: headers,
    withCredentials: true
  });
}