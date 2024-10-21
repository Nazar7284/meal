import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    }
  }

  const displayedPages: (number | string)[] = [];
  for (let i = 0; i < pages.length; i++) {
    displayedPages.push(pages[i]);

    if (i > 0 && pages[i] !== Number(pages[i - 1]) + 1) {
      displayedPages.splice(displayedPages.length - 1, 0, "...");
    }
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        &lt;
      </button>

      {displayedPages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="px-2">
              {page}
            </span>
          );
        }
        return (
          <button
            key={page}
            onClick={() => handlePageClick(page as number)}
            className={`px-4 py-2 ${
              currentPage === page ? "font-bold border-b-2 border-blue-500" : ""
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
