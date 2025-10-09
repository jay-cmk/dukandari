// menuConfig.js
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
  Network,
  Package,
} from "lucide-react";

export const mainMenus = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { 
    name: "Inventory", 
    icon: Package, 
    path: "/inventory",
    hasSubmenu: true,
  },
  { name: "Employee", icon: Users, path: "/employee" },
  { name: "Product", icon: ShoppingCart, path: "/Product" },
  { name: "Company", icon: Building, path: "/company" },
  { name: "Reports", icon: FileText, path: "/reports" },
  { name: "Analytics", icon: BarChart, path: "/analytics" },
  { name: "Gifts", icon: Gift, path: "/gifts" },
  { name: "Calculator", icon: Calculator, path: "/calculator" },
  { name: "Outlets", icon: Network, path: "/outlets" },
  { name: "Settings", icon: Settings, path: "/settings", hasSubmenu: true },
];

// ✅ Inventory Submenus
export const inventorySubMenus = [
  { name: "Stock", path: "/inventory/stock" },
  { name: "Product", path: "/inventory/Product" },
  { name: "Category/Brand", path: "/inventory/category-brand" },
  { name: "Stock Transfer", path: "/inventory/stock-transfer" },
  { name: "Department", path: "/inventory/department" },
  { name: "Stock Transfer Request", path: "/inventory/stock-transfer-request" },
  { name: "Bill Of Materials", path: "/inventory/bill-of-materials" },
  { name: "Recipe", path: "/inventory/recipe" },
  { name: "B2B Product Price Mapping", path: "/inventory/b2b-product-price-mapping" },
  { name: "Material Consumption", path: "/inventory/material-consumption" },
  { name: "Stock Verification", path: "/inventory/stock-verification" },
  { name: "Material Creation", path: "/inventory/material-creation" },
  { name: "Label Master", path: "/inventory/label-master" },
  { name: "Variant Option Master", path: "/inventory/variant-option-master" },
];

// ✅ Settings Submenus (like your screenshot)
export const settingsSubMenus = [
  { name: "General", path: "/settings/general" },
  { name: "Inventory", path: "/settings/inventory" },
  { name: "POS", path: "/settings/pos" },
  { name: "Notifications", path: "/settings/notifications" },
  { name: "Purchase", path: "/settings/purchase" },
  { name: "Sales", path: "/settings/sales" },
  { name: "Integration", path: "/settings/integration" },
  { name: "Logs", path: "/settings/logs" },
];
