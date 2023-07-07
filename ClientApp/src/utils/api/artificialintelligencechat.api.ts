import axios from "axios";
import { ArtificialIntelligenceChat } from "../../store/artificialIntelligencechat/artificialintelligencechat.types";
import { ArtificialIntelligence } from "../../store/artificialintelligence/artificialintelligence.types";
import { Chat } from "../../store/chat/chat.types";


const api = "https://localhost:7144/api/artificialintelligenceChat";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleArtificialIntelligenceChat(artificialIntelligenceChatId: number): Promise<ArtificialIntelligenceChat> {
  const response = await axios({
    method: 'get',
    url: `${api}/${artificialIntelligenceChatId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllArtificialIntelligenceChats(): Promise<ArtificialIntelligenceChat[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getOtherUserArtificialIntelligenceChats(userId: number): Promise<ArtificialIntelligenceChat[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersArtificialIntelligenceChats(): Promise<ArtificialIntelligenceChat[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addArtificialIntelligenceChat(artificialIntelligenceId: number, artificialIntelligence: ArtificialIntelligence, chatId: number, chat: Chat): Promise<ArtificialIntelligenceChat[]> {
  const response = await axios({
    method: 'post',
    url: api,
    data: {
      artificialIntelligenceId,
      artificialIntelligence,
      chatId,
      chat
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteArtificialIntelligenceChat(artificialIntelligenceChatId: number): Promise<ArtificialIntelligenceChat[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${artificialIntelligenceChatId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}