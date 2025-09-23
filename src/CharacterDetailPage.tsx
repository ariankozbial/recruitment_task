import { useParams } from "@tanstack/react-router";
import { useCharacter } from "./hooks";

const CharacterDetailPage = () => {
  const { characterId } = useParams({ from: "/characters/$characterId" });
  const { data, isLoading, isError, error } = useCharacter(Number(characterId));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {error?.message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{data?.name}</h2>
      <img src={data?.image} alt={data?.name} width={200} />
      <p>Status: {data?.status}</p>
      <p>Species: {data?.species}</p>
      <p>Gender: {data?.gender}</p>
      <p>Origin: {data?.origin?.name}</p>
    </div>
  );
};

export default CharacterDetailPage;
