import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const CustomScrollbar = ({ children, maxHeight = "100%", className = "" }) => {
  return (
    <SimpleBar
      style={{ maxHeight, overflowX: "hidden" }} // ✅ fix x-axis scroll
      className={`custom-scrollbar ${className}`}
      autoHide={false} // ✅ always visible
    >
      {children}
    </SimpleBar>
  );
};

export default CustomScrollbar;
