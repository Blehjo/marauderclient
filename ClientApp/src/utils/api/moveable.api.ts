import axios from "axios";
import { Moveable } from "../../store/moveable/moveable.types";


const api = "http://localhost:8000/api/moveable";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSingleMoveable(moveableId: number): Promise<Moveable> {
  const response = await axios({
    method: 'get',
    url: `${api}/${moveableId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserMoveables(userId: string): Promise<Moveable[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllMoveables(): Promise<Moveable[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addMoveable(xCoord: number, yCoord: number, zCoord: number, fileId: number): Promise<Moveable[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: {
      xCoord,
      yCoord,
      zCoord,
      fileId
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editMoveable(moveableId: number, xCoord: number, yCoord: number, zCoord: number, fileId: number): Promise<Moveable[]> {
  const response = await axios({
    method: 'put',
    url:`${api}/${moveableId}`, 
    data: {
      moveableId,
      xCoord,
      yCoord,
      zCoord,
      fileId
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteMoveable(moveableId: number): Promise<Moveable[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${moveableId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}