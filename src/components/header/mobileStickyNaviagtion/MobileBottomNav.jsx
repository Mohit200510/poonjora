
import React from "react";
import { NavLink } from "react-router-dom";

import {
  LuHouse,
  LuLayoutGrid,
  LuCalendarDays,
  LuCalendarClock,
} from "react-icons/lu";

import { MdOutlinePhotoLibrary } from "react-icons/md";

import styles from "./MobileBottomNav.module.css";

const navItems = [
  {
    label: "Home",
    path: "/",
    icon: LuHouse,
    end: true,
  },
  {
    label: "Products",
    path: "/collections/products",
    icon: LuLayoutGrid,
  },
  {
    label: "Divine Gallery",
    path: "/divine-gallery",
    icon: MdOutlinePhotoLibrary,
  },
  {
    label: "Festivals",
    path: "/hindu-festival-calendar",
    icon: LuCalendarDays,
  },
  {
    label: "Panchang",
    path: "/panchang",
    icon: LuCalendarClock,
  },
];

function MobileBottomNav() {
  return (
    <nav
      className={styles.bottomNav}
      aria-label="Mobile bottom navigation"
    >
      <div className={styles.navItems}>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `${styles.navItem} ${
                  isActive ? styles.active : ""
                }`
              }
            >
              <Icon className={styles.navIcon} />

              <span className={styles.navLabel}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
