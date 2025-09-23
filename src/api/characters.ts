import {apiFetch} from "./client.ts";
import type {CharacterResponse} from "./types.ts";

export async function getCharacters(
    page: number,
    name: string,
    status: string
): Promise<CharacterResponse> {
    const data = await apiFetch<CharacterResponse>('/character', { page, name, status });
    return data;
}
