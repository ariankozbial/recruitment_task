type Props = {
  page: number;
  pagesCount: number;
  handlePageChange: (page: number) => void;
};

export const Pagination = ({ page, pagesCount, handlePageChange }: Props) => {
  return (
    <div
      style={{
        marginTop: 12,
        display: "flex",
        gap: 8,
        alignItems: "center",
      }}
    >
      <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
        Prev
      </button>
      <div>
        Page {page} / {pagesCount}
      </div>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= pagesCount}
      >
        Next
      </button>
    </div>
  );
};
