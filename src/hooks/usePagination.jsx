export const usePagination = (currentPage, totalPages) => {
  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1);
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) endPage = 4;
      if (currentPage >= totalPages - 2) startPage = totalPages - 3;
      if (startPage > 2) items.push('ellipsis-start');
      for (let i = startPage; i <= endPage; i++) items.push(i);
      if (endPage < totalPages - 1) items.push('ellipsis-end');
      items.push(totalPages);
    }
    return items;
  };

  return { getPaginationItems };
};