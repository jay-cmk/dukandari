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





// // export default Sidebar;
// import React, { useState, useEffect } from "react";
// import { ChevronDown, ChevronRight, Circle } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { mainMenus, inventorySubMenus, settingsSubMenus } from "./menuConfig";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [openSubmenus, setOpenSubmenus] = useState({
//     inventory: false,
//     settings: false
//   });

//   // Toggle specific submenu
//   const toggleSubmenu = (menuName) => {
//     setOpenSubmenus(prev => ({
//       ...prev,
//       [menuName]: !prev[menuName]
//     }));
//   };

//   // Enhanced menus with state
//   const menus = mainMenus.map(menu => {
//     if (menu.hasSubmenu) {
//       const submenuKey = menu.name.toLowerCase();
//       return {
//         ...menu,
//         isOpen: openSubmenus[submenuKey],
//         toggle: () => toggleSubmenu(submenuKey),
//         submenus: submenuKey === 'inventory' ? inventorySubMenus : settingsSubMenus
//       };
//     }
//     return menu;
//   });

//   // Sidebar expanded condition: either toggled open OR hovered
//   const expanded = isOpen || isHovered;

//   // Automatically close all submenus when sidebar collapses
//   useEffect(() => {
//     if (!expanded) {
//       setOpenSubmenus({
//         inventory: false,
//         settings: false
//       });
//     }
//   }, [expanded]);

//   // Render submenu items
//   const renderSubmenuItems = (submenus, isOpen, menuName) => {
//     return (
//       <AnimatePresence>
//         {isOpen && expanded && (
//           <motion.ul
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.2 }}
//             className="ml-4 py-1 overflow-hidden"
//           >
//             {submenus.map((submenu, subIndex) => (
//               <li key={subIndex}>
//                 <NavLink
//                   to={submenu.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-2 p-1 rounded cursor-pointer transition-all duration-200 group text-sm ${
//                       isActive
//                         ? "bg-blue-500 text-white"
//                         : "text-gray-400 hover:bg-blue-600 hover:text-white"
//                     }`
//                   }
//                 >
// <Circle size={8} className="flex-shrink-0 text-gray-400" />
//                   <motion.span
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="whitespace-nowrap overflow-hidden text-ellipsis"
//                   >
//                     {submenu.name}
//                   </motion.span>
//                 </NavLink>
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     );
//   };

