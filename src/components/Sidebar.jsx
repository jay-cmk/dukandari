import React from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  ShoppingCart,
  Building,
  FileText,
  BarChart,
  Gift,
  Calculator,
} from "lucide-react";
import { HiMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Employee", icon: Users, path: "/employee" },
    { name: "Teams", icon: Users, path: "/teams" },
    { name: "Products", icon: ShoppingCart, path: "/products" },
    { name: "Company", icon: Building, path: "/company" },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "Analytics", icon: BarChart, path: "/analytics" },
    { name: "Gifts", icon: Gift, path: "/gifts" },
    { name: "Calculator", icon: Calculator, path: "/calculator" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div
      className={`bg-[#262533] h-screen p-3 pt-4 transition-all duration-300 flex-shrink-0 flex flex-col ${
        isOpen ? "w-50" : "w-16"
      }`}
    >
      {/* Hamburger / Toggle at the top */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700 rounded text-white transition-colors duration-200"
        >
          <HiMenu size={24} />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 space-y-2">
        {menus.map((menu, index) => (
          <li key={index}>
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded cursor-pointer transition-all duration-200 group ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-blue-500"
                }`
              }
            >
              <menu.icon
                size={20}
                className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
              />
              <span
                className={`text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "opacity-100 max-w-[120px] translate-x-0"
                    : "opacity-0 max-w-0 -translate-x-2"
                }`}
                style={{
                  transitionProperty: "opacity, max-width, transform",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {menu.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
