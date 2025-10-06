import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import EmployeeSearch from "../../components/Search";
import CreateModal from "./modelCategoryBrand";
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash2, FiDownload, FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";
import IconHome from "@/components/HomeIcon/IconHome";

const CategoryBrandUI = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [editModal, setEditModal] = useState({ show: false, type: "", data: {} });

  const [categoryPage, setCategoryPage] = useState(1);
  const [brandPage, setBrandPage] = useState(1);
  const [categoryQuery, setCategoryQuery] = useState("");
  const [brandQuery, setBrandQuery] = useState("");
  const [categoryItemsPerPage, setCategoryItemsPerPage] = useState(10);
  const [brandItemsPerPage, setBrandItemsPerPage] = useState(10);

  const categoryTotal = 264;
  const brandTotal = 107;

  // Sample data
  const categoryData = Array.from({ length: categoryTotal }, (_, i) => ({
    id: i + 1,
    name: `Category Item ${i + 1}`,
    code: i % 2 === 0 ? `CODE${i + 1}` : "",
    description: i % 3 === 0 ? `Description for ${i + 1}` : "",
    image: Math.random() > 0.5 ? `https://via.placeholder.com/50x50?text=IMG` : undefined,
  }));

  const brandData = Array.from({ length: brandTotal }, (_, i) => ({
    id: i + 1,
    name: `Brand Item ${i + 1}`,
    code: i % 2 === 0 ? `BRAND${i + 1}` : "",
    description: i % 3 === 0 ? `Brand desc ${i + 1}` : "",
    image: Math.random() > 0.5 ? `https://via.placeholder.com/50x50?text=BRAND` : undefined,
  }));

  // Apply search
  const filteredCategoryData = categoryData.filter((item) =>
    item.name.toLowerCase().includes(categoryQuery.toLowerCase())
  );
  const filteredBrandData = brandData.filter((item) =>
    item.name.toLowerCase().includes(brandQuery.toLowerCase())
  );

  const renderActions = (item, type) => (
    <div className="flex space-x-2">
      {/* Edit */}
      <button
        className="p-2   hover:bg-green-100 rounded-md transition-colors duration-200"
        onClick={() => setEditModal({ show: true, type, data: item })}
        title="Edit"
      >
        <FiEdit className="w-4 h-4" />
      </button>

      {/* Delete */}
      <button
        className="p-2   hover:bg-red-100 rounded-md transition-colors duration-200"
        title="Delete"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>

      {/* Download */}
      <button
        className="p-2   hover:bg-blue-100 rounded-md transition-colors duration-200"
        title="Download"
      >
        <FiDownload className="w-4 h-4" />
      </button>
    </div>
  );

  const renderPagination = (page, totalPages, setPage, itemsPerPage, filteredData) => {
    const getPageNumbers = () => {
      if (totalPages <= 3) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (page <= 2) {
        return [1, 2, '...', totalPages];
      } else if (page >= totalPages - 1) {
        return [1, '...', totalPages - 1, totalPages];
      } else {
        return [1, '...', page, '...', totalPages];
      }
    };

    const startIndex = (page - 1) * itemsPerPage;
    const showingFrom = startIndex + 1;
    const showingTo = Math.min(startIndex + itemsPerPage, filteredData.length);

    return (
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700 border-t  mt-2 ">
        <div className="text-sm text-gray-300">
          Showing {showingFrom} to {showingTo} of {filteredData.length} entries
        </div>

        <div>
          <Pagination>
            <PaginationContent className="gap-0">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                  className={`text-white border border-gray-500 hover:bg-gray-700 p-1.5 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  <FiChevronLeft className="w-3 h-3" />
                </PaginationPrevious>
              </PaginationItem>

              {getPageNumbers().map((pageNum, index) => (
                <PaginationItem key={index}>
                  {pageNum === '...' ? (
                    <span className="px-2 py-1 text-gray-400 text-sm">...</span>
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={pageNum === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(pageNum);
                      }}
                      className={`border border-gray-500 rounded w-8 h-8 flex items-center justify-center mx-0.5 text-sm ${pageNum === page
                          ? "bg-blue-600 text-white border-blue-600 shadow-md"
                          : "text-white hover:bg-gray-700"
                        }`}
                    >
                      {pageNum}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) setPage(page + 1);
                  }}
                  className={`text-white border border-gray-500 hover:bg-gray-700 p-1.5 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  <FiChevronRight className="w-3 h-3" />
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  };

  const ItemsPerPageDropdown = ({ itemsPerPage, setItemsPerPage, setPage, type }) => (
    <div className="relative">
      <select
        value={itemsPerPage}
        onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          setPage(1);
        }}
        className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 p-2 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3" />
    </div>
  );

  const renderTable = (data, page, setPage, type, itemsPerPage, setItemsPerPage) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    const rowColors = ["bg-white", "bg-gray-50"];

    return (
      <>
        <div className="overflow-x-auto border border-gray-200 rounded-md">
          <table className="min-w-full divide-y divide-gray-300 border-collapse">
            <thead className="bg-gray-100">
              <tr className="divide-x divide-gray-300 font-bold">
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Image</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Code</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Description</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {paginatedData.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`${rowColors[idx % rowColors.length]} divide-x divide-gray-300 hover:bg-gray-100 transition-colors duration-150`}
                >
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-4 py-4">
                    <img
                      src={item.image || "https://via.placeholder.com/50x50?text=No+Image"}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded border border-gray-200"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">{item.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-mono">{item.code || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs">{item.description || "No description"}</td>
                  <td className="px-4 py-4">{renderActions(item, type)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {renderPagination(page, totalPages, setPage, itemsPerPage, data)}
      </>
    );
  };

  return (
    <div className=" bg-gray-100 ">
      <div className="p-4">
        <div className="pb-3 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <h1 className="text-2xl text-gray-500">Category/Brand</h1>
            <div className="h-6 w-px bg-gray-400"></div>
            <div className="flex items-center gap-4">
              <IconHome className="text-gray-500 w-8 h-8" />
              <div className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
                - Dashboard
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-6">
          {/* Category Panel */}
          <div className="flex-1 bg-white rounded-lg shadow-md">
            <div className="p-3 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Category</h2>
              <div className="flex items-center space-x-2">
                <EmployeeSearch query={categoryQuery} onQueryChange={setCategoryQuery} />
                <ItemsPerPageDropdown
                  itemsPerPage={categoryItemsPerPage}
                  setItemsPerPage={setCategoryItemsPerPage}
                  setPage={setCategoryPage}
                  type="category"
                />
                <Button
                  onClick={() => setShowCategoryModal(true)}
                  className="py-1  text-xs  bg-neutral-600 hover:bg-black text-white"
                >
                  Create New
                </Button>
              </div>
            </div>
            {renderTable(
              filteredCategoryData,
              categoryPage,
              setCategoryPage,
              "category",
              categoryItemsPerPage,
              setCategoryItemsPerPage
            )}
          </div>

          {/* Brand Panel */}
          <div className="flex-1 bg-white rounded-lg shadow-md">
            <div className="p-3 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Brand</h2>
              <div className="flex items-center space-x-2">
                <EmployeeSearch query={brandQuery} onQueryChange={setBrandQuery} />
                <ItemsPerPageDropdown
                  itemsPerPage={brandItemsPerPage}
                  setItemsPerPage={setBrandItemsPerPage}
                  setPage={setBrandPage}
                  type="brand"
                />
                <Button
                  onClick={() => setShowBrandModal(true)}
                  className="py-3  text-xs bg-neutral-600 hover:bg-black text-white"
                >
                  Create New
                </Button>
              </div>
            </div>
            {renderTable(
              filteredBrandData,
              brandPage,
              setBrandPage,
              "brand",
              brandItemsPerPage,
              setBrandItemsPerPage
            )}
          </div>
        </div>

        {/* Create Modals */}
        <CreateModal
          show={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          title="New Category"
          fields={[
            { label: "Department*", type: "select", valueKey: "department", placeholder: "Select Department" },
            { label: "Category Name*", type: "text", valueKey: "name", placeholder: "Enter Category Name" },
            { label: "Category Code", type: "text", valueKey: "code", placeholder: "Enter Category Code" },
            { label: "Parent Category", type: "select", valueKey: "parent", placeholder: "Select Parent Category" },
            { label: "Description", type: "textarea", valueKey: "description", placeholder: "Enter Description" },
          ]}
          onSave={(data) => {
            console.log("Category Created:", data);
            setShowCategoryModal(false);
          }}
        />

        <CreateModal
          show={showBrandModal}
          onClose={() => setShowBrandModal(false)}
          title="New Brand"
          fields={[
            { label: "Brand Name*", type: "text", valueKey: "name", placeholder: "Enter Brand Name" },
            { label: "Brand Code", type: "text", valueKey: "code", placeholder: "Enter Brand Code" },
            { label: "Parent Brand", type: "select", valueKey: "parent", placeholder: "Select Parent Brand" },
            { label: "Description", type: "textarea", valueKey: "description", placeholder: "Enter Description" },
          ]}
          onSave={(data) => {
            console.log("Brand Created:", data);
            setShowBrandModal(false);
          }}
        />

        {/* Edit Modal */}
        {editModal.show && (
          <CreateModal
            show={editModal.show}
            onClose={() => setEditModal({ show: false, type: "", data: {} })}
            title={`Edit ${editModal.type === "category" ? "Category" : "Brand"}`}
            fields={[
              { label: "Name", type: "text", valueKey: "name", value: editModal.data.name || "" },
              { label: "Code", type: "text", valueKey: "code", value: editModal.data.code || "" },
              { label: "Description", type: "textarea", valueKey: "description", value: editModal.data.description || "" },
            ]}
            onSave={(data) => {
              console.log("Edited Data:", data);
              setEditModal({ show: false, type: "", data: {} });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryBrandUI;