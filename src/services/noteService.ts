import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/note";

const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api";

export interface FetchNotesProps {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string | null;
  tag: string;
}

export const fetchNotes = async (
  params: FetchNotesProps = {},
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await axios.get(
    `${BASE_URL}/notes`,
    {
      headers: {
        Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
      },
      params,
    },
  );

  return response.data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.post(
    `${BASE_URL}/notes`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
      },
    },
  );

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.delete(
    `${BASE_URL}/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
      },
    },
  );

  return response.data;
};