//   // Render bullet points for collapsed sidebar
//   const renderCollapsedBulletPoints = (submenus, isOpen) => {
//     if (!expanded && isOpen) {
//       return (
//         <div className="ml-2 mt-1 space-y-1">
//           {submenus.map((submenu, subIndex) => (
//             <div key={subIndex} className="flex justify-center">
//               <Circle size={6} className="text-gray-400" />
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <motion.div
//       initial={{ width: 64 }}
//       animate={{ width: expanded ? 208 : 64 }}
//       transition={{ duration: 0.3, type: "tween" }}
//       className="bg-[#262533] h-screen p-3 pt-4 flex-shrink-0 flex flex-col overflow-y-auto"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Menu Items */}
//       <ul className="flex-1 space-y-1 mt-16">
//         {menus.map((menu, index) => (
//           <li key={index}>
//             {menu.hasSubmenu ? (
//               // Menu with collapsible submenu (Inventory or Settings)
//               <div>
//                 <button
//                   onClick={menu.toggle}
//                   className={`flex items-center justify-between w-full p-2 rounded cursor-pointer transition-all duration-200 group ${
//                     menu.isOpen && expanded
//                       ? "bg-blue-600 text-white"
//                       : "text-gray-300 hover:bg-blue-500"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <menu.icon
//                       size={20}
//                       className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
//                     />
//                     <motion.span
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{
//                         opacity: expanded ? 1 : 0,
//                         x: expanded ? 0 : -10,
//                       }}
//                       transition={{ duration: 0.2 }}
//                       className="text-sm whitespace-nowrap overflow-hidden"
//                     >
//                       {menu.name}
//                     </motion.span>
//                   </div>
//                   {expanded && (
//                     <motion.div
//                       initial={{ rotate: 0 }}
//                       animate={{ rotate: menu.isOpen ? 0 : -90 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <ChevronDown size={16} />
//                     </motion.div>
//                   )}
//                 </button>

//                 {/* Submenu Items - Only show when sidebar is expanded AND submenu is open */}
//                 {renderSubmenuItems(menu.submenus, menu.isOpen, menu.name.toLowerCase())}
                
//                 {/* Bullet points when collapsed - Only show when sidebar is collapsed AND submenu is open */}
//                 {renderCollapsedBulletPoints(menu.submenus, menu.isOpen)}
//               </div>
//             ) : (
//               // Regular menu item
//               <NavLink
//                 to={menu.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 p-2 rounded cursor-pointer transition-all duration-200 group ${
//                     isActive
//                       ? "bg-blue-600 text-white"
//                       : "text-gray-300 hover:bg-blue-500"
//                   }`
//                 }
//               >
//                 <menu.icon
//                   size={20}
//                   className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
//                 />
//                 <motion.span
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{
//                     opacity: expanded ? 1 : 0,
//                     x: expanded ? 0 : -10,
//                   }}
//                   transition={{ duration: 0.2 }}
//                   className="text-sm whitespace-nowrap overflow-hidden"
//                 >
//                   {menu.name}
//                 </motion.span>
//               </NavLink>
//             )}
//           </li>
//         ))}
//       </ul>
//     </motion.div>
//   );
// };

// export default Sidebar;




import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Circle,
  Home,
  User,
  Boxes,
  ShoppingBag,
  ShoppingCart,
  Landmark,
  Printer,
  Network, // ✅ replaced Sitemap with Network
  Calculator,
  Gift,
  FileText,
  BarChart3,
  Settings,
  History,
  Gauge,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 🔹 Font Awesome → Lucide mapping
const iconMap = {
  "fa-dashboard": Gauge,
  "fa-user": User,
  "fa-cubes": Boxes,
  "fa-shopping-bag": ShoppingBag,
  "fa-shopping-cart": ShoppingCart,
  "fa-bank": Landmark,
  "fa-fax": Printer,
  "fa-sitemap": Network, // ✅ fixed (Lucide has no Sitemap)
  "fa-calculator": Calculator,
  "fa-gift": Gift,
  "fa-file": FileText,
  "fa-bar-chart-o": BarChart3,
  "fa-gears": Settings,
  "fa-history": History,
};

const getIcon = (iconClass) => {
  if (!iconClass) return Home;

  const faClass = iconClass.split(" ").find((cls) => cls.startsWith("fa-"));
  const Icon = iconMap[faClass];

  if (!Icon) console.warn(`⚠️ Unknown icon class: ${iconClass}`);
  return Icon || Home;
};

const Sidebar = ({ isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const navMenuPermissions = JSON.parse(
      localStorage.getItem("navMenuPermissions") || "[]"
    );
    const navSubMenuPermissions = JSON.parse(
      localStorage.getItem("navSubMenuPermissions") || "[]"
    );

    const enhancedMenus = navMenuPermissions.map((menu) => {
      const submenus = navSubMenuPermissions.filter(
        (sub) => sub.navMenuId === menu.navMenuId && sub.isSubMenu === 1
      );
      return { ...menu, submenus, isOpen: false };
    });

    console.log("✅ Menu icons found:", enhancedMenus.map((m) => m.iconClass));
    setMenus(enhancedMenus);
  }, []);

  const toggleSubmenu = (menuId) => {
    setMenus((prev) =>
      prev.map((menu) =>
        menu.navMenuId === menuId ? { ...menu, isOpen: !menu.isOpen } : menu
      )
    );
  };

  const expanded = isOpen || isHovered;

  const renderSubmenuItems = (submenus, isOpen) => (
    <AnimatePresence>
      {isOpen && expanded && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="ml-4 py-1 overflow-hidden"
        >
          {submenus.map((submenu) => (
            <li key={submenu.navSubMenuId}>
              <NavLink
                to={`/${submenu.menuURL}`}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-1 rounded cursor-pointer transition-all duration-200 text-sm ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:bg-blue-600 hover:text-white"
                  }`
                }
              >
                <Circle size={8} className="flex-shrink-0 text-gray-400" />
                <span>{submenu.title}</span>
              </NavLink>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
    <motion.div
      initial={{ width: 64 }}
      animate={{ width: expanded ? 208 : 64 }}
      transition={{ duration: 0.3 }}
      className="bg-[#262533] h-screen p-3 pt-4 flex-shrink-0 flex flex-col overflow-y-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ul className="flex-1 space-y-1 mt-16">
        {menus.map((menu) => {
          const Icon = getIcon(menu.iconClass);

          return (
            <li key={menu.navMenuId}>
              {menu.submenus.length > 0 ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(menu.navMenuId)}
                    className={`flex items-center justify-between w-full p-2 rounded cursor-pointer transition-all duration-200 ${
                      menu.isOpen && expanded
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-blue-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} />
                      {expanded && (
                        <span className="text-sm whitespace-nowrap overflow-hidden">
                          {menu.title}
                        </span>
                      )}
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

                  {renderSubmenuItems(menu.submenus, menu.isOpen)}
                </div>
              ) : (
                <NavLink
                  to={`/${menu.menuURL}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-blue-500"
                    }`
                  }
                >
                  <Icon size={16} />
                  {expanded && (
                    <span className="text-sm whitespace-nowrap overflow-hidden">
                      {menu.title}
                    </span>
                  )}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
