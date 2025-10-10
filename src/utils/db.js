// src/db.js
import Dexie from "dexie";

export const db = new Dexie("AppDatabase");

db.version(1).stores({
  navMenus: "navMenuId, title, iconClass, menuURL",
  navSubMenus: "navSubMenuId, navMenuId, title, menuURL, isSubMenu",
});
