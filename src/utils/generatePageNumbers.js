const generatePageNumbers = (totalPages, currentPage) => {
  const pageNumbers = [];
  const range = 3;
  const start = Math.max(1, currentPage - range);
  const end = Math.min(totalPages, currentPage + range);

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

export default generatePageNumbers;
