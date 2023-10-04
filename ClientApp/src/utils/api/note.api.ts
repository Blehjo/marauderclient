
import axios from "axios";
import { Note } from "../../store/note/note.types";

const api = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/note`;

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded' 
}

export async function getSingleNote(noteId: number): Promise<Note> {
  const response = await axios({
    method: 'get',
    url: `${api}/${noteId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllNotes(panelId: number): Promise<Note[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/panel/${panelId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addNote(panelId: number, formData: FormData, xCoord?: number, yCoord?: number): Promise<Note[]> {
  const response = await axios({
    method: 'post',
    url: `${api}/${panelId}`,
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editNote(noteId: number, xCoord: number, yCoord: number , formData: FormData, panelId: number): Promise<Note[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${noteId}/${panelId}/${xCoord}/${yCoord}`, 
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteNote(noteId: number): Promise<Note[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${noteId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}