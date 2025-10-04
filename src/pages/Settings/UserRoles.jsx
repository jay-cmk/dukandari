// UserRoles.jsx
import React, { useState, useMemo } from "react";
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
} from "../../components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Import from separate files
import { usePagination } from "../../hooks/usePagination.jsx";
import { rowColors } from "../../constants/tableData.jsx";
import {
  cx,
  handleDelete,
} from "../../utils/helpers.jsx";

// User Role specific data - Only ID, Role Name and Actions
const userRoleSeed = [
  { id: 1, roleName: "User 1 Test" },
  { id: 2, roleName: "User 3 Test" },
  { id: 3, roleName: "User 2 Test" },
  { id: 4, roleName: "Default Admin" },
  { id: 5, roleName: "Account Manager" },
  { id: 6, roleName: "Purchase Manager" },
  { id: 7, roleName: "Cashier" },
  { id: 8, roleName: "Supervisor" },
  { id: 9, roleName: "Viewer" },
  { id: 10, roleName: "Auditor" },
];

export default function UserRoles() {
  const navigate = useNavigate();
  
  // Local state for search and pagination
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Filter and sort data based on query and sort configuration
  const { filteredAndSortedData, total, totalPages, start } = useMemo(() => {
    // Filter data based on search query
    let filteredData = userRoleSeed;
    if (query) {
      filteredData = userRoleSeed.filter(role =>
        role.roleName.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Sort data
    if (sortConfig.key) {
      filteredData = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    // Calculate pagination
    const total = filteredData.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (currentPage - 1) * pageSize;
    const paginatedData = filteredData.slice(start, start + pageSize);

    return {
      filteredAndSortedData: paginatedData,
      total,
      totalPages,
      start
    };
  }, [query, currentPage, pageSize, sortConfig]);

  // Search handler
  const handleSearchChange = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Page size handler
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Pagination handler
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Sort handler
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <span className="text-gray-400">↕</span>;
    }
    return sortConfig.direction === 'asc' ? 
      <span className="text-gray-600">↑</span> : 
      <span className="text-gray-600">↓</span>;
  };

  // Get aria label for sort
  const getAriaLabel = (key) => {
    if (sortConfig.key !== key) {
      return `Sort by ${key}`;
    }
    return sortConfig.direction === 'asc' ? 
      `Sorted by ${key} ascending` : 
      `Sorted by ${key} descending`;
  };

  // Use the custom hook for pagination
  const { getPaginationItems } = usePagination(currentPage, totalPages);
  const paginationItems = getPaginationItems();

  const handleCreateNew = () => {
    navigate("/settings/general/createNewUserRole");
  };

  const handleEdit = (role) => {
    navigate(`/settings/general/editUserRole/${role.id}`, {
      state: {
        roleData: role
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-3">
      <div className="mb-3">
        <h1 className="text-2xl text-gray-500">User Roles</h1>
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
          
          {/* Search Component */}
          <div className="flex-1 md:flex-none">
            <div className="relative">
              <input
                type="text"
                placeholder="Search roles..."
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full md:w-64 rounded-lg border border-gray-300 bg-white px-3 py-1 pl-9 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>
          </div>
          
          <div className="py-1">
            <Button onClick={handleCreateNew} className="py-1 text-sm">
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
                  onClick={() => handleSort("roleName")}
                  aria-label={getAriaLabel("roleName")}
                >
                  <div className="flex items-center gap-1">
                    {getSortIcon("roleName")}
                    Role Name
                  </div>
                </th>
                <th className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAndSortedData.map((role, idx) => {
                const colorIndex = (start + idx) % rowColors.length;
                const rowColorClass = rowColors[colorIndex];
                return (
                  <tr
                    key={role.id}
                    className={`${rowColorClass} transition-colors`}
                  >
                    <td className="px-3 py-1 text-gray-600 font-medium">
                      {start + idx + 1}
                    </td>
                    <td className="px-3 py-1">
                      <a
                        href={`/userroles/${role.id}`}
                        className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
                      >
                        {role.roleName}
                      </a>
                    </td>
                    <td className="px-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(role)}
                          className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          title="Edit"
                        >
                          <PencilSquareIcon className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(role)}
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
              {filteredAndSortedData.length === 0 && (
                <tr>
                  <td
                    className="px-3 py-8 text-center text-gray-500"
                    colSpan={3}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />
                      <p className="text-sm font-medium">No user roles found</p>
                      <p className="text-xs text-gray-400">
                        {query ? "Try adjusting your search query" : "No user roles available"}
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
              {total === 1 ? "role" : "roles"}
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