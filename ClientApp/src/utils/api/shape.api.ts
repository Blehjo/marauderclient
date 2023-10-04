import { Vector3 } from "@react-three/fiber";
import axios from "axios";
import { Editor } from "../../store/editor/editor.types";

const api = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/shape`;

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleShape(gltfId: number): Promise<Editor[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/${gltfId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllShapes(): Promise<Editor[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersShapes(): Promise<Editor[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addShape(shapeName: string, gltfId: number, position?: Vector3, height?: number, width?: number, depth?: number, radius?: number, length?: number, color?: string): Promise<Editor[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: {
      shapeName,
      gltfId,
      position, 
      height, 
      width, 
      depth, 
      radius, 
      length, 
      color
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editShape(editorId: number, shapeName: string, gltfId: number, position?: Vector3, height?: number, width?: number, depth?: number, radius?: number, length?: number, color?: string): Promise<Editor[]> {
  const response = await axios({
    method: 'put',
    url:`${api}/${editorId}`, 
    data: {
      shapeName,
      gltfId,
      position, 
      height, 
      width, 
      depth, 
      radius, 
      length, 
      color
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteShape(shapeId: number): Promise<Editor[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${shapeId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}