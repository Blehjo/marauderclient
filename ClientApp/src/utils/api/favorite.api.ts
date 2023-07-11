import axios from "axios";
import { Favorite } from "../../store/favorite/favorite.types";

const api = "https://localhost:7144/api/favorite";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleFavorite(favoriteId: number): Promise<Favorite> {
  const response = await axios({
    method: 'get',
    url: `${api}/${favoriteId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getSingleUserFavorites(userId: number): Promise<Favorite[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/favorite/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getFavorites(): Promise<Favorite[]> {
  const response = await axios({
    method: 'get',
    url: api, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function handleContent(url: string, favoriteId: number): Promise<any> {
  const response = await axios({
    method: 'get',
    url: `https://localhost:7144/api/${url}/${favoriteId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getFavorite(contentId: number, contentType: string): Promise<any> {
  let url;
  switch(contentType) {
    case 'post': 
      url = 'post';
      break;
    case 'comment': 
      url = 'comment';
      break;
    case 'chat': 
      url = 'chat';
      break;
    case 'chatcomment': 
      url = 'chatcomment';
      break;
    case 'messagecomment': 
      url = 'messagecomment';
      break;
    case 'moon': 
      url = 'moon';
      break;
    case 'planet': 
      url = 'planet';
      break;
    default: 
      url = 'post';
  }
  const result = handleContent(url, contentId);
  return result;
}

export async function getUserFavorites(): Promise<any[]> {
  const content: any = [];
  
  const response = await axios({
    method: 'get',
    url: `${api}/user`, 
    headers: headers,
    withCredentials: true
  });

  const result = await response.data;

  for (let i = 0; i < result.length; i++) {
    const { contentType, contentId } = result[i];
    await getFavorite(contentId, contentType)
    .then((response) => {
      content.push(response)
    })
  }

  return content;
}

export async function addFavorite(contentId: number, contentType: string): Promise<Favorite[]> {
  const response = await axios({
    method: 'post',
    url: `${api}`,
    data: {
      contentId,
      contentType
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteFavorite(favoriteId: number): Promise<Favorite[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${favoriteId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}