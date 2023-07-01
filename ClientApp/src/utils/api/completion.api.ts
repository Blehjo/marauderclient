import axios from "axios";

const api = "https://marauderserver.azurewebsites.net/api/chatgpt";

const headers = {
  // 'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export async function callArtoo(request: string): Promise<any> {
  return await axios({
    method: 'post',
    url: `${api}/artoo`,
    data: {request: request},
    headers: headers,
    withCredentials: true
  });
}

export async function callDalle(request: string): Promise<string> {
  return await axios({
    method: 'post',
    url: `${api}/dalle`,
    data: request,
    headers: headers,
    withCredentials: true
  });
}

export async function callCode(request: string): Promise<string> {
  return await axios({
    method: 'post',
    url: `${api}/code`,
    data: request,
    headers: headers,
    withCredentials: true
  });
}