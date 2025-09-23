import {keepPreviousData, useQuery} from '@tanstack/react-query';
import type {CharacterResponse} from "../api/types.ts";
import {getCharacters} from "../api";

export function useCharacters(page: number, name: string, status: string) {
    return useQuery<CharacterResponse, Error>({
        queryKey: ['characters', { page, name, status }],
        queryFn: () => getCharacters(page, name, status),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 2,
    });
}
