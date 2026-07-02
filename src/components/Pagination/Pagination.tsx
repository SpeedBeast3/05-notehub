import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className={css.pagination}>
      <li onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}>
        <a>Previous</a>
      </li>

      {pages.map((page) => (
        <li
          key={page}
          className={page === currentPage ? css.active : ""}
          onClick={() => onPageChange(page)}
        >
          <a>{page}</a>
        </li>
      ))}

      <li
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        <a>Next</a>
      </li>
    </ul>
  );
};
