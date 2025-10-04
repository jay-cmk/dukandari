// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   Users,
//   Settings,
//   ShoppingCart,
//   Building,
//   FileText,
//   BarChart,
//   Gift,
//   Calculator,
//   Network
// } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import { motion } from "framer-motion";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const menus = [
//     { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
//     { name: "Employee", icon: Users, path: "/employee" },
//     { name: "Inventry", icon: Inventry, path: "/teams" },
//     { name: "Products", icon: ShoppingCart, path: "/products" },
//     { name: "Company", icon: Building, path: "/company" },
//     { name: "Reports", icon: FileText, path: "/reports" },
//     { name: "Analytics", icon: BarChart, path: "/analytics" },
//     { name: "Gifts", icon: Gift, path: "/gifts" },
//     { name: "Calculator", icon: Calculator, path: "/calculator" },
//     { name: "Settings", icon: Settings, path: "/settings" },
//    { name: "Outlets", icon: Network , path: "/outlets" },
//   ];

//   // Sidebar expanded condition: either toggled open OR hovered
//   const expanded = isOpen || isHovered;

//   return (
//     <motion.div
//       initial={{ width: 64 }} // default collapsed width
//       animate={{ width: expanded ? 208 : 64 }} // 208px ~ w-52
//       transition={{ duration: 0.3, type: "tween" }}
//       className="bg-[#262533] h-screen p-3 pt-4 flex-shrink-0 flex flex-col "
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Menu Items */}
//       <ul className="flex-1 space-y-2 mt-16 ">
//         {menus.map((menu, index) => (
//           <li key={index}>
//             <NavLink
//               to={menu.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-2 rounded cursor-pointer transition-all duration-200 group ${
//                   isActive
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-300 hover:bg-blue-500"
//                 }`
//               }
//             >
//               <menu.icon
//                 size={20}
//                 className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
//               />
//               <motion.span
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{
//                   opacity: expanded ? 1 : 0,
//                   x: expanded ? 0 : -10,
//                 }}
//                 transition={{ duration: 0.2 }}
//                 className="text-sm whitespace-nowrap overflow-hidden"
//               >
//                 {menu.name}
//               </motion.span>
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </motion.div>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import { ChevronDown, ChevronRight, Circle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { mainMenus, inventorySubMenus } from "./menuConfig";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  // Enhanced menus with state
  const menus = mainMenus.map(menu => {
    if (menu.hasSubmenu) {
      return {
        ...menu,
        isOpen: inventoryOpen,
        toggle: () => setInventoryOpen(!inventoryOpen)
      };
    }
    return menu;
  });

  // Sidebar expanded condition: either toggled open OR hovered
  const expanded = isOpen || isHovered;

  return (
    <motion.div
      initial={{ width: 64 }}
      animate={{ width: expanded ? 208 : 64 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="bg-[#262533] h-screen p-3 pt-4 flex-shrink-0 flex flex-col overflow-y-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Menu Items */}
      <ul className="flex-1 space-y-1 mt-16">
        {menus.map((menu, index) => (
          <li key={index}>
            {menu.hasSubmenu ? (
              // Inventory menu with collapsible submenu
              <div>
                <button
                  onClick={menu.toggle}
                  className={`flex items-center justify-between w-full p-2 rounded cursor-pointer transition-all duration-200 group ${
                    menu.isOpen
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-blue-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
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
                  </div>
                  {expanded && (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: menu.isOpen ? 0 : -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  )}
                </button>

                {/* Submenu Items */}
                <AnimatePresence>
                  {menu.isOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`${expanded ? "ml-4" : "ml-0"} mt-1 space-y-1 overflow-hidden`}
                    >
                      {inventorySubMenus.map((submenu, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={submenu.path}
                            className={({ isActive }) =>
                              `flex items-center gap-2 p-2 rounded cursor-pointer transition-all duration-200 group text-sm ${
                                isActive
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-400 hover:bg-blue-600 hover:text-white"
                              }`
                            }
                          >
                            {/* Show bullet point when collapsed, chevron when expanded */}
                            {expanded ? (
                              <ChevronRight size={16} className="flex-shrink-0" />
                            ) : (
                              <Circle size={8} className="flex-shrink-0 ml-1" />
                            )}
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                              {expanded ? submenu.name : ""}
                            </motion.span>
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {/* Show bullet points when sidebar is collapsed and inventory is open */}
                {!expanded && menu.isOpen && (
                  <div className="ml-2 mt-1 space-y-1">
                    {inventorySubMenus.map((submenu, subIndex) => (
                      <div key={subIndex} className="flex justify-center">
                        <Circle size={6} className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Regular menu item
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
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;