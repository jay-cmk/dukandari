// src/utils/saveMenusToDB.js
import { db } from "./db";

export async function saveMenusToDB(navMenus, navSubMenus) {
  try {
    await db.navMenus.clear();
    await db.navSubMenus.clear();

    await db.navMenus.bulkAdd(navMenus);
    await db.navSubMenus.bulkAdd(navSubMenus);

    console.log("✅ Menu data saved to IndexedDB");

    // Return what you stored
    return { navMenus, navSubMenus };
  } catch (err) {
    console.error("❌ Failed to save menu data:", err);
    throw err;
  }
}
