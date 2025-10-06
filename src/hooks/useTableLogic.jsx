// hooks/useTableLogic.jsx
import { useMemo, useState, useCallback } from "react";

export const useTableLogic = (initialData = []) => {
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Define search fields that match your actual data structure
  // For UserRoles, we search by roleName
  const searchFields = ["roleName"];

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return initialData;

    const searchTerm = q.toLowerCase();

    return initialData.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (value == null) return false;

        const fieldValue = String(value).toLowerCase();
        return fieldValue.includes(searchTerm);
      });
    });
  }, [query, initialData, searchFields]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle null/undefined values
      if (aValue == null) aValue = "";
      if (bValue == null) bValue = "";

      // Convert to string for consistent comparison
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filtered, sortConfig]);

  // Pagination calculations
  const paginationData = useMemo(() => {
    const total = sortedData.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const start = (currentPage - 1) * pageSize;
    const rows = sortedData.slice(start, start + pageSize);

    const hasData = total > 0;
    const showingFrom = hasData ? start + 1 : 0;
    const showingTo = Math.min(start + pageSize, total);
    const canPrevious = currentPage > 1;
    const canNext = currentPage < totalPages;

    return {
      total,
      totalPages,
      currentPage,
      start,
      rows,
      hasData,
      showingFrom,
      showingTo,
      canPrevious,
      canNext,
    };
  }, [sortedData, pageSize, page]);

  // Event handlers
  const handleSearchChange = useCallback((searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  }, []);

  const changePage = useCallback(
    (p) => {
      setPage(Math.min(Math.max(1, p), paginationData.totalPages));
    },
    [paginationData.totalPages]
  );

  const handleSort = useCallback((key) => {
    setSortConfig((current) => {
      if (current.key === key) {
        if (current.direction === "asc") return { key, direction: "desc" };
        if (current.direction === "desc")
          return { key: null, direction: "asc" };
      }
      return { key, direction: "asc" };
    });
  }, []);

  const resetTable = useCallback(() => {
    setQuery("");
    setPage(1);
    setSortConfig({ key: null, direction: "asc" });
  }, []);

  const getSortIcon = useCallback(
    (key) => {
      if (sortConfig.key !== key) {
        return (
          <div className="inline-flex flex-col -space-y-0.5 text-gray-600">
            <span className="text-[10px] leading-3">▲</span>
            <span className="text-[10px] leading-3">▼</span>
          </div>
        );
      }

      return sortConfig.direction === "asc" ? (
        <div className="inline-flex flex-col -space-y-0.5 text-black">
          <span className="text-[10px] leading-3 font-bold">▲</span>
          <span className="text-[10px] leading-3 text-gray-600">▼</span>
        </div>
      ) : (
        <div className="inline-flex flex-col -space-y-0.5 text-black">
          <span className="text-[10px] leading-3 text-gray-600">▲</span>
          <span className="text-[10px] leading-3 font-bold">▼</span>
        </div>
      );
    },
    [sortConfig]
  );

  const getAriaLabel = useCallback(
    (key) => {
      if (sortConfig.key === key) {
        return sortConfig.direction === "asc"
          ? `${key}: sorted ascending`
          : `${key}: sorted descending`;
      }
      return `${key}: activate to sort column ascending`;
    },
    [sortConfig]
  );

  return {
    // State
    query,
    pageSize,
    page,
    rows: paginationData.rows,
    total: paginationData.total,
    totalPages: paginationData.totalPages,
    currentPage: paginationData.currentPage,
    start: paginationData.start,
    sortConfig,

    // Helpers
    hasData: paginationData.hasData,
    showingFrom: paginationData.showingFrom,
    showingTo: paginationData.showingTo,
    canPrevious: paginationData.canPrevious,
    canNext: paginationData.canNext,

    // Actions
    handleSearchChange,
    handlePageSizeChange,
    changePage,
    handleSort,
    resetTable,

    // UI helpers
    getSortIcon,
    getAriaLabel,
  };
};