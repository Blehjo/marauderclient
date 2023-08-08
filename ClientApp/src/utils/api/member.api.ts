import axios from "axios";
import { Member } from "../../store/member/member.types";

const api = "https://localhost:7144/api/members";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleMember(communityId: number): Promise<Member[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/${communityId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllMembers(): Promise<Member[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addMember(communityId: number): Promise<Member[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: {
      communityId
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editMember(memberId: number, communityId: number, userId: number): Promise<Member[]> {
  const response = await axios({
    method: 'put',
    url:`${api}/${memberId}`, 
    data: {
        communityId,
        userId
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteMember(memberId: number): Promise<Member[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${memberId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}