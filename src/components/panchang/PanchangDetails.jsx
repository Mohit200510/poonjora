
import React, { useEffect, useState } from "react";

import {
  LuFlower2,LuMoon,LuSun,LuOrbit,LuSunrise,LuSunset,LuMoonStar,} from "react-icons/lu"; 
import PanchangMuhurat from "./PanchangMuhurat";
import styles from "./PanchangDetails.module.css";

const hindiNames = {
  // Days
  Sunday: "रविवार",
  Monday: "सोमवार",
  Tuesday: "मंगलवार",
  Wednesday: "बुधवार",
  Thursday: "गुरुवार",
  Friday: "शुक्रवार",
  Saturday: "शनिवार",

  // Paksha
  "Shukla Paksha": "शुक्ल पक्ष",
  "Krishna Paksha": "कृष्ण पक्ष",

  // Tithi
  Pratipada: "प्रतिपदा",
  Dwitiya: "द्वितीया",
  Tritiya: "तृतीया",
  Chaturthi: "चतुर्थी",
  Panchami: "पंचमी",
  Shashthi: "षष्ठी",
  Shashti: "षष्ठी",
  Saptami: "सप्तमी",
  Ashtami: "अष्टमी",
  Navami: "नवमी",
  Dashami: "दशमी",
  Ekadashi: "एकादशी",
  Dwadashi: "द्वादशी",
  Trayodashi: "त्रयोदशी",
  Chaturdashi: "चतुर्दशी",
  Purnima: "पूर्णिमा",
  Amavasya: "अमावस्या",

  // Nakshatra
  Ashwini: "अश्विनी",
  Bharani: "भरणी",
  Krittika: "कृत्तिका",
  Rohini: "रोहिणी",
  Mrigashirsha: "मृगशिरा",
  Ardra: "आर्द्रा",
  Punarvasu: "पुनर्वसु",
  Pushya: "पुष्य",
  Ashlesha: "आश्लेषा",
  Magha: "मघा",
  PurvaPhalguni: "पूर्वाफाल्गुनी",
  "Purva Phalguni": "पूर्वाफाल्गुनी",
  UttaraPhalguni: "उत्तराफाल्गुनी",
  "Uttara Phalguni": "उत्तराफाल्गुनी",
  Hasta: "हस्त",
  Chitra: "चित्रा",
  Swati: "स्वाती",
  Vishakha: "विशाखा",
  Anuradha: "अनुराधा",
  Jyeshta: "ज्येष्ठा",
  Mula: "मूल",
  PurvaAshadha: "पूर्वाषाढ़ा",
  "Purva Ashadha": "पूर्वाषाढ़ा",
  UttaraAshadha: "उत्तराषाढ़ा",
  "Uttara Ashadha": "उत्तराषाढ़ा",
  Shravana: "श्रवण",
  Dhanishta: "धनिष्ठा",
  Shatabhisha: "शतभिषा",
  PurvaBhadrapada: "पूर्वाभाद्रपद",
  "Purva Bhadrapada": "पूर्वाभाद्रपद",
  UttaraBhadrapada: "उत्तराभाद्रपद",
  "Uttara Bhadrapada": "उत्तराभाद्रपद",
  Revati: "रेवती",

  // Yoga
  Vishkambha: "विष्कम्भ",
  Priti: "प्रीति",
  Ayushman: "आयुष्मान",
  Saubhagya: "सौभाग्य",
  Shobhana: "शोभन",
  Atiganda: "अतिगण्ड",
  Sukarma: "सुकर्मा",
  Dhriti: "धृति",
  Shula: "शूल",
  Ganda: "गण्ड",
  Vriddhi: "वृद्धि",
  Dhruva: "ध्रुव",
  Vyaghata: "व्याघात",
  Harshana: "हर्षण",
  Vajra: "वज्र",
  Siddhi: "सिद्धि",
  Vyatipata: "व्यतीपात",
  Variyana: "वरीयान",
  Parigha: "परिघ",
  Shiva: "शिव",
  Siddha: "सिद्ध",
  Sadhya: "साध्य",
  Shubha: "शुभ",
  Shukla: "शुक्ल",
  Brahma: "ब्रह्म",
  Indra: "इन्द्र",
  Vaidhriti: "वैधृति",

  // Karana
  Bava: "बव",
  Balava: "बालव",
  Kaulava: "कौलव",
  Taitila: "तैतिल",
  Garaja: "गर",
  Vanija: "वणिज",
  Vishti: "विष्टि / भद्रा",
  "Vishti / Bhadra": "विष्टि / भद्रा",
  Shakuni: "शकुनि",
  Chatushpada: "चतुष्पाद",
  Naga: "नाग",
  Kimstughna: "किंस्तुघ्न",
};

const translate = (value) =>
  hindiNames[value] || value || "—";

// Get YYYY-MM-DD date according to Indian time
const getISTDate = (timestamp) => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(timestamp));

  const get = (type) =>
    parts.find((part) => part.type === type)?.value;

  return `${get("year")}-${get("month")}-${get("day")}`;
};

// Format time in IST
const formatTime = (dateString) => {
  if (!dateString) return "—";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

// Show today, tomorrow or an actual date
const formatEndTime = (dateString, referenceDate) => {
  if (!dateString) return "—";

  const endDate = new Date(dateString);

  if (Number.isNaN(endDate.getTime())) return "—";

  const endDateIST = getISTDate(endDate);
  const time = formatTime(dateString);

  const difference = Math.round(
    (
      new Date(`${endDateIST}T00:00:00+05:30`).getTime() -
      new Date(`${referenceDate}T00:00:00+05:30`).getTime()
    ) / 86400000
  );

  if (difference === 0) {
    return `आज ${time} तक`;
  }

  if (difference === 1) {
    return `कल ${time} तक`;
  }

  const formattedDate = new Intl.DateTimeFormat("hi-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
  }).format(endDate);

  return `${formattedDate}, ${time} तक`;
};

// Find the Panchang entry active at the current time
const getActiveEntry = (entries, referenceTime) => {
  if (!Array.isArray(entries)) return null;

  const time = new Date(referenceTime).getTime();

  if (Number.isNaN(time)) return null;

  return (
    entries.find((entry) => {
      const start = new Date(entry.start).getTime();
      const end = new Date(entry.end).getTime();

      return start <= time && time < end;
    }) || null
  );
};

function PanchangDetails({ response, date }) {
  const [currentTime, setCurrentTime] = useState(
    () => Date.now()
  );

  // Update the clock every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const data = response?.data;

  if (!data || !date) return null;

  const todayIST = getISTDate(currentTime);

  // Today's values use the current time.
  // Other dates use noon IST.
  const referenceTime =
    date === todayIST
      ? currentTime
      : new Date(`${date}T12:00:00+05:30`).getTime();

  const tithi = getActiveEntry(data.tithi, referenceTime);
  const nakshatra = getActiveEntry(
    data.nakshatra,
    referenceTime
  );
  const yoga = getActiveEntry(data.yoga, referenceTime);
  const karana = getActiveEntry(data.karana, referenceTime);

  
const details = [
  {
    label: "तिथि",
    value: tithi
      ? `${translate(tithi.paksha)} ${translate(tithi.name)}`
      : "—",
    end: tithi?.end,
    icon: LuFlower2,
    theme: "tithi",
  },
  {
    label: "नक्षत्र",
    value: translate(nakshatra?.name),
    end: nakshatra?.end,
    icon: LuMoon,
    theme: "nakshatra",
  },
  {
    label: "योग",
    value: translate(yoga?.name),
    end: yoga?.end,
    icon: LuSun,
    theme: "yoga",
  },
  {
    label: "करण",
    value: translate(karana?.name),
    end: karana?.end,
    icon: LuOrbit,
    theme: "karana",
  },
];


  
return (
  <div className={styles.container}>
    <div className={styles.heading}>
      <div>
        <h3>पंचांग विवरण</h3>
        <p>आज की वैदिक जानकारी</p>
      </div>

      <span className={styles.dayBadge}>
        {translate(data.vaara)}
      </span>
    </div>

    <div className={styles.grid}>
      {details.map((item) => {
        const Icon = item.icon;

        return (
          <div
            className={`${styles.detail} ${styles[item.theme]}`}
            key={item.label}
          >
            <div className={styles.detailIcon}>
              <Icon />
            </div>

            <span className={styles.label}>
              {item.label}
            </span>

            <strong>{item.value}</strong>

            {item.end && (
              <small>
                {formatEndTime(item.end, date)}
              </small>
            )}
          </div>
        );
      })}
    </div>

    <div className={styles.sunTimes}>
      <div className={styles.timeItem}>
        <span className={styles.timeIcon}>
          <LuSunrise />
        </span>
        <div>
          <span>सूर्योदय</span>
          <strong>{formatTime(data.sunrise)}</strong>
        </div>
      </div>

      <div className={styles.timeItem}>
        <span className={styles.timeIcon}>
          <LuSunset />
        </span>
        <div>
          <span>सूर्यास्त</span>
          <strong>{formatTime(data.sunset)}</strong>
        </div>
      </div>

      <div className={styles.timeItem}>
        <span className={styles.timeIcon}>
          <LuMoon />
        </span>
        <div>
          <span>चंद्रोदय</span>
          <strong>{formatTime(data.moonrise)}</strong>
        </div>
      </div>

      <div className={styles.timeItem}>
        <span className={styles.timeIcon}>
          <LuMoonStar />
        </span>
        <div>
          <span>चंद्रास्त</span>
          <strong>{formatTime(data.moonset)}</strong>
        </div>
      </div>
    </div>
    <PanchangMuhurat sunrise={data.sunrise} sunset={data.sunset} date={date}/>
  </div>
);

}

export default PanchangDetails;
