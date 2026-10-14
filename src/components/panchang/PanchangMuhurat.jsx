
import React from "react";
import { LuInfo } from "react-icons/lu";
import {
  LuCircleCheck,
  LuCircleMinus,
  LuClock3,
  LuBan,
} from "react-icons/lu";
import styles from "./PanchangMuhurat.module.css";

// Weekday indexes: Sunday = 0, Monday = 1...
// Each number identifies one of 8 daylight segments.
const weekdaySegments = {
  rahu: [8, 2, 7, 5, 6, 4, 3],
  yamaganda: [5, 4, 3, 2, 1, 7, 6],
  gulika: [7, 6, 5, 4, 3, 2, 1],
};

const formatTime = (timestamp) =>
  new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(timestamp));

const formatRange = (start, end) =>
  `${formatTime(start)} – ${formatTime(end)}`;



function PanchangMuhurat({ sunrise, sunset, date }) {
    
  if (!sunrise || !sunset || !date) return null;

  const start = new Date(sunrise).getTime();
  const end = new Date(sunset).getTime();

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    end <= start
  ) {
    return null;
  }

  // Get the weekday of the selected Indian date.
  const weekday = new Date(
    `${date}T12:00:00+05:30`
  ).getUTCDay();

  const daylight = end - start;
  const segmentLength = daylight / 8;

  const getSegment = (segmentNumber) => {
    const segmentStart =
      start + (segmentNumber - 1) * segmentLength;

    return {
      start: segmentStart,
      end: segmentStart + segmentLength,
    };
  };

  const rahu = getSegment(
    weekdaySegments.rahu[weekday]
  );

  const yamaganda = getSegment(
    weekdaySegments.yamaganda[weekday]
  );

  const gulika = getSegment(
    weekdaySegments.gulika[weekday]
  );

  // Abhijit: middle 1/15 of the daylight.
  const solarNoon = start + daylight / 2;
  const halfMuhurta = daylight / 30;

  const abhijit = {
    start: solarNoon - halfMuhurta,
    end: solarNoon + halfMuhurta,
  };

    const muhurats = [

    {
      label: "अभिजित मुहूर्त",
       time:
       weekday === 3
      ? "बुधवार को उपलब्ध नहीं"
      : formatRange(abhijit.start, abhijit.end),
      icon: LuCircleCheck,
      theme: weekday === 3 ? "unavailable" : "auspicious",
      note:
      weekday === 3
      ? "बुधवार को शुभ नहीं माना जाता"
      : "शुभ समय",
    },
    
    {
      label: "राहुकाल",
      time: formatRange(rahu.start, rahu.end),
      icon: LuCircleMinus,
      theme: "rahu",
      note: "नए शुभ कार्यों से बचें",
    },
    {
      label: "यमगण्ड काल",
      time: formatRange(yamaganda.start, yamaganda.end),
      icon: LuClock3,
      theme: "yamaganda",
      note: "परंपरागत अशुभ अवधि",
    },
    {
      label: "गुलिक काल",
      time: formatRange(gulika.start, gulika.end),
      icon: LuBan,
      theme: "gulika",
      note: "परंपरा के अनुसार महत्व",
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <h3>शुभ एवं अशुभ समय</h3>
        <p>
          सूर्योदय और सूर्यास्त के आधार पर गणना
        </p>
      </div>

      <div className={styles.grid}>
        {muhurats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`${styles.card} ${styles[item.theme]}`}
            >
              <div className={styles.icon}>
                <Icon />
              </div>

              <div className={styles.content}>
                <span className={styles.label}>
                  {item.label}
                </span>

                <strong>{item.time}</strong>

                <small>{item.note}</small>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.infoNote}>
        <LuInfo className={styles.infoIcon} />

           <p>
                <strong>कृपया ध्यान दें:</strong> पंचांग की जानकारी
                  चयनित स्थान और भारतीय समय (IST) के अनुसार
                  प्रदान की जाती है। शुभ-अशुभ समय सूर्योदय और
                  सूर्यास्त के आधार पर पारंपरिक गणना से निर्धारित
                  किए जाते हैं। विभिन्न पंचांगों में समय का थोड़ा
                 अंतर संभव है।
            </p>
       </div>

       <div className={styles.attribution}>
            <span>पंचांग डेटा स्रोत</span>

             <span>
              Powered by{" "}
              <a
             href="https://www.prokerala.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
             Prokerala
             </a>
             </span>
        </div>

    </section>
  );
}

export default PanchangMuhurat;
