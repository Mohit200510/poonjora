
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
const TRANSITION_DURATION = 500;

function TopBar() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => prev + 1);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (transitionEnabled) return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;

    if (slideIndex === announcements.length) {
      setTransitionEnabled(false);
      setSlideIndex(0);
    }
  };

  const currentIndex = slideIndex % announcements.length;

  return (
    <div className={styles.topBar}>
      <Container>
        <div className={styles.topBarContent}>

          <div className={styles.topBarBrand}>
            <Gift size={16} />
            <span>POONJORA EXCLUSIVE</span>
          </div>

          <div className={styles.topBarSlider}>
            <div
              className={styles.topBarTrack}
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateY(-${slideIndex * 100}%)`,
                transition: transitionEnabled
                  ? `transform ${TRANSITION_DURATION}ms ease-in-out`
                  : "none"
              }}
            >
              {[...announcements, announcements[0]].map(
                ({ text, Icon }, index) => (
                  <div
                    className={styles.topBarSlide}
                    key={index}
                  >
                    <Icon className={styles.topBarIcon} />
                    <span className={styles.topNavOffer}>
                      {text}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className={styles.topBarProgress}>
            <div className={styles.topBarProgressLine}>
              <span
                key={slideIndex}
                className={styles.topBarProgressFill}
                style={{
                  animationDuration: `${SLIDE_DURATION}ms`
                }}
              />
            </div>

            <span className={styles.topBarCounter}>
              {String(currentIndex + 1).padStart(2, "0")}
              {" / "}
              {String(announcements.length).padStart(2, "0")}
            </span>
          </div>

          <div className={styles.topBarMobileDots}>
            {announcements.map((_, index) => (
              <span
                key={index}
                className={`${styles.topBarMobileDot} ${
                  currentIndex === index
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
