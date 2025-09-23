import { useParams } from "@tanstack/react-router";
import { useCharacter } from "../hooks";

export const CharacterDetails = () => {
  const { characterId } = useParams({ from: "/characters/$characterId" });
  const { data, isLoading, isFetching, isError, error } = useCharacter(
    Number(characterId),
  );

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p style={{ color: "red" }}>Error: {error?.message}</p>;
  }

  return (
    data && (
      <div>
        <img src={data.image} alt={data.name} width={250} />
        <p style={{ fontSize: 24, fontWeight: 600 }}>{data.name}</p>
        <p>Status: {data.status}</p>
        <p>Species: {data.species}</p>
        <p>Gender: {data.gender}</p>
        <p>Origin: {data.origin.name}</p>
        <p>Location: {data.location.name}</p>
        <p>Episodes: {data.episode.length}</p>
      </div>
    )
  );
};
