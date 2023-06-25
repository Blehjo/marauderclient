import axios from "axios";
import { Member } from "../../store/member/member.types";

const api = "https://planetnineserver.azurewebsites.net/api/member";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSingleMember(memberId: number): Promise<Member> {
  const response = await axios({
    method: 'get',
    url: `${api}/${memberId}`,
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