import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

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
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={totalPages}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      previousLabel={"Previous"}
      nextLabel={"Next"}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
};
