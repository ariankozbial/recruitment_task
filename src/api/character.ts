import { apiFetch } from "./client.ts";
import type { Character } from "../types.ts";

export const getCharacter = async (id: number): Promise<Character> =>
  await apiFetch<Character>(`/character/${id}`);
