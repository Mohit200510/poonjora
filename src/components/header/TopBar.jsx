
import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Container from "../common/Container";

import {
  BadgePercent,
  Truck,
  ShieldCheck,
  HeartHandshake,
  Gift
} from "lucide-react";

const announcements = [
  {
    text: "Free puja samagri pouch on orders above ₹999",
    Icon: BadgePercent
  },
  {
    text: "Pan India Delivery across 28,000+ PIN Codes",
     Icon: Truck
  },
   
  {
    text: "Safe & Secure Payments",
    Icon: ShieldCheck
  },
  {
    text: "Tradition Delivered with Care",
    Icon: HeartHandshake
  }
];

const SLIDE_DURATION = 2500;

function TopBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        (prev + 1) % announcements.length
      );
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const { text, Icon } = announcements[activeIndex];

  return (
    <div className={styles.topBar}>
      <Container>
        <div className={styles.topBarContent}>

          {/* LEFT */}
          <div className={styles.topBarBrand}>
            <Gift size={16} />
            <span>POONJORA EXCLUSIVE</span>
          </div>

          {/* CENTER */}
          <div className={styles.topBarSlider}>
            <div
              key={activeIndex}
              className={styles.topBarAnimatedSlide}
            >
              <Icon className={styles.topBarIcon} />

              <span className={styles.topNavOffer}>
                {text}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.topBarProgress}>
            <div className={styles.topBarProgressLine}>
              <span
                key={activeIndex}
                className={styles.topBarProgressFill}
                style={{
                  animationDuration: `${SLIDE_DURATION}ms`
                }}
              />
            </div>

            <span className={styles.topBarCounter}>
              {String(activeIndex + 1).padStart(2, "0")}
              {" / "}
              {String(announcements.length).padStart(2, "0")}
            </span>
          </div>

          {/* MOBILE DOTS */}
          <div className={styles.topBarMobileDots}>
            {announcements.map((_, index) => (
              <span
                key={index}
                className={`${styles.topBarMobileDot} ${
                  activeIndex === index
                    ? styles.topBarMobileDotActive
                    : ""
                }`}
              />
            ))}
          </div>

        </div>
      </Container>
    </div>
  );
}

export default TopBar;
