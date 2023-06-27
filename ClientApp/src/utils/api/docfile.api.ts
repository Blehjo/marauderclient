import axios from "axios";
import { DocFile } from "../../store/docfile/docfile.types";


const api = "https://planetnineserver.azurewebsites.net/api/device";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSingleDocFile(docFileId: number): Promise<DocFile> {
  const response = await axios({
    method: 'get',
    url: `${api}/${docFileId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserDocFiles(userId: number): Promise<DocFile[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllDocFiles(): Promise<DocFile[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addDocFile(title: string): Promise<DocFile[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: {
      title
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editDocFile(docFileId: number, title: string): Promise<DocFile[]> {
  const response = await axios({
    method: 'put',
    url:`${api}/${docFileId}`, 
    data: {
      docFileId,
      title
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteDocFile(docFileId: number): Promise<DocFile[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${docFileId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}