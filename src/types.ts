type CharacterStatus = "Alive" | "Dead" | "unknown";
type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

type CharacterLocation = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type InfoType = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export type CharactersResponse = {
  info: InfoType;
  results: Character[];
};

export type CharacterResponse = {
  info: InfoType;
  results: Character;
};
