// import React from "react";
// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarTrigger,
// } from "@/components/ui/menubar";
// import { User, Key, LogOut, Mail, Edit3 } from "lucide-react";

// export default function UserProfile() {
//   return (
//     <Menubar className="bg-transparent border-none shadow-none">
//       <MenubarMenu>
//         <MenubarTrigger className="p-0 hover:bg-transparent focus:outline-none data-[state=open]:bg-transparent">
//           <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md">
//             <img
//               src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//               alt="User Avatar"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </MenubarTrigger>
//         <MenubarContent
//           align="end"
//           className="w-64 p-3 rounded-xl shadow-lg border border-gray-100"
//         >
//           {/* User Info */}
//           <div className="text-center mb-4">
//             <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 mx-auto mb-3">
//               <img
//                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                 alt="User Avatar"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="font-semibold text-gray-900">KIRTIRAJ</div>
//             <div className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-1">
//               <Mail className="h-3 w-3" />
//               test@vasyerp.com
//             </div>
//           </div>

//           <MenubarSeparator className="mb-3" />

//           {/* Menu Items */}
//           <div className="space-y-1">
//             <MenubarItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//               <User className="h-4 w-4 text-gray-600" />
//               <span className="text-sm text-gray-700">My Profile</span>
//             </MenubarItem>

//             <MenubarItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//               <Key className="h-4 w-4 text-gray-600" />
//               <span className="text-sm text-gray-700">Change Password</span>
//             </MenubarItem>

//             <MenubarItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//               <Edit3 className="h-4 w-4 text-gray-600" />
//               <span className="text-sm text-gray-700">Edit Profile</span>
//             </MenubarItem>
//           </div>

//           <MenubarSeparator className="my-3" />

//           {/* Logout */}
//           <MenubarItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-red-50 transition-colors text-red-600">
//             <LogOut className="h-4 w-4" />
//             <span className="text-sm font-medium">Logout</span>
//           </MenubarItem>
//         </MenubarContent>
//       </MenubarMenu>
//     </Menubar>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import { Key, LogOut, User } from "lucide-react";

export default function UserProfile() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button - Circle Profile Picture */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-0 hover:bg-transparent focus:outline-none transition-all duration-300"
            >
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </button>

            {/* Dropdown Menu - Exact like image */}
            {isOpen && (
                <div className="absolute right-0 top-13.5 w-65 bg-white shadow-lg border border-gray-200 py-1 z-50 transform transition-all duration-200 ease-out origin-top-right animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                    {/* User Info - Text only like image */}
                    <div className="px-4 border-b border-gray-200">
                        <div className="font-semibold text-gray-900">KIRTIRAJ</div>
                        <div className="text-sm text-gray-500 mt-1">test@vasyerp.com</div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                            <User className="h-4 w-4 text-gray-600" />
                            <span className="ml-2">My Profile</span>
                        </button>

                        {/* Logout */}
                        <div className="flex flex-row justify-around border-t border-gray-200 py-1">
                            <div className="">
                                <button className="flex font-medium font-sans items-center w-full bg-gray-200 rounded-sm px-3 py-2 text-xs text-gray-700 hover:bg-gray-300 transition-colors">
                                    <Key className="h-4 w-4 text-gray-600" />
                                    <span className="">Change Password</span>
                                </button>
                            </div>
                            <div className="">
                                <button
                                    className="flex items-center w-full font-medium font-sans rounded-sm px-3 py-2 text-white text-xs hover:opacity-90 transition-colors"
                                    style={{ backgroundColor: "#f4516c" }}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="ml-1">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}