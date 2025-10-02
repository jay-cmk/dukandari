import React, { useState } from "react";
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
  Network
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isHovered, setIsHovered] = useState(false);

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
   { name: "Outlets", icon: Network , path: "/outlets" },
  ];

  // Sidebar expanded condition: either toggled open OR hovered
  const expanded = isOpen || isHovered;

  return (
    <motion.div
      initial={{ width: 64 }} // default collapsed width
      animate={{ width: expanded ? 208 : 64 }} // 208px ~ w-52
      transition={{ duration: 0.3, type: "tween" }}
      className="bg-[#262533] h-screen p-3 pt-4 flex-shrink-0 flex flex-col "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Menu Items */}
      <ul className="flex-1 space-y-2 mt-16 ">
        {menus.map((menu, index) => (
          <li key={index}>
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded cursor-pointer transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-blue-500"
                }`
              }
            >
              <menu.icon
                size={20}
                className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
              />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: expanded ? 1 : 0,
                  x: expanded ? 0 : -10,
                }}
                transition={{ duration: 0.2 }}
                className="text-sm whitespace-nowrap overflow-hidden"
              >
                {menu.name}
              </motion.span>
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
