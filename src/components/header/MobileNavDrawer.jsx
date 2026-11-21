
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuX,
  LuLayoutGrid,
  LuGift,
  LuLayers3,
  LuDroplets,
  LuChevronDown,
  LuChevronRight,
  LuCalendarDays,
  LuClock3,
} from "react-icons/lu";
import { MdOutlinePhotoLibrary } from "react-icons/md";

import styles from "./MobileNavDrawer.module.css";

const essentials = [
  { name: "Chameli Oil", search: "Chameli Oil" },
  { name: "Kapoor", search: "Kapoor" },
  { name: "Gangajal", search: "Gangajal" },
];

function MobileNavDrawer({ isOpen, onClose }) {
  const [essentialsOpen, setEssentialsOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside
        id="mobile-navigation-drawer"
        className={styles.drawer}
        aria-label="Mobile navigation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>Explore Poonjora</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <LuX size={23} />
          </button>
        </div>

        <div className={styles.content}>
          <Link
            to="/collections/products"
            className={styles.navItem}
            onClick={onClose}
          >
            <LuLayoutGrid />
            <span>All Products</span>
            <LuChevronRight className={styles.arrow} />
          </Link>

          <Link
            to="/puja-kits"
            className={styles.navItem}
            onClick={onClose}
          >
            <LuGift />
            <span>Puja Kits</span>
            <LuChevronRight className={styles.arrow} />
          </Link>

          <button
            type="button"
            className={styles.navItem}
            onClick={() => setEssentialsOpen((prev) => !prev)}
            aria-expanded={essentialsOpen}
          >
            <LuLayers3 />
            <span>Puja Essentials</span>
            <LuChevronDown
              className={`${styles.arrow} ${
                essentialsOpen ? styles.rotated : ""
              }`}
            />
          </button>

          {essentialsOpen && (
            <div className={styles.subMenu}>
              {essentials.map((item) => (
                <Link
                  key={item.name}
                  to={`/collections/products?search=${encodeURIComponent(
                    item.search
                  )}`}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/collections/products?search=Puja%20Oil"
            className={styles.navItem}
            onClick={onClose}
          >
            <LuDroplets />
            <span>Puja Oil</span>
            <LuChevronRight className={styles.arrow} />
          </Link>

          <div className={styles.sectionTitle}>EXPLORE MORE</div>

          <div className={styles.featureGroup}>
            <Link
              to="/divine-gallery"
              className={styles.featureItem}
              onClick={onClose}
            >
              <MdOutlinePhotoLibrary />
              <div>
                <strong>Divine Gallery</strong>
                <small>Explore devotional images</small>
              </div>
              <LuChevronRight className={styles.arrow} />
            </Link>

            <Link
              to="/hindu-festival-calendar"
              className={styles.featureItem}
              onClick={onClose}
            >
              <LuCalendarDays />
              <div>
                <strong>Upcoming Festivals</strong>
                <small>Festivals and vrat dates</small>
              </div>
              <LuChevronRight className={styles.arrow} />
            </Link>
          </div>

          <Link
            to="/panchang"
            className={styles.panchangItem}
            onClick={onClose}
          >
            <LuClock3 />
            <div>
              <strong>आज का पंचांग</strong>
              <small>तिथि, नक्षत्र और शुभ समय</small>
            </div>
            <LuChevronRight className={styles.arrow} />
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default MobileNavDrawer;
