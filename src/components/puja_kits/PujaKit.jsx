
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PujaKit.module.css";
import Container from "../common/Container";

import { PiBookOpenTextDuotone } from "react-icons/pi";
import { SiHackthebox } from "react-icons/si";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import {
  FaAngleRight,
  FaAngleLeft,
  FaArrowRightLong,
} from "react-icons/fa6";

import satyanarayanBg from "../../assets/satyanarayankit.webp";
import shivBg from "../../assets/shivBg.webp";
import hanumanBg from "../../assets/hanumanPujaKitBg.webp";
import lakshmiBg from "../../assets/laxmiji.webp";
import grihaPraveshBg from "../../assets/pravesh.webp";
import navgrahBg from "../../assets/navgrah.webp";

// SAMPLE CONTENTS ONLY.
// Replace these with the actual contents and quantities
// before publishing the kit details.

const pujaKits = [
  {
    id: 1,
    productId: null,
    name: "Satyanarayan Puja Kit",
    category: "For Katha & Pujan",
    description: "Complete samagri for Satyanarayan Katha",
    essentials: 25,
    price: 499,
    mrp: 699,
    discount: 29,
    image: satyanarayanBg,
    items: [
      { name: "Kumkum", quantity: "20 g" },
      { name: "Haldi", quantity: "20 g" },
      { name: "Akshat Rice", quantity: "50 g" },
      { name: "Kalawa", quantity: "1 roll" },
      { name: "Agarbatti", quantity: "1 pack" },
      { name: "Kapoor", quantity: "10 g" },
      { name: "Cotton Wicks", quantity: "1 pack" },
      { name: "Chandan", quantity: "20 g" },
    ],
  },
  {
    id: 2,
    productId: null,
    name: "Shiv Shankar Puja Kit",
    category: "For Abhishek",
    description: "Complete samagri for Shiv Abhishek & Puja",
    essentials: 21,
    price: 449,
    mrp: 599,
    discount: 25,
    image: shivBg,
    items: [
      { name: "Kumkum", quantity: "20 g" },
      { name: "Chandan", quantity: "20 g" },
      { name: "Akshat Rice", quantity: "50 g" },
      { name: "Bhasma", quantity: "20 g" },
      { name: "Agarbatti", quantity: "1 pack" },
      { name: "Kapoor", quantity: "10 g" },
      { name: "Cotton Wicks", quantity: "1 pack" },
      { name: "Kalawa", quantity: "1 roll" },
    ],
  },
  {
    id: 3,
    productId: null,
    name: "Hanuman Puja Kit",
    category: "For Bhakti",
    description: "Complete samagri for Hanuman Puja",
    essentials: 18,
    price: 399,
    mrp: 549,
    discount: 27,
    image: hanumanBg,
    items: [
      { name: "Sindoor", quantity: "20 g" },
      { name: "Chameli Oil", quantity: "30 ml" },
      { name: "Akshat Rice", quantity: "50 g" },
      { name: "Roli", quantity: "20 g" },
      { name: "Agarbatti", quantity: "1 pack" },
      { name: "Kapoor", quantity: "10 g" },
      { name: "Kalawa", quantity: "1 roll" },
      { name: "Cotton Wicks", quantity: "1 pack" },
    ],
  },
  {
    id: 4,
    productId: null,
    name: "Lakshmi Puja Kit",
    category: "For Wealth & Prosperity",
    description: "Complete samagri for Lakshmi Puja",
    essentials: 20,
    price: 449,
    mrp: 599,
    discount: 25,
    image: lakshmiBg,
    items: [
      { name: "Kumkum", quantity: "20 g" },
      { name: "Haldi", quantity: "20 g" },
      { name: "Akshat Rice", quantity: "50 g" },
      { name: "Chandan", quantity: "20 g" },
      { name: "Agarbatti", quantity: "1 pack" },
      { name: "Kapoor", quantity: "10 g" },
      { name: "Cotton Wicks", quantity: "1 pack" },
      { name: "Kalawa", quantity: "1 roll" },
    ],
  },
  {
    id: 5,
    productId: null,
    name: "Griha Pravesh Puja Kit",
    category: "For New Beginnings",
    description: "Complete samagri for Griha Pravesh Puja",
    essentials: 28,
    price: 599,
    mrp: 799,
    discount: 25,
    image: grihaPraveshBg,
    items: [
      { name: "Kumkum", quantity: "20 g" },
      { name: "Haldi", quantity: "20 g" },
      { name: "Akshat Rice", quantity: "50 g" },
      { name: "Havan Samagri", quantity: "100 g" },
      { name: "Kalawa", quantity: "1 roll" },
      { name: "Kapoor", quantity: "10 g" },
      { name: "Agarbatti", quantity: "1 pack" },
      { name: "Cotton Wicks", quantity: "1 pack" },
    ],
  },
  {
    id: 6,
    productId: null,
    name: "Navgrah Puja Kit",
    category: "For Special Occasions",
    description: "Complete samagri for Navgrah Shanti",
    essentials: 27,
    price: 699,
    mrp: 899,
    discount: 22,
    image: navgrahBg,
    items: [
      { name: "Navgrah Samagri", quantity: "1 pack" },
      { name: "Kumkum", quantity: "20 g" },
      { name: "Haldi", quantity: "20 g" },
      { name: "Akshat Rice", quantity: "50 g" },
      { name: "Havan Samagri", quantity: "100 g" },
      { name: "Kapoor", quantity: "10 g" },
      { name: "Kalawa", quantity: "1 roll" },
      { name: "Agarbatti", quantity: "1 pack" },
    ],
  },
];

