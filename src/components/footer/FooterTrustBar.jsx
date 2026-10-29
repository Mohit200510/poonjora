import React from "react";
import { Truck, ShieldCheck, BadgeCheck } from "lucide-react";
import styles from "./Footer.module.css";
import paymentBadges from "../../assets/badge_new1.png";

function FooterTrustBar() {
  return (
    <div className={styles.trustBar}>

      <div className={styles.trustItem}>
        <Truck />
        <div>
          <h4>Pan India Delivery</h4>
          <p>Across 28,000+ PIN Codes</p>
        </div>
      </div>

      <div className={styles.trustItem}>
        <ShieldCheck />
        <div>
          <h4>Secure Payments</h4>
          <p>Safe & Trusted Checkout</p>
        </div>
      </div>

      <div className={styles.trustItem}>
        <BadgeCheck />
        <div>
          <h4>Authentic Products</h4>
          <p>Sourced with Care</p>
        </div>
      </div>

      <div className={styles.paymentItem}>
        <img
          src={paymentBadges}
          alt="Accepted payment methods: UPI, Visa, Mastercard, RuPay, PhonePe and Paytm"
        />
      </div>

    </div>
  );
}

export default FooterTrustBar;