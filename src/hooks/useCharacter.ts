import { useQuery } from "@tanstack/react-query";
import type { Character } from "../api/types.ts";
import { getCharacter } from "../api";

export const useCharacter = (id: number) => {
  return useQuery<Character, Error>({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id),
    staleTime: 1000 * 60 * 2,
  });
};
