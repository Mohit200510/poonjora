
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { Flower2 } from "lucide-react";

import FestivalTabSections from "./pages/festivalDetails/FestivalTabSections";
import styles from "./pages/festivalDetails/FestivalDetails.module.css";

const IMAGE_BASE =
  "https://cffhhqqkcrcxxivilosk.supabase.co/storage/v1/object/public/festival-images/common";

const COMMON_IMAGES = {
  about: `${IMAGE_BASE}/diwali-about-art.webp`,
  significance: `${IMAGE_BASE}/diwali-significance-art.webp`,
};

const SECTIONS = [
  "vidhi",
  "samagri",
  "katha",
  "mantra",
  "traditions",
  "faq",
];

export function renderFestivalSections(content) {
  if (!content?.title) {
    throw new Error("Festival content or title is missing.");
  }

  return renderToString(
    <MemoryRouter>
      <article aria-label={`${content.title} festival guide`}>

        {/* Overview and Significance */}
        <section
          id="festival-section-overview"
          className={styles.scrollSection}
          aria-label="Festival overview"
        >
          <div className={styles.overview}>
            <div className={styles.overviewRow}>
              <section className={styles.about}>
                <div className={styles.heading}>
                  <Flower2 />
                  <h2>About {content.title}</h2>
                </div>

                <p className={styles.aboutCopy}>
                  {content.description}
                </p>

                <div className={styles.significance}>
                  <img
                    src={COMMON_IMAGES.significance}
                    alt=""
                    className={styles.significanceImage}
                  />

                  <div>
                    <h3>Significance</h3>
                    <p>{content.significance}</p>
                  </div>
                </div>

                <img
                  src={COMMON_IMAGES.about}
                  alt=""
                  className={styles.aboutDecoration}
                />
              </section>
            </div>
          </div>
        </section>

        {/* Other editorial sections */}
        {SECTIONS.map((section) => (
          <section
            key={section}
            id={`festival-section-${section}`}
            className={styles.scrollSection}
          >
            <FestivalTabSections
              activeTab={section}
              content={content}
            />
          </section>
        ))}

      </article>
    </MemoryRouter>
  );
}
