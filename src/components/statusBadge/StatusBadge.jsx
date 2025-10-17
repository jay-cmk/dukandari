import React from "react";

const StatusBadge = ({ status }) => {
  const colorMap = {
    COMPLETED: "bg-green-500",
    IN_PROGRESS: "bg-blue-500",
    CANCELLED: "bg-red-500",
  };

  return (
    <span
      className={`text-white text-xs px-3 py-1 rounded-md font-semibold ${colorMap[status] || "bg-gray-500"}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
