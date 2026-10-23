
import React from "react";
import Panchang from "../../components/panchang/Panchnag";
import styles from "./PanchangPage.module.css";
import { Helmet } from "react-helmet-async";

const PanchangPage = () => {
  return (
    <>

  <Helmet>
  <title>आज का पंचांग | Aaj Ka Panchang Today – Poonjora</title>

  <meta
    name="description"
    content="आज का पंचांग देखें। आज की तिथि, नक्षत्र, योग, करण, राहुकाल और सूर्योदय का समय जानें। अपने शहर का दैनिक पंचांग देखें।"
  />

  <link
    rel="canonical"
    href="https://poonjora.in/panchang"
  />
  </Helmet>
    
    <main className={styles.panchangPage}>
      <div className={styles.breadcrumb}>
        Home <span>/</span> पंचांग
      </div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            ✦ Poonjora Panchang ✦
          </span>

          <h1>आज का पंचांग</h1>

          <p>
            आज की तिथि, नक्षत्र, योग, करण और अन्य
            वैदिक जानकारी आपके चुने हुए स्थान के अनुसार
          </p>
        </div>
      </section>

      <section className={styles.panchangContainer}>
        <Panchang />
      </section>
    </main>
    </>
  );
};

export default PanchangPage;

