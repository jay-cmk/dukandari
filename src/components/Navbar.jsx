import UserProfile from "@/user/UserProfile";
import React from "react";

const Navbar = ({ sidebarOpen }) => {
  return (
    <nav
      className="fixed top-0 right-0 z-50 bg-[#262533] transition-all duration-300"
      style={{
        left: sidebarOpen ? "200px" : "64px",
        width: `calc(100% - ${sidebarOpen ? 200 : 64}px)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <span className="text-xl font-semibold text-white">Tenasiae</span>

        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            Quick Action
          </button>

          <div className="flex items-center space-x-3">
            {/* User Profile Dropdown */}
            <UserProfile/>
            
            {/* Additional button */}
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-sm font-medium text-white">we</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;