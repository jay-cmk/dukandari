// import React from "react";
// import UserProfile from "@/user/UserProfile";
// import { HiMenu, HiX } from "react-icons/hi";
// import { motion, AnimatePresence } from "framer-motion";

// const Navbar = ({ sidebarOpen, toggleSidebar }) => {
//   return (
//     <motion.nav
//       className="fixed top-0 right-0 z-50 bg-[#262533]"
//       initial={false}
//       animate={{
//         left: sidebarOpen ? 208 : 1, // width of sidebar
//         width: `calc(100% - ${sidebarOpen ? 208 : 1}px)`,
//       }}
//       transition={{ duration: 0.3, type: "tween" }}
//     >
//       <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//         {/* Left Section */}
//         <div className="flex items-center gap-4">
//           {/* Toggle Button */}
//           <button
//             onClick={toggleSidebar}
//             className="p-2 rounded-md hover:bg-gray-700 text-white transition-colors duration-200 relative w-10 h-10 flex items-center justify-center"
//           >
//             <AnimatePresence mode="wait" initial={false}>
//               {sidebarOpen ? (
//                 <motion.div
//                   key="close"
//                   initial={{ opacity: 0, rotate: -90 }}
//                   animate={{ opacity: 1, rotate: 0 }}
//                   exit={{ opacity: 0, rotate: 90 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute"
//                 >
//                   <HiX size={24} />
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="menu"
//                   initial={{ opacity: 0, rotate: 90 }}
//                   animate={{ opacity: 1, rotate: 0 }}
//                   exit={{ opacity: 0, rotate: -90 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute"
//                 >
//                   <HiMenu size={24} />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </button>

//           <span className="text-xl font-semibold text-white">Tenasiae</span>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center space-x-4">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
//             Quick Action
//           </button>

//           <div className="flex items-center space-x-3">
//             <UserProfile />

//             <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
//               <div className="w-6 h-6 flex items-center justify-center">
//                 <span className="text-sm font-medium text-white">we</span>
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;




import React from "react";
import UserProfile from "@/user/UserProfile";
import { HiMenu, HiX, HiBell, HiCog, HiQuestionMarkCircle } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch, HiOutlineCalendar } from "react-icons/hi";
import { MdSupportAgent } from "react-icons/md";
import { Plus, ChevronDown } from "lucide-react";
import FileFormatSelector from "./pdf/FileFormatSelector";


const Navbar = ({ sidebarOpen, toggleSidebar }) => {

  return (
    <motion.nav
      className="fixed top-0 right-0 z-50 bg-[#262533] border-b border-gray-700"
      initial={false}
      animate={{
        left: sidebarOpen ? 208 : 1,
        width: `calc(100% - ${sidebarOpen ? 208 : 1}px)`,
      }}
      transition={{ duration: 0.3, type: "tween" }}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-700 text-white transition-colors duration-200 relative w-10 h-10 flex items-center justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              {sidebarOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <HiX size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <HiMenu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* <span className="text-xl font-semibold text-white">Tenasiae</span> */}
          <div className="flex items-center gap-3 px-4 py-2.5 text-white cursor-pointer hover:bg-gradient-to-r hover:from-[#2a293d] hover:to-[#34334d] rounded-lg transition-all duration-300 group border border-transparent hover:border-gray-600/30 shadow-sm hover:shadow-md">
            {/* Icon box with enhanced design */}
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 group-hover:border-blue-400/50 group-hover:scale-105 transition-all duration-300 shadow-inner">
              <Plus size={10} className="text-blue-300 group-hover:text-blue-200" />
            </div>

            {/* Label with enhanced typography */}
            <span className="text-sm font-semibold bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-100 transition-all duration-300">
              Quick Action
            </span>

            {/* Enhanced dropdown arrow */}
            <ChevronDown size={16} className="text-gray-400 group-hover:text-white group-hover:rotate-180 transition-all duration-300 ml-auto" />
          </div>
        </div>
        {/* right section */}
        <div className="flex items-center space-x-4 text-gray-300">
      
          {/* Company Number */}
          <div className="flex items-center space-x-2">

            <MdSupportAgent className="text-lg" />
            <span className="text-sm font-medium">
              +91 80 00877 644{" "}
              <span className="font-normal">(9:00AM - 9:00PM IST)</span>
            </span>
          </div>

          {/* Notification */}
          <button className="relative p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
            <HiBell size={20} className="text-gray-300 hover:text-white" />
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              3
            </span>
          </button>


          {/* Year Range */}
          <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-200">
            2025–2026
          </button>

          {/* Profile */}
          <UserProfile />
          {/* Help Icon */}
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 group">
            <HiQuestionMarkCircle size={20} className="text-gray-300 group-hover:text-white" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;