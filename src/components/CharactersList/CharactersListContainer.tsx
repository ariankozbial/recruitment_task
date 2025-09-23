import { CharactersList } from "./components/";
import { useCharactersListSearch } from "./hooks";

export const CharactersListContainer = () => {
  const {
    page,
    name,
    status,
    handlePageChange,
    handleNameChange,
    handleStatusChange,
    handleClear,
  } = useCharactersListSearch();

  return (
    <CharactersList
      page={page}
      name={name}
      status={status}
      handlePageChange={handlePageChange}
      handleNameChange={handleNameChange}
      handleStatusChange={handleStatusChange}
      handleClear={handleClear}
    />
  );
};
