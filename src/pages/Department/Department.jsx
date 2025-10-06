import React, { useState } from "react";
import { Pencil, Upload, Trash2, Filter, X } from "lucide-react";
import EmployeeSearch from "@/components/Search";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import IconHome from "@/components/HomeIcon/IconHome";

const Department = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "PERSONAL CARE", createdBy: "HUMMING VEDA" },
    { id: 2, name: "department1", createdBy: "HUMMING VEDA" },
    { id: 3, name: "clothes", createdBy: "HUMMING VEDA" },
    { id: 4, name: "General", createdBy: "HUMMING VEDA" },
    { id: 5, name: "d1", createdBy: "HUMMING VEDA" },
    { id: 6, name: "veg", createdBy: "HUMMING VEDA" },
    { id: 7, name: "fruits", createdBy: "HUMMING VEDA" },
    { id: 8, name: "Other", createdBy: "HUMMING VEDA" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");

  const totalPages = Math.ceil(departments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedDepartments = departments.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSave = () => {
    if (!newDeptName.trim()) return;
    const newDept = {
      id: departments.length + 1,
      name: newDeptName,
      createdBy: "HUMMING VEDA",
    };
    setDepartments([...departments, newDept]);
    setNewDeptName("");
    setShowModal(false);
  };

  return (
    <div className="py-1 pl-3 pr-3">
      {/* Header */}
      <div className="pb-3 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h1 className="text-2xl text-gray-500">Department</h1>
          <div className="h-6 w-px bg-gray-400"></div>
          <div className="flex items-center gap-4">
            <IconHome className="text-gray-500 w-8 h-8" />
            <div className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
              - Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white p-4 rounded-md shadow-sm">
        {/* Top Controls */}
        <div className="flex flex-wrap justify-end items-center mb-3 gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button className="py-1 text-xs bg-neutral-600 hover:bg-black text-white">
              <Filter className="w-4 h-4" /> Filter
            </Button>

            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

            <div className="flex items-center gap-2">
              <EmployeeSearch />
              <Button
                onClick={() => setShowModal(true)}
                className="py-1 text-xs bg-neutral-600 hover:bg-black text-white"
              >
                Create New
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full border-collapse divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr className="divide-x divide-gray-200">
                <th className="px-4 py-2 text-left text-sm font-semibold w-12">#</th>
                <th className="px-4 py-2 text-left text-sm font-semibold w-60">Image</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Created By</th>
                <th className="px-4 py-2 text-center text-sm font-semibold w-60">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-gray-700">
              {displayedDepartments.map((dept, index) => (
                <tr key={dept.id} className="hover:bg-gray-50 transition-colors divide-x divide-gray-200">
                  <td className="px-4 py-1 text-sm text-gray-600">{startIndex + index + 1}</td>
                  <td className="px-4 py-1">
                    <div className="w-10 h-10 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mx-auto">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="dept"
                        className="w-6 h-6 opacity-50"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-1">{dept.name}</td>
                  <td className="px-4 py-1">{dept.createdBy}</td>
                  <td className="px-4 py-1 text-center">
                    <div className="flex justify-start gap-3">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Upload className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 bg-gray-50 text-sm text-gray-600 border-t border-gray-200">
            <p>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, departments.length)} of {departments.length} entries
            </p>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 animate-fadeIn ">
          <div className="bg-white w-80 rounded-md shadow-lg p-4 relative animate-slideDown">
            {/* Header */}
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg font-semibold text-gray-700">New Department</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Divider */}
            <hr className="border-t border-gray-300 my-2" />

            {/* Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Department Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Department Name"
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 text-xs py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="px-4 text-xs bg-neutral-600 hover:bg-black text-white rounded-sm"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Department;
