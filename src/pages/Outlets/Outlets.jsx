// pages/EmployeePage.jsx
import React from "react";
import EmployeeSearch from "../../components/Search";
import {
  PencilSquareIcon,
  TrashIcon,
  NoSymbolIcon,
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Import from separate files
import { useTableLogic } from "../../hooks/useTableLogic.jsx";
import { usePagination } from "../../hooks/usePagination.jsx";
import { seed, rowColors } from "../../constants/tableData.jsx";
import {
  cx,
  handleEdit,
  handleDisable,
  handleDelete,
  handleOpen,
} from "../../utils/helpers.jsx";

export default function EmployeePage() {
  const navigate = useNavigate();

  // Use the custom hook for table logic
  const {
    query,
    pageSize,
    rows,
    total,
    totalPages,
    currentPage,
    start,
    handleSearchChange,
    handlePageSizeChange,
    changePage,
    handleSort,
    getSortIcon,
    getAriaLabel,
    sortConfig,
  } = useTableLogic(seed);

  // Use the custom hook for pagination
  const { getPaginationItems } = usePagination(currentPage, totalPages);
  const paginationItems = getPaginationItems();

  const handleCreateNew = () => {
    navigate("/outletsForm");
  };

  // Function to check if a column is currently sorted
  const isColumnSorted = (key) => {
    return sortConfig.key === key;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-3">
      <div className="mb-3">
        <h1 className="text-2xl text-gray-500">Outlet</h1>
      </div>

      <div className="mb-4 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
        <div className="flex flex-col  gap-4 md:flex-row md:items-center md:justify-end">
          <div className="flex items-center gap-3 ">
            <select
              className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              {[10, 15, 20, 25, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          {/* Search Component - Full width */}
          <div className="">
            <EmployeeSearch query={query} onQueryChange={handleSearchChange} />
          </div>
          <div className="py-1">
            <Button onClick={handleCreateNew} className=" py-1 text-sm ">
              Create New
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-400 border-b p-4 border-gray-200">
              <tr>
                <th className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider">
                  #
                </th>
                <th
                  className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider cursor-pointer bg-gray-400"
                  onClick={() => handleSort("type")}
                  aria-label={getAriaLabel("type")}
                >
                  <div className="flex items-center gap-1">
                    {getSortIcon("type")}
                    Outlet Type
                  </div>
                </th>
                <th
                  className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider cursor-pointer bg-gray-400"
                  onClick={() => handleSort("name")}
                  aria-label={getAriaLabel("name")}
                >
                  <div className="flex items-center gap-1">
                    {getSortIcon("name")}
                    Name
                  </div>
                </th>
                <th
                  className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider cursor-pointer bg-gray-400"
                  onClick={() => handleSort("contactName")}
                  aria-label={getAriaLabel("contactName")}
                >
                  <div className="flex items-center gap-1">
                    {getSortIcon("contactName")}
                    Contact Name
                  </div>
                </th>
                <th
                  className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider cursor-pointer bg-gray-400"
                  onClick={() => handleSort("contactNo")}
                  aria-label={getAriaLabel("contactNo")}
                >
                  <div className="flex items-center gap-1">
                    {getSortIcon("contactNo")}
                    Contact No
                  </div>
                </th>
                <th
                  className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider cursor-pointer bg-gray-400"
                  onClick={() => handleSort("year")}
                  aria-label={getAriaLabel("year")}
                >
                  <div className="flex items-center gap-1">
                    {getSortIcon("year")}
                    Year Interval
                  </div>
                </th>
                <th
                  className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider cursor-pointer bg-gray-400"
                  onClick={() => handleSort("month")}
                  aria-label={getAriaLabel("month")}
                >
                  <div className="flex items-center gap-1">
                    {getSortIcon("month")}
                    Month Interval
                  </div>
                </th>
                <th className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider cursor-pointer bg-gray-400">
                  <div className="flex items-center gap-1">
                    {getSortIcon("action")}
                  Actions
                   </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((e, idx) => {
                const colorIndex = (start + idx) % rowColors.length;
                const rowColorClass = rowColors[colorIndex];
                return (
                  <tr
                    key={e.id}
                    className={`${rowColorClass} transition-colors`}
                  >
                    <td className="px-3 py-1 text-gray-600 font-medium">
                      {start + idx + 1}
                    </td>
                    <td className="px-3 py-1">
                      <a
                        href={e.href || "#"}
                        className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
                      >
                        {e.type}
                      </a>
                    </td>
                    <td className="px-3 text-gray-700">{e.name}</td>
                    <td className="px-3 text-gray-700">
                      {e.contactName ? (
                        <span className="break-all">{e.contactName}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-3 text-gray-700">{e.contactNo}</td>
                    <td className="px-3 text-gray-700">{e.year}</td>
                    <td className="px-3 text-gray-700">{e.month}</td>
                    <td className="px-3">
                      <div className="flex items-center gap-1">
                        {/* <button
                          onClick={() => handleOpen(e)}
                          className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="View"
                        >
                          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                        </button> */}
                        <button
                          onClick={() => handleEdit(e, navigate)}
                          className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          title="Edit"
                        >
                          <PencilSquareIcon className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDisable(e)}
                          className="p-1 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                          title="Disable"
                        >
                          <NoSymbolIcon className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(e)}
                          className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete"
                        >
                          <TrashIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td
                    className="px-3 py-8 text-center text-gray-500"
                    colSpan={8}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />
                      <p className="text-sm font-medium">No employees found</p>
                      <p className="text-xs text-gray-400">
                        Try adjusting your search query
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex flex-row justify-between gap-4 sm:flex-row">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {total === 0 ? 0 : start + 1}-
                {Math.min(total, start + pageSize)}
              </span>{" "}
              of <span className="font-semibold text-gray-900">{total}</span>{" "}
              {total === 1 ? "entry" : "entries"}
            </div>

            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => changePage(currentPage - 1)}
                      className={cx(
                        "cursor-pointer",
                        currentPage === 1 && "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>

                  {paginationItems.map((item, index) => {
                    if (item === "ellipsis-start" || item === "ellipsis-end") {
                      return (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    return (
                      <PaginationItem key={item}>
                        <PaginationLink
                          onClick={() => changePage(item)}
                          isActive={currentPage === item}
                          className="cursor-pointer"
                        >
                          {item}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => changePage(currentPage + 1)}
                      className={cx(
                        "cursor-pointer",
                        currentPage === totalPages &&
                          "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}