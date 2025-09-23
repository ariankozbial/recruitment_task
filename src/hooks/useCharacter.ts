import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Character } from "../types.ts";
import { getCharacter } from "../api";

export const useCharacter = (id: number) => {
  return useQuery<Character, Error>({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id),
    placeholderData: keepPreviousData,
  });
};
