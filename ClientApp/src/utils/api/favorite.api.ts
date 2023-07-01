import axios from "axios";
import { Favorite } from "../../store/favorite/favorite.types";

const api = "https://marauderserver.azurewebsites.net/api/favorite";

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

export async function getUserFavorites(): Promise<Favorite[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
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