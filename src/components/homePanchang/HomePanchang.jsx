
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { FaAngleDown } from "react-icons/fa6";


import {
  LuMoon,
  LuCalendarDays,
  LuStar,
  LuFlower2,
  LuOrbit,
  LuSunrise,
  LuSunset,
  LuClock3,
  LuMapPin,
  LuArrowRight,
  LuPencil,
} from "react-icons/lu";

import {
  getISTDate,
  formatTime,
  getActiveEntry,
  translate,
  getRahuKaal,
} from "../panchang/panchangUtils";

import styles from "./HomePanchang.module.css";

const DEFAULT_CITY = {
  city: "Chandigarh",
  state: "Chandigarh",
  latitude: 30.7333,
  longitude: 76.7794,
};

// Display when a Panchang interval ends
const formatEndTime = (endTime, today) => {
  if (!endTime) return "—";

  const endDate = getISTDate(endTime);
  const prefix = endDate === today ? "आज" : "कल";

  return `${prefix} ${formatTime(endTime)} तक`;
};

function HomePanchang() {
  const [panchang, setPanchang] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(() => Date.now());

  const today = getISTDate(now);

  useEffect(() => {
    let cancelled = false;

    const fetchPanchang = async () => {
      setLoading(true);
      setError("");
      setPanchang(null);

      try {
        const { data, error: apiError } =
          await supabase.functions.invoke("get-panchang", {
            body: {
              latitude: DEFAULT_CITY.latitude,
              longitude: DEFAULT_CITY.longitude,
            },
          });

        if (cancelled) return;
        if (apiError) throw apiError;

        if (
          data?.status !== "ok" ||
          !data?.data?.sunrise
        ) {
          throw new Error("Invalid Panchang response");
        }

        setPanchang(data.data);
      } catch (err) {
        if (cancelled) return;

        console.error("Home Panchang error:", err);
        setError("पंचांग लोड नहीं हो सका।");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPanchang();

    return () => {
      cancelled = true;
    };
  }, [today]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const tithi = getActiveEntry(panchang?.tithi, now);
  const nakshatra = getActiveEntry(panchang?.nakshatra, now);
  const yoga = getActiveEntry(panchang?.yoga, now);
  const karana = getActiveEntry(panchang?.karana, now);

  const details = [
    {
      label: "तिथि",
      value: tithi
        ? `${translate(tithi.paksha)} ${translate(tithi.name)}`
        : "—",
      end: tithi?.end,
      icon: LuMoon,
    },
    {
       label: "वार",
      value: translate(panchang?.vaara),
      english: panchang?.vaara,
      end: null,
      icon: LuCalendarDays,
    },
    {
      label: "नक्षत्र",
      value: translate(nakshatra?.name),
      end: nakshatra?.end,
      icon: LuStar,
    },
    {
      label: "योग",
      value: translate(yoga?.name),
      end: yoga?.end,
      icon: LuFlower2,
    },
    {
      label: "करण",
      value: translate(karana?.name),
      end: karana?.end,
      icon: LuOrbit,
    },
  ];

  const rahu = getRahuKaal(
    panchang?.sunrise,
    panchang?.sunset,
    today
  );

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(now));

  return (
    <section className={styles.homePanchang}>
      {/* Decorative header */}
      <div className={styles.bannerHeader}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>
            ✦ POONJORA PANCHANG ✦
          </span>

          <h2>आज का पंचांग</h2>

          <p>{formattedDate}</p>

          {/* Highlighted location with edit button */}
          <div className={styles.locationRow}>
            <Link to="/panchang" title="Change location">
            <span className={styles.city}>
              <LuMapPin />
              {DEFAULT_CITY.city}
               <FaAngleDown/> 

            </span>
            </Link>

            <Link
              to="/panchang"
              className={styles.editLocation}
              title="Change location"
              aria-label="Change Panchang location"
            >
              <LuPencil />
            </Link>
          </div>
        </div>

        <div className={styles.panchangLiveBadge}>
          <span className={styles.liveDot}></span>
          LIVE
        </div>
      </div>

      {/* Panchang information */}
      <div className={styles.content}>
        {loading ? (
          <p className={styles.message}>
            पंचांग लोड हो रहा है...
          </p>
        ) : error ? (
          <p className={styles.message} role="alert">
            {error}
          </p>
        ) : (
          <>
            <div className={styles.details}>
              {details.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className={styles.detail}
                    key={item.label}
                  >
                    <div className={styles.detailTop}>
                      <Icon className={styles.detailIcon} />
                      <span>{item.label}</span>
                    </div>

                    <strong>{item.value}</strong>

                      {item.english && (
                     <small className={styles.englishDay}>
                      {item.english}
                      </small>
                      )}

                      {item.end && (
                      <small>{formatEndTime(item.end, today)}</small>
                     )}
                  </div>
                );
              })}
            </div>

            <div className={styles.rightPanel}>
              {/* Sunrise and sunset */}
              <div className={styles.timings}>
                <div className={styles.timeItem}>
                  <LuSunrise />
                  <div>
                    <span>सूर्योदय</span>
                    <strong>
                      {formatTime(panchang?.sunrise)}
                    </strong>
                  </div>
                </div>

                <div className={styles.timeItem}>
                  <LuSunset />
                  <div>
                    <span>सूर्यास्त</span>
                    <strong>
                      {formatTime(panchang?.sunset)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Rahu Kaal and full Panchang link */}
              <div className={styles.rightBottom}>
                <div className={styles.rahuKaal}>
                  <LuClock3 />

                  <div>
                    <span>राहु काल</span>
                    <strong>
                      {rahu?.formatted || "—"}
                    </strong>
                  </div>
                </div>

                <Link
                  to="/panchang"
                  className={styles.viewButton}
                >
                  पूरा पंचांग देखें
                  <LuArrowRight />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Prokerala attribution */}
      <a
        className={styles.attribution}
        href="https://www.prokerala.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Prokerala
      </a>
    </section>
  );
}

export default HomePanchang;