function PujaKit() {
  const kitsRef = useRef(null);
  const [flippedKit, setFlippedKit] = useState(null);

  const flipKit = (id) => {
    setFlippedKit((current) => (current === id ? null : id));
  };

  const scrollRight = () => {
    kitsRef.current?.scrollBy({
      left: kitsRef.current.clientWidth,
      behavior: "smooth",
    });
    setFlippedKit(null);
  };

  const scrollLeft = () => {
    kitsRef.current?.scrollBy({
      left: -kitsRef.current.clientWidth,
      behavior: "smooth",
    });
    setFlippedKit(null);
  };

  return (
    <section className={styles.secPujaKit}>
      <Container>
        <div className={styles.secPujaKitHeader}>
          <div>
            <h2>Puja Kits for Every Sacred Occasion</h2>
            <p>
              Complete puja samagri, thoughtfully curated
              for your spiritual needs
            </p>
          </div>

          <Link
            className={styles.viewAllBtn}
            to="/collections/products"
          >
            View All Kits <FaArrowRightLong />
          </Link>
        </div>

        <div className={styles.pujaKitBody}>
          <button
            onClick={scrollLeft}
            className={`${styles.PujaKitBoxScrolBtn1} ${styles.PujaKitBoxScrolBtns}`}
            type="button"
            aria-label="Scroll puja kits left"
          >
            <FaAngleLeft />
          </button>

          <div className={styles.pujaKitBoxes} ref={kitsRef}>
            {pujaKits.map((kit) => {
              const isFlipped = flippedKit === kit.id;
              const remaining = Math.max(
                0,
                kit.essentials - kit.items.length
              );

              const productUrl = kit.productId
                ? `/product/${kit.productId}`
                : "/collections/products";

              return (
                <div
                  key={kit.id}
                  className={`${styles.PujaKitBox} ${
                    isFlipped ? styles.isFlipped : ""
                  }`}
                >
                  <div className={styles.flipInner}>
                    {/* FRONT SIDE */}
                    <div className={styles.flipFront}>
                      <img
                        src={kit.image}
                        alt={kit.name}
                        loading="lazy"
                        className={styles.kitImage}
                      />

                      <div className={styles.PujaKitBoxInner}>
                        <div className={styles.PujaKitBoxTopTag}>
                          <PiBookOpenTextDuotone />
                          <p>{kit.category}</p>
                        </div>

                        <div className={styles.pujakitBoxHeading}>
                          <h3>{kit.name}</h3>
                          <p>{kit.description}</p>
                        </div>

                        <div className={styles.PujaKitBoxSize}>
                          <SiHackthebox />
                          <span>
                            {kit.essentials} Essentials
                          </span>
                        </div>

                        <div className={styles.PujaKitBoxbtn}>
                          <button
                            type="button"
                            onClick={() => flipKit(kit.id)}
                            aria-label={`See what's inside ${kit.name}`}
                          >
                            See What's Inside
                            <FiArrowRight />
                          </button>
                        </div>
                      </div>

                      <span className={styles.hoverHint}>
                        Hover to Flip
                      </span>
                    </div>

                    {/* BACK SIDE */}
                    <div className={styles.flipBack}>
                      <div className={styles.backHeader}>
                        <span className={styles.backEyebrow}>
                          POONJORA PUJA KITS
                        </span>
                        <h3>What's Inside?</h3>
                        <p>{kit.name}</p>
                      </div>

                      <div className={styles.backContents}>
                        {kit.items.map((item, index) => (
                          <div
                            className={styles.kitItem}
                            key={`${kit.id}-${index}`}
                          >
                            <span className={styles.itemName}>
                              {item.name}
                            </span>
                            <span className={styles.itemDots} />
                            <span className={styles.itemQuantity}>
                              {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      {remaining > 0 && (
                        <div className={styles.moreItems}>
                          + {remaining} more items
                        </div>
                      )}

                      <div className={styles.backActions}>
                        <Link to={productUrl} className={styles.viewKitBtn}>
                          View Complete Kit <FiArrowRight />
                        </Link>

                        <button
                          type="button"
                          className={styles.backButton}
                          onClick={() => flipKit(kit.id)}
                          aria-label={`Return to ${kit.name}`}
                        >
                          <FiArrowLeft />
                          Back to Kit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={scrollRight}
            className={`${styles.PujaKitBoxScrolBtn2} ${styles.PujaKitBoxScrolBtns}`}
            type="button"
            aria-label="Scroll puja kits right"
          >
            <FaAngleRight />
          </button>
        </div>
      </Container>
    </section>
  );
}

export default PujaKit;
