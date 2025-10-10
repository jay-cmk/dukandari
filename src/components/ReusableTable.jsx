// components/ReusableTable.jsx
import React from "react";
import {
  PencilSquareIcon,
  TrashIcon,
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
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/usePagination";
import { useTableLogic } from "@/hooks/useTableLogic";
import { rowColors } from "@/constants/tableData";
import { cx } from "@/utils/helpers";
import EmployeeSearch from "./Search";

export const ReusableTable = ({
  title,
  data,
  columns,
  onCreate,
  onEdit,
  onDelete,
  createButtonText = "Create New",
  searchPlaceholder = "Search List...",
  emptyMessage = "No records found",
  showCreateButton = true,
  showEdit = true,
  showDelete = true,
}) => {
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
  } = useTableLogic(data);

  const { getPaginationItems } = usePagination(currentPage, totalPages);
  const paginationItems = getPaginationItems();

  const showActions = showEdit || showDelete;

  return (
    <div className=" bg-gray-50 p-2 md:p-3">
      <div className="mb-3">
        <h1 className="text-xl text-gray-500">{title}</h1>
      </div>

      <div className="mb-4 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
          <div className="flex items-center gap-3">
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

          <div className="flex-1 md:flex-none">
            <div className="relative">
              <EmployeeSearch
                type="text"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                className=""
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>
          </div>

          {showCreateButton && onCreate && (
            <div className="py-1">
              <Button onClick={onCreate} className="py-1 text-sm">
                {createButtonText}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-400 border-b p-4 border-gray-200">
              <tr>
                <th className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider">
                  #
                </th>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
                    onClick={() => handleSort(column.key)}
                    aria-label={getAriaLabel(column.key)}
                  >
                    <div className="flex items-center gap-1">
                      {getSortIcon(column.key)}
                      {column.label}
                    </div>
                  </th>
                ))}
                {showActions && (
                  <th className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, idx) => {
                const colorIndex = (start + idx) % rowColors.length;
                const rowColorClass = rowColors[colorIndex];
                return (
                  <tr
                    key={row.id}
                    className={`${rowColorClass} transition-colors`}
                  >
                    <td className="px-3 py-1 text-gray-600 font-medium">
                      {start + idx + 1}
                    </td>
                    {columns.map((column) => (
                      <td 
                        key={column.key} 
                        className={`px-3 py-1 text-gray-900 ${column.key === 'prefixValue' ? 'font-mono' : ''}`}
                      >
                        {row[column.key] || (row[column.key] === 0 ? 0 : "-")}
                      </td>
                    ))}
                    {showActions && (
                      <td className="px-3">
                        <div className="flex items-center gap-1">
                          {showEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="p-1 text-gray-900 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                              title="Edit"
                            >
                              <PencilSquareIcon className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {showDelete && onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="p-1 text-gray-900 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                              title="Delete"
                            >
                              <TrashIcon className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td
                    className="px-3 py-8 text-center text-gray-500"
                    colSpan={columns.length + (showActions ? 2 : 1)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />
                      <p className="text-sm font-medium">{emptyMessage}</p>
                      <p className="text-xs text-gray-400">
                        {query
                          ? "Try adjusting your search query"
                          : "No records available"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {total === 0 ? 0 : start + 1}-{Math.min(total, start + pageSize)}
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
                        currentPage === totalPages && "pointer-events-none opacity-50"
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
};