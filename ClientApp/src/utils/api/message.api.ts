import axios from "axios";
import { Message } from "../../store/message/message.types";

const api = "https://planetnineserver.azurewebsites.net/api/message";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleMessage(messageId: number): Promise<Message> {
  const response = await axios({
    method: 'get',
    url: `${api}/${messageId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllMessages(): Promise<Message[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserMessages(userId: number): Promise<Message[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersMessages(): Promise<Message[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getMessages(): Promise<Message[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addMessage(messageValue: string): Promise<Message> {
  const response = await axios({
    method: 'post',
    url: api,
    data: {
      messageValue
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editMessage(messageId: number, messageValue: string): Promise<Message[]> {
  const response =  await axios({ 
    method: 'put',
    url: `${api}/${messageId}`, 
    data: {
      messageId, 
      messageValue
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteMessage(messageId: number): Promise<Message[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${messageId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}