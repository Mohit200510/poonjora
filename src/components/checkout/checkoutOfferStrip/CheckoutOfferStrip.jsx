
import React, { useEffect, useState } from "react";
import {
  LuTruck,
  LuShieldCheck,
  LuGift,
} from "react-icons/lu";

import styles from "./CheckoutOfferStrip.module.css";

const offers = [
  {
    id: "delivery",
    Icon: LuTruck,
    text: "Free Delivery on Every Order",
  },
  {
    id: "secure",
    Icon: LuShieldCheck,
    text: "100% Secure Checkout",
  },
  {
    id: "attar",
    Icon: LuGift,
    text: "Free Puja Attar with Every Order",
  },
];

const HOLD_TIME = 2800;
const EXIT_TIME = 220;
const ENTER_TIME = 380;

export default function CheckoutOfferStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState("visible");

  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPhase("visible");
      return;
    }

    let timer;

    if (phase === "visible") {
      timer = window.setTimeout(() => {
        setPhase("exit");
      }, HOLD_TIME);
    }

    if (phase === "exit") {
      timer = window.setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % offers.length);
        setPhase("enter");
      }, EXIT_TIME);
    }

    if (phase === "enter") {
      timer = window.setTimeout(() => {
        setPhase("visible");
      }, ENTER_TIME);
    }

    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  const { Icon, text } = offers[activeIndex];

  return (
    <div className={styles.ribbon} aria-label="Checkout offers">
      <div className={styles.viewport}>
        <div
          key={`${activeIndex}-${phase === "enter" ? "enter" : "active"}`}
          className={`${styles.offer} ${
            phase === "exit"
              ? styles.exit
              : phase === "enter"
              ? styles.enter
              : styles.visible
          }`}
        >
          <span className={styles.iconBox}>
            <Icon className={styles.icon} aria-hidden="true" />
          </span>

          <span className={styles.message}>{text}</span>
        </div>
      </div>
    </div>
  );
}
