import { db } from "./db";

export async function getMenusFromDB() {
  try {
    const navMenus = await db.navMenus.toArray();
    const navSubMenus = await db.navSubMenus.toArray();
    return { navMenus, navSubMenus };
  } catch (err) {
    console.error("❌ Failed to read menus from IndexedDB:", err);
    return { navMenus: [], navSubMenus: [] };
  }
}
