import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination flex justify-between mt-4 w-[95%]">
    
      <span className="text-[14px] text-[#71717A] font-normal">
       {currentPage} of {totalPages} row(s) selected.  
      </span>

        <div className="flex text-[14px] text-[#71717A] font-normal gap-4">
        <button
          className={`border bg-[#fff] p-2 font-medium rounded-lg ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* <select
          className={`border bg-[#fff] p-2 font-medium rounded-lg cursor-pointer ${totalPages <= 1 ? "!cursor-not-allowed" : ""}`}
          value={currentPage}
          disabled={totalPages <= 1}
          onChange={(e) => onPageChange(Number(e.target.value))}
        >
          {pageNumbers.map((pageNumber) => (
            <option key={pageNumber} value={pageNumber}>
              {pageNumber}
            </option>
          ))}
        </select> */}

        <button
          className={`border bg-[#fff] p-2 font-medium rounded-lg ${currentPage === totalPages ? "cursor-not-allowed" : ""}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;