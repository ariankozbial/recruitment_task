type Props = {
  name: string;
  status: string;
  handleNameChange: (name: string) => void;
  handleStatusChange: (status: string) => void;
  handleClear: () => void;
  handleRefresh: () => void;
  refreshButtonDisabled: boolean;
};
export const Filters = ({
  name,
  status,
  handleNameChange,
  handleStatusChange,
  handleClear,
  handleRefresh,
  refreshButtonDisabled,
}: Props) => {
  return (
    <div
      style={{
        marginBottom: 12,
        display: "flex",
        gap: 8,
        alignItems: "center",
      }}
    >
      <input
        placeholder="Filter by name"
        value={name}
        onChange={(e) => handleNameChange(e.target.value)}
      />
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">unknown</option>
      </select>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleRefresh} disabled={refreshButtonDisabled}>
        Refresh
      </button>
    </div>
  );
};
