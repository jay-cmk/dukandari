import React, { useState } from "react";
import { ReusableTable } from "@/components/ReusableTable";
import { ReusableModal } from "@/components/ReusableModal";

// Configuration for Additional Charge
const additionalChargeConfig = {
  title: "Additional Charge Master",
  data: [],
  columns: [
    { key: "name", label: "Name", sortable: true },
    { key: "isDefault", label: "Is Default", sortable: true },
    { key: "createdBy", label: "Created By", sortable: true },
    { key: "actions", label: "Actions", sortable: false }
  ],
  modalFields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Enter Name"
    },
    {
      name: "isDefault",
      label: "Is Default",
      type: "checkbox",
      required: false
    }
  ]
};

export default function CustomerCategory() {
  const [data, setData] = useState(additionalChargeConfig.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleCreate = () => {
    setSelectedItem(null);
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      setData(prev => prev.filter(d => d.id !== item.id));
    }
  };

  const handleSave = (formData) => {
    if (isEdit && selectedItem) {
      setData(prev => prev.map(item => 
        item.id === selectedItem.id 
          ? { 
              ...item, 
              ...formData,
              isDefault: formData.isDefault || false
            }
          : item
      ));
    } else {
      const newItem = {
        ...formData,
        isDefault: formData.isDefault || false,
        id: Math.max(0, ...data.map(d => d.id)) + 1,
        createdBy: "Current User", // You can replace this with actual user data
      };
      setData(prev => [...prev, newItem]);
    }
  };

  return (
    <>
      <ReusableTable
        title={additionalChargeConfig.title}
        data={data}
        columns={additionalChargeConfig.columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        createButtonText="Create New "
        emptyMessage="No data available in table"
      />

      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={isEdit ? "Edit Additional " : "New Additional"}
        fields={additionalChargeConfig.modalFields}
        initialData={selectedItem || {}}
        isEdit={isEdit}
      />
    </>
  );
}