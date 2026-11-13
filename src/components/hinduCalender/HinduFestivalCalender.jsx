import React, {
  useContext,
  useEffect,
  useState
} from "react";

import { CityContext } from "../../context/CityContext";
import { supabase } from "../../supabaseClient";
import CitySelector from "../panchang/CitySelector";

import {
  Search,
  MapPin,
  Pencil,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  ArrowUpRight
} from "lucide-react";

import { Link } from "react-router-dom";
import styles from "./HinduFestivalCalender.module.css";


// ======================================================
// MONTH NAMES
// ======================================================

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];


// ======================================================
// GET CURRENT MONTH + YEAR IN INDIA
// ======================================================

function getCurrentISTMonthYear() {
  const parts = new Intl.DateTimeFormat(
    "en-GB",
    {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "numeric"
    }
  ).formatToParts(new Date());

  const year = Number(
    parts.find(
      (part) => part.type === "year"
    )?.value
  );

  const month = Number(
    parts.find(
      (part) => part.type === "month"
    )?.value
  );

  return {
    year,
    month: month - 1
  };
}


// ======================================================
// GET FESTIVAL DATE PARTS
// ======================================================

function getFestivalDateParts(dateString) {
  if (!dateString) {
    return {
      month: "",
      day: "",
      weekday: ""
    };
  }

  const [year, month, day] =
    dateString
      .split("-")
      .map(Number);

  if (!year || !month || !day) {
    return {
      month: "",
      day: "",
      weekday: ""
    };
  }

  const date = new Date(
    year,
    month - 1,
    day
  );

  return {
    month:
      date
        .toLocaleDateString(
          "en-IN",
          {
            month: "short"
          }
        )
        .toUpperCase(),

    day:
      String(day)
        .padStart(2, "0"),

    weekday:
      date
        .toLocaleDateString(
          "en-IN",
          {
            weekday: "short"
          }
        )
        .toUpperCase()
  };
}


// ======================================================
// FORMAT TITHI TIMING
// ======================================================

function formatTithiTiming(value) {
  if (!value) {
    return {
      date: "Timing unavailable",
      time: ""
    };
  }

  // OccultAPI may return "YYYY-MM-DD HH:mm:ss UTC".
  // Normalize it to ISO 8601 for reliable browser parsing.
  const normalizedValue = typeof value === "string"
    ? value.replace(" UTC", "Z").replace(" ", "T")
    : value;

  const date = new Date(normalizedValue);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return {
      date: value,
      time: ""
    };
  }

  const formattedDate =
    new Intl.DateTimeFormat(
      "en-IN",
      {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "long"
      }
    ).format(date);

  const formattedTime =
    new Intl.DateTimeFormat(
      "en-IN",
      {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }
    ).format(date);

  return {
    date: formattedDate,
    time: formattedTime
  };
}


// ======================================================
// HINDU FESTIVAL CALENDAR
// ======================================================

export default function HinduFestivalCalendar() {

  const currentIST =getCurrentISTMonthYear();
  
  const minYear = currentIST.year;
const maxYear = currentIST.year + 1;

  const [selectedYear, setSelectedYear] =useState(currentIST.year);

  const [selectedMonth,setSelectedMonth] =useState(currentIST.month);

  const {selectedCity,setSelectedCity} =useContext(CityContext);

  const [showCitySelector,setShowCitySelector] =useState(false);

  const [festivals, setFestivals] = useState([]);

  const [loading,setLoading] =useState(false);

  const [error,setError] =useState("");

  const [cacheMissing,setCacheMissing] =useState(false);


  // ====================================================
  // MONTH NAVIGATION
  // ====================================================

  const handlePreviousMonth = () => {
    if (selectedYear === minYear && selectedMonth === 0) return;

    if (selectedMonth === 0) {
      setSelectedYear((prev) => prev - 1);
      setSelectedMonth(11);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedYear === maxYear && selectedMonth === 11) return;

    if (selectedMonth === 11) {
      setSelectedYear((prev) => prev + 1);
      setSelectedMonth(0);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };


  // ====================================================
  // SELECT MONTH FROM MONTH STRIP
  // ====================================================

  const handleMonthSelect = (
    monthIndex
  ) => {
    setSelectedMonth(
      monthIndex
    );
  };


  // ====================================================
  // TODAY
  // ====================================================

  const handleToday = () => {
    const current =
      getCurrentISTMonthYear();

    setSelectedYear(
      current.year
    );

    setSelectedMonth(
      current.month
    );
  };


  // ====================================================
  // CITY
  // ====================================================

  const handleCitySelect = (
    city
  ) => {
    setSelectedCity(city);
    setShowCitySelector(false);
  };


  
 // ====================================================
 // FETCH FESTIVAL DATA
 // ====================================================

 useEffect(() => {
   let cancelled = false;

   async function fetchFestivals() {

     if (
       !selectedCity?.id ||
       !Number.isInteger(Number(selectedCity.id))
     ) {
       setFestivals([]);
       setError("");
       return;
     }

     setLoading(true);
     setError("");
     setCacheMissing(false);
     setFestivals([]);

     try {

       const {
         data,
         error: functionError
       } = await supabase.functions.invoke(
         "get-festivals",
         {
           body: {
             location_id: Number(selectedCity.id),
             year: Number(selectedYear)
           }
         }
       );

       if (cancelled) {
         return;
       }

       if (functionError) {
         throw functionError;
       }

       if (!data?.success) {
         throw new Error(
           data?.error ||
           "Unable to load festival data."
         );
       }

       

       // ==========================================
       // HANDLE CACHE
       // ==========================================

       if (!data.cached) {
         setFestivals([]);
         setCacheMissing(true);
         return;
       }

       // ==========================================
       // UPDATE FESTIVALS
       // ==========================================

       setCacheMissing(false);
       setFestivals(
         Array.isArray(data.festivals)
           ? data.festivals
           : []
       );

     } catch (err) {

       console.error(
         "Festival calendar error:",
         err
       );

       if (!cancelled) {
         setFestivals([]);
         setError(
           "Unable to load festival dates. Please try again."
         );
       }

     } finally {

       if (!cancelled) {
         setLoading(false);
       }
     }
   }

   fetchFestivals();

   return () => {
     cancelled = true;
   };

 }, [
   selectedCity?.id,
   selectedYear
 ]);





    // ==========================================
// UNIFIED FESTIVALS & VRATS
// ==========================================


const filteredFestivals = festivals
  .filter((item) => {
    const date = item.festivalDateCandidate;

    if (!date) return false;

    const [year, month] = date
      .split("-")
      .map(Number);

    return (
      year === selectedYear &&
      month === selectedMonth + 1
    );
  })
  .sort((a, b) =>
    a.festivalDateCandidate.localeCompare(
      b.festivalDateCandidate
    )
  );



  // ====================================================
  // UI
  // ====================================================

  return (

    <section
      className={
        styles.calendar
      }
    >


      {/* ================================================= */}
      {/* FINALIZED HERO HEADER                             */}
      {/* ================================================= */}

      <div
        className={
          styles.hero
        }
      >

        <div
          className={
            styles.heroContent
          }
        >


          {/* TEMPORARY POONJORA MARK */}

          <div
            className={
              styles.brandMark
            }
          >

            <div
              className={
                styles.brandDecoration
              }
            >

              <span />

              <span
                className={
                  styles.lotus
                }
              >
                ♢
              </span>

              <span />

            </div>

            <p>
              POONJORA
            </p>

          </div>


          {/* TITLE */}

          <h1
            className={
              styles.heroTitle
            }
          >
            Hindu Festival Calendar
          </h1>


          {/* SUBTITLE */}

          <p
            className={
              styles.heroSubtitle
            }
          >
            Festivals, vrats and sacred observances
            <br />
            based on your location
          </p>


          {/* LOCATION */}

          <div
            className={
              styles.locationArea
            }
          >

            <div
              className={
                styles.locationPill
              }
            >

              <div
                className={
                  styles.currentLocation
                }
              >

                <Search
                  size={20}
                />

                <span>
                  {selectedCity
                    ? `${selectedCity.city}, ${selectedCity.state}`
                    : "Select your city"}
                </span>

              </div>


              <span
                className={
                  styles.locationDivider
                }
              />


              <button
                type="button"

                className={
                  styles.changeCityButton
                }

                onClick={() =>
                  setShowCitySelector(
                    (prev) => !prev
                  )
                }
              >

                <Pencil
                  size={17}
                />

                {selectedCity
                  ? "Change City"
                  : "Select City"}

              </button>

            </div>


            {/* CITY SEARCH */}

            {showCitySelector && (

              <div
                className={
                  styles.citySelectorPopup
                }
              >

                <CitySelector
                  selectedCity={
                    selectedCity
                  }

                  onCitySelect={
                    handleCitySelect
                  }
                />

              </div>

            )}

          </div>

        </div>


        {/* ================================================= */}
        {/* FLOATING MONTH NAVIGATION                         */}
        {/* ================================================= */}

        <div
          className={
            styles.calendarNavigation
          }
        >


          {/* TOP NAVIGATION */}

          <div
            className={
              styles.navigationTop
            }
          >


            <div
              className={
                styles.navigationCenter
              }
            >

              <button
                type="button"

                className={
                  styles.navArrow
                }

                onClick={
                  handlePreviousMonth
                }

                disabled={
                  selectedYear === minYear &&
                  selectedMonth === 0
                }

                aria-label="Previous month"
              >

                <ChevronLeft
                  size={25}
                />

              </button>


              <span
                className={
                  styles.headingLine
                }
              />


              <h2>
                {
                  monthNames[
                    selectedMonth
                  ]
                }{" "}
                {selectedYear}
              </h2>


              <span
                className={
                  styles.headingLine
                }
              />


              <button
                type="button"

                className={
                  styles.navArrow
                }

                onClick={
                  handleNextMonth
                }

                disabled={
                  selectedYear === maxYear &&
                  selectedMonth === 11
                }

                aria-label="Next month"
              >

                <ChevronRight
                  size={25}
                />

              </button>

            </div>


            {/* TODAY */}

            <button
              type="button"

              className={
                styles.todayButton
              }

              onClick={
                handleToday
              }
            >

              <CalendarDays
                size={18}
              />

              Today

            </button>

          </div>


          {/* MONTH STRIP */}

          <div
            className={
              styles.monthStrip
            }
          >

            {shortMonthNames.map(
              (
                month,
                index
              ) => (

                <button
                  type="button"

                  key={month}

                  className={
                    index ===
                    selectedMonth

                      ? `${styles.monthButton} ${styles.activeMonth}`

                      : styles.monthButton
                  }

                  onClick={() =>
                    handleMonthSelect(
                      index
                    )
                  }
                >

                  {month}

                </button>

              )
            )}

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* FESTIVAL CONTENT                                  */}
      {/* ================================================= */}

      <div
        className={
          styles.festivalContent
        }
      >

        <div className={styles.compactFestivalHeading}>
  <h2>
    {monthNames[selectedMonth]} {selectedYear}
  </h2>

  <span>
    {filteredFestivals.length} festivals &amp; vrats
  </span>
</div>


        {/* ================================================= */}
        {/* FESTIVAL SECTION HEADING                          */}
        {/* ================================================= */}

        {/* <div
          className={
            styles.festivalHeading
          }
        >

          <div
            className={
              styles.headingOrnament
            }
          >

            <span />

            <i>
              ◇
            </i>

            <span />

          </div>


          <h2>
            Festivals & Vrats
          </h2>


          <p>
            Sacred observances for{" "}
            {
              monthNames[
                selectedMonth
              ]
            }{" "}
            {selectedYear}
          </p>


          {selectedCity && (

            <div
              className={
                styles.festivalMeta
              }
            >

              <span>

                <CalendarDays
                  size={17}
                />

                {
                  filteredFestivals.length
                }{" "}

                {
                  filteredFestivals.length === 1
                    ? "observance"
                    : "observances"
                }

              </span>


              <i>
                •
              </i>


              <span>

                <MapPin
                  size={17}
                />

                {
                  selectedCity.city
                },{" "}
                {
                  selectedCity.state
                }

              </span>

            </div>

          )}

        </div> */}


        {/* ================================================= */}
        {/* NO CITY                                           */}
        {/* ================================================= */}

        {!selectedCity && (

          <p
            className={
              styles.message
            }
          >
            Select a city to view festivals and vrats.
          </p>

        )}


        {/* ================================================= */}
        {/* LOADING                                           */}
        {/* ================================================= */}

        {selectedCity &&
          loading && (

            <p
              className={
                styles.message
              }
            >
              Loading festivals and vrats...
            </p>

          )}


        {/* ================================================= */}
        {/* ERROR                                             */}
        {/* ================================================= */}

        {selectedCity &&
          !loading &&
          error && (

            <p
              className={
                styles.error
              }
            >
              {error}
            </p>

          )}


        {/* ================================================= */}
        {/* CACHE MISSING                                     */}
        {/* ================================================= */}

        {selectedCity &&
          !loading &&
          !error &&
          cacheMissing && (

            <p
              className={
                styles.message
              }
            >

              Festival data for{" "}
              {selectedYear} is not cached
              yet for{" "}
              {selectedCity.city}.

            </p>

          )}


        {/* ================================================= */}
        {/* NO FESTIVALS IN SELECTED MONTH                   */}
        {/* ================================================= */}

        {selectedCity &&
          !loading &&
          !error &&
          !cacheMissing &&
          filteredFestivals.length === 0 && (

            <p className={styles.message}>
              No festivals or vrats are available in{" "}
              {monthNames[selectedMonth]}{" "}
              {selectedYear}.
            </p>

          )}


        {/* ================================================= */}
        {/* FESTIVAL TIMELINE                                 */}
        {/* ================================================= */}

        {selectedCity &&
          !loading &&
          !error &&
          !cacheMissing &&
          filteredFestivals.length > 0 && (

            <div className={styles.festivalGrid}>
              {filteredFestivals.map((item, index) => {
                const dateParts = getFestivalDateParts(item.festivalDateCandidate);
                const tithiStart = formatTithiTiming(item.sourceStart);
                const tithiEnd = formatTithiTiming(item.sourceEnd);
                const tithiName = item.tithi
                  ? `${item.tithi} Tithi`
                  : "Tithi information unavailable";

                // Prefer the canonical slug from your festival data when provided.
                // Confirm this fallback matches the slug used by your details route.
                const slug = item.slug || item.festivalSlug || String(item.name || "")
                  .toLowerCase()
                  .normalize("NFKD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "");

                const detailPath = `/festivals/${encodeURIComponent(slug)}/${selectedYear}`;
                const timingRange = item.sourceStart && item.sourceEnd
                  ? `${tithiStart.date}, ${tithiStart.time} – ${tithiEnd.date}, ${tithiEnd.time}`
                  : "Tithi timings unavailable";

                return (
                  <Link
                    key={`${item.festivalType}-${item.name}-${item.festivalDateCandidate}-${index}`}
                    to={detailPath}
                    className={styles.festivalEntry}
                    aria-label={`View ${item.name} festival details`}
                  >
                    <div className={styles.entryDate} aria-hidden="true">
                      <strong>{dateParts.day}</strong>
                      <span>{dateParts.weekday} · {dateParts.month}</span>
                    </div>

                    <div className={styles.entryBody}>
                      <span className={styles.festivalCategory}>
  {item.festivalType === "ekadashi"
    ? "VRAT · EKADASHI"
    : "MAJOR FESTIVAL"}
</span>

<h3>{item.name}</h3>
                      {(item.month || item.paksha) && (
                        <p className={styles.entryPaksha}>
                          {[item.month, item.paksha].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <p className={styles.entryTithi}>{tithiName}</p>
                      <p className={styles.entryTiming}>
                        <Clock3 size={15} aria-hidden="true" />
                        <span>{timingRange}</span>
                      </p>
                    </div>
                    <span className={styles.entryArrow} aria-hidden="true">
                      <ArrowUpRight size={19} />
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

      </div>

    </section>

  );
}
