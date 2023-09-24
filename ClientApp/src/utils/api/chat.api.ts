import axios from "axios";
import { Chat } from "../../store/chat/chat.types";

const api = "http://localhost:8000/api/chat";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleChat(chatId: number): Promise<Chat> {
  const response = await axios({
    method: 'get',
    url: `${api}/${chatId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllChats(): Promise<Chat[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

// Gets chats from another user's page
export async function getUserChats(id: string): Promise<Chat[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${id}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

// Gets chats from user
export async function getUsersChats(): Promise<Chat[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/chats`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getChats(): Promise<Chat[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addChat(title: string, artificialIntelligenceId: number): Promise<Chat> {
  const response = await axios({
    method: 'post',
    url: api,
    data: {
      title: title,
      artificialIntelligenceId: artificialIntelligenceId
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editChat(chatId: number, title: string, userId: string): Promise<Chat[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${chatId}`, 
    data: {
      chatId, 
      title,
      userId
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteChat(chatId: number): Promise<Chat[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${chatId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}