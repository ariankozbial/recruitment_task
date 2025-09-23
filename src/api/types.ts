type CharacterStatus = "Alive" | "Dead" | "unknown";
type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

type CharacterLocation = {
  name: string;
  url: string;
};

type Character = {
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

export type CharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
};
