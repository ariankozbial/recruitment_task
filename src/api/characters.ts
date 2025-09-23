import { apiFetch } from "./client.ts";
import type { CharactersResponse } from "./types.ts";

export const getCharacters = async (
  page: number,
  name: string,
  status: string,
): Promise<CharactersResponse> =>
  await apiFetch<CharactersResponse>("/character", {
    page,
    name,
    status,
  });
