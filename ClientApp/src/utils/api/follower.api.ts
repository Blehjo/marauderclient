import axios from "axios";
import { Follower } from "../../store/follower/follower.types";

const api = "https://planetnineserver.azurewebsites.net/api/follower";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleFollower(followerId: number): Promise<Follower> {
  const response = await axios({
    method: 'get',
    url: `${api}/${followerId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserFollowers(): Promise<Follower[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/users`, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getFollowers(userId: number): Promise<Follower[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/users/${userId}`, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addFollower(followerUser: number): Promise<Follower[]> {
  const response = await axios({
    method: 'post',
    url: `${api}`,
    data: {
      followerUser
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteFollower(followerId: number): Promise<Follower[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${followerId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}