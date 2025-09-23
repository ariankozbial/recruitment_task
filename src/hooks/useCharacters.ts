import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { CharactersResponse } from "../types.ts";
import { getCharacters } from "../api";

export const useCharacters = (page: number, name: string, status: string) => {
  return useQuery<CharactersResponse, Error>({
    queryKey: ["characters", { page, name, status }],
    queryFn: () => getCharacters(page, name, status),
    placeholderData: keepPreviousData,
    retry: false,
  });
};
