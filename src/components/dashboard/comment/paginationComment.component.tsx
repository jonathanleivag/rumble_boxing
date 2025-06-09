"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { FC } from "react";
import { setPageComment } from "@/lib/redux/features/comment/comment.slice";

interface PaginationCommentComponentProps {
  isLoading?: boolean;
  setIsLoading?: (loading: boolean) => void;
}

const PaginationCommentComponent: FC<PaginationCommentComponentProps> = ({
  isLoading = false,
  setIsLoading,
}) => {
  const comments = useAppSelector((state) => state.comment.comments);
  const currentPage = useAppSelector((state) => state.comment.page);
  const dispatch = useAppDispatch();

  const handlePageChange = (page: number) => {
    if (setIsLoading) setIsLoading(true);
    dispatch(setPageComment(page));
  };

  const getPageNumbers = () => {
    const totalPages = comments.totalPages || 1;
    const currentPageNum = comments.page || 1;
    const pageNumbers: number[] = [];

    if (currentPageNum > 3) {
      pageNumbers.push(1);
      if (currentPageNum > 4) {
        pageNumbers.push(-1);
      }
    }

    if (currentPageNum > 1) {
      pageNumbers.push(currentPageNum - 1);
    }

    pageNumbers.push(currentPageNum);

    if (currentPageNum < totalPages) {
      pageNumbers.push(currentPageNum + 1);
    }

    if (currentPageNum < totalPages - 2) {
      if (currentPageNum < totalPages - 3) {
        pageNumbers.push(-1);
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <>
      {!isLoading && comments.totalPages > 1 && (
        <div className="p-4 border-t border-accent-dark/30 bg-gradient-to-b from-transparent to-accent-dark/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-accent-medium font-montserrat text-xs">
              Mostrando{" "}
              <span className="text-white font-semibold">
                {comments.docs.length}
              </span>{" "}
              de{" "}
              <span className="text-white font-semibold">
                {comments.totalDocs}
              </span>{" "}
              comentarios | Página{" "}
              <span className="text-white font-semibold">{comments.page}</span>{" "}
              de{" "}
              <span className="text-white font-semibold">
                {comments.totalPages}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(1)}
                disabled={comments.page === 1}
                className={`p-2 rounded-md ${
                  comments.page === 1
                    ? "text-accent-medium/40 cursor-not-allowed"
                    : "text-accent-medium hover:bg-accent-dark/40 hover:text-white cursor-pointer"
                } transition-colors`}
                title="Primera página"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polyline points="11 17 6 12 11 7"></polyline>
                  <polyline points="18 17 13 12 18 7"></polyline>
                </svg>
              </button>
              <button
                onClick={() => handlePageChange(comments.prevPage || 1)}
                disabled={!comments.hasPrevPage}
                className={`p-2 rounded-md ${
                  !comments.hasPrevPage
                    ? "text-accent-medium/40 cursor-not-allowed"
                    : "text-accent-medium hover:bg-accent-dark/40 hover:text-white cursor-pointer"
                } transition-colors`}
                title="Página anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <div className="flex items-center space-x-1">
                {getPageNumbers().map((pageNum) =>
                  pageNum === -1 ? (
                    <span
                      key={`ellipsis-${pageNum}`}
                      className="w-8 h-8 flex items-center justify-center text-accent-medium"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`${
                        currentPage === pageNum
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } w-8 h-8 flex items-center justify-center rounded-md text-xs font-montserrat transition-colors ${
                        pageNum === comments.page
                          ? "bg-gradient-to-r from-primary to-primary-dark text-white"
                          : "text-accent-medium hover:bg-accent-dark/40 hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  handlePageChange(comments.nextPage || comments.totalPages)
                }
                disabled={!comments.hasNextPage}
                className={`p-2 rounded-md ${
                  !comments.hasNextPage
                    ? "text-accent-medium/40 cursor-not-allowed"
                    : "text-accent-medium hover:bg-accent-dark/40 hover:text-white cursor-pointer"
                } transition-colors`}
                title="Página siguiente"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
              <button
                onClick={() => handlePageChange(comments.totalPages)}
                disabled={comments.page === comments.totalPages}
                className={`p-2 rounded-md ${
                  comments.page === comments.totalPages
                    ? "text-accent-medium/40 cursor-not-allowed"
                    : "text-accent-medium hover:bg-accent-dark/40 hover:text-white cursor-pointer"
                } transition-colors`}
                title="Última página"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polyline points="13 17 18 12 13 7"></polyline>
                  <polyline points="6 17 11 12 6 7"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaginationCommentComponent;
