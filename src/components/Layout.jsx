



import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Navbar sidebarOpen={sidebarOpen} />
        <main className=" pt-16 flex-1 overflow-auto bg-gray-300">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

