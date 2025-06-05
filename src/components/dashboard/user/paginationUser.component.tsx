"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { PaginationUserComponentProps } from "@/type";
import { FC } from "react";

const PaginationUserComponent: FC<PaginationUserComponentProps> = ({
  isLoading,
  setIsLoading,
  setCurrentPage,
  currentPage,
}) => {
  const students = useAppSelector((state) => state.student.students);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const totalPages = students.totalPages || 1;
    const currentPageNum = students.page || 1;
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
      {!isLoading && students.totalPages > 1 && (
        <div className="p-4 border-t border-accent-dark/30 bg-gradient-to-b from-transparent to-accent-dark/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-accent-medium font-montserrat text-xs">
              Mostrando{" "}
              <span className="text-white font-semibold">
                {students.docs.length}
              </span>{" "}
              de{" "}
              <span className="text-white font-semibold">
                {students.totalDocs}
              </span>{" "}
              usuarios | Página{" "}
              <span className="text-white font-semibold">{students.page}</span>{" "}
              de{" "}
              <span className="text-white font-semibold">
                {students.totalPages}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(1)}
                disabled={students.page === 1}
                className={`p-2 rounded-md ${
                  students.page === 1
                    ? "text-accent-medium/40 cursor-not-allowed"
                    : "text-accent-medium hover:bg-accent-dark/40 hover:text-white  cursor-pointer "
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
                onClick={() => handlePageChange(students.prevPage || 1)}
                disabled={!students.hasPrevPage}
                className={`p-2 rounded-md ${
                  !students.hasPrevPage
                    ? "text-accent-medium/40 cursor-not-allowed"
                    : "text-accent-medium hover:bg-accent-dark/40 hover:text-white cursor-pointer "
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
                      disabled={currentPage === pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`${
                        currentPage === pageNum
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } w-8 h-8 flex items-center justify-center rounded-md text-xs font-montserrat transition-colors  ${
                        pageNum === students.page
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
                  handlePageChange(students.nextPage || students.totalPages)
                }
                disabled={!students.hasNextPage}
                className={`p-2 rounded-md ${
                  !students.hasNextPage
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
                onClick={() => handlePageChange(students.totalPages)}
                disabled={students.page === students.totalPages}
                className={`p-2 rounded-md ${
                  students.page === students.totalPages
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

export default PaginationUserComponent;
