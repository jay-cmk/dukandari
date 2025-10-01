import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { User, Key, LogOut, Mail, ChevronRight } from "lucide-react";

export default function UserProfile() {
  return (
    <Menubar className="bg-transparent border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="p-0 hover:bg-transparent focus:outline-none data-[state=open]:bg-transparent">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </MenubarTrigger>
        <MenubarContent align="end" className="w-64 p-3 rounded-xl shadow-lg border border-gray-100">
          {/* User Info */}
          <div className="text-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 mx-auto mb-3">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-semibold text-gray-900">Prashant Corner</div>
            <div className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-1">
              <Mail className="h-3 w-3" />
              test@vasyerp.com
            </div>
          </div>

          <MenubarSeparator className="mb-3" />

          {/* Menu Items */}
          <div className="space-y-1">
            <MenubarItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">My Profile</span>
            </MenubarItem>

            <MenubarItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Key className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">Change Password</span>
            </MenubarItem>
          </div>

          <MenubarSeparator className="my-3" />

          <MenubarItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-red-50 transition-colors text-red-600">
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Logout</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}