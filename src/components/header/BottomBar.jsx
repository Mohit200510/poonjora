
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  LuLayoutGrid,
  LuGift,
  LuLayers3,
  LuCalendarDays,
  LuClock3,
  LuArrowRight,
  LuChevronDown,
  LuDroplets
} from "react-icons/lu";

import { MdOutlinePhotoLibrary } from "react-icons/md";

import Container from "../common/Container";
import styles from "./DesktopNav.module.css";

const essentials = [
  { label: "Chameli Oil", search: "Chameli Oil" },
  { label: "Kapoor", search: "Kapoor" },
  { label: "Gangajal", search: "Gangajal" },
  { label: "Puja Oil", search: "Puja Oil" },
];

function DesktopNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav
      className={styles.navbar}
      aria-label="Desktop navigation"
    >
      <Container>
        <div className={styles.navContainer}>

          {/* LEFT NAVIGATION */}
          <div className={styles.navLeft}>

            <NavLink
              to="/collections/products"
              className={styles.navLink}
            >
              <LuLayoutGrid />
              <span>All Products</span>
            </NavLink>

            <span
              className={styles.divider}
              aria-hidden="true"
            />

            <Link
              to="/puja-kits"
              className={styles.navLink}
            >
              <LuGift />
              <span>Puja Kits</span>
            </Link>

            {/* PUJA ESSENTIALS DROPDOWN */}
            <div
              className={styles.dropdown}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setDropdownOpen(false);
                }
              }}
            >
              <button
                type="button"
                className={styles.dropdownTrigger}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={() =>
                  setDropdownOpen((prev) => !prev)
                }
              >
                <LuLayers3 />
                <span>Puja Essentials</span>

                <LuChevronDown
                  className={`${styles.chevron} ${
                    dropdownOpen ? styles.rotated : ""
                  }`}
                />
              </button>

              

              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {essentials.map((item) => (
                    <Link
                      key={item.label}
                      to={`/collections/products?search=${encodeURIComponent(
                        item.search
                      )}`}
                      className={styles.dropdownItem}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
  to="/collections/products?search=Puja%20Oil"
  className={styles.navLink}
>
  <LuDroplets />
  <span>Puja Oil</span>
</Link>

          </div>

          {/* RIGHT NAVIGATION */}
          <div className={styles.navRight}>

            <span
              className={styles.divider}
              aria-hidden="true"
            />

            <NavLink
              to="/divine-gallery"
              className={styles.featureLink}
            >
              <MdOutlinePhotoLibrary />
              <span>Divine Gallery</span>
            </NavLink>

            <NavLink
              to="/hindu-festival-calender"
              className={styles.featureLink}
            >
              <LuCalendarDays />
              <span>Upcoming Festivals</span>
            </NavLink>

            <NavLink
              to="/panchang"
              className={styles.panchangButton}
            >
              <LuClock3 className={styles.clockIcon} />
              <span>आज का पंचांग</span>
              <LuArrowRight className={styles.arrowIcon} />
            </NavLink>

          </div>

        </div>
      </Container>
    </nav>
  );
}

export default DesktopNav;
