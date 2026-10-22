import {
  useState,
  useEffect,
  useRef,
  useContext
} from "react";

import { supabase } from "../../supabaseClient";

import {
  LuMapPin,
  LuCalendarDays
} from "react-icons/lu";

import styles from "./Panchang.module.css";

import CitySelector from "./CitySelector";
import PanchangDetails from "./PanchangDetails";

import CityContext from "../../context/CityContext";


// ======================================================
// GET TODAY'S DATE IN INDIA
// ======================================================

const getTodayIST = () => {

  const parts = new Intl.DateTimeFormat(
    "en-GB",
    {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  ).formatToParts(new Date());


  const get = (type) =>
    parts.find(
      (part) => part.type === type
    )?.value;


  return `${get("year")}-${get("month")}-${get("day")}`;
};


// ======================================================
// PANCHANG
// ======================================================

function Panchang() {

  // ----------------------------------------------------
  // PANCHANG DATA
  // ----------------------------------------------------

  const [panchangData, setPanchangData] =
    useState(null);


  const [selectedDate, setSelectedDate] =
    useState("");


  // ----------------------------------------------------
  // SHARED CITY
  // ----------------------------------------------------

  const {
    selectedCity,
    setSelectedCity
  } = useContext(CityContext);


  // ----------------------------------------------------
  // STATUS
  // ----------------------------------------------------

  const [loading, setLoading] =
    useState(false);


  const [errorMessage, setErrorMessage] =
    useState("");


  // ----------------------------------------------------
  // REFS
  // ----------------------------------------------------

  const requestId = useRef(0);

  const cityRef = useRef(null);

  const dateRef = useRef("");


  // ====================================================
  // FETCH PANCHANG
  // ====================================================

  const fetchPanchang = async (city) => {

    if (!city) return;


    const currentRequest =
      ++requestId.current;


    setLoading(true);

    setErrorMessage("");

    setPanchangData(null);


    try {

      const {
        data,
        error
      } =
        await supabase.functions.invoke(
          "get-panchang",
          {
            body: {

              latitude:
                city.latitude,

              longitude:
                city.longitude,

            },
          }
        );


      // Ignore older requests
      if (
        currentRequest !==
        requestId.current
      ) {
        return;
      }


      if (error) {
        throw error;
      }


      if (
        data?.status !== "ok" ||
        !data?.data?.sunrise
      ) {

        throw new Error(
          "Invalid Panchang response"
        );

      }


      const date =
        data.data.sunrise.slice(0, 10);


      dateRef.current = date;


      setSelectedDate(date);

      setPanchangData(data);


    } catch (error) {

      if (
        currentRequest !==
        requestId.current
      ) {
        return;
      }


      console.error(
        "Panchang error:",
        error
      );


      setErrorMessage(
        "पंचांग लोड नहीं हो सका। कृपया पुनः प्रयास करें।"
      );


    } finally {

      if (
        currentRequest ===
        requestId.current
      ) {

        setLoading(false);

      }

    }

  };


  // ====================================================
  // CITY SELECTED
  // ====================================================

  const handleCitySelect = (city) => {

    // Only update shared city.
    // The effect below will fetch Panchang.

    setSelectedCity(city);

  };


  // ====================================================
  // FETCH WHEN SHARED CITY CHANGES
  // ====================================================

  useEffect(() => {

    if (!selectedCity) {
      return;
    }


    cityRef.current =
      selectedCity;


    fetchPanchang(
      selectedCity
    );


  }, [selectedCity?.id]);


  // ====================================================
  // AUTO REFRESH WHEN INDIA DATE CHANGES
  // ====================================================

  useEffect(() => {

    const interval =
      setInterval(() => {

        const today =
          getTodayIST();


        if (
          cityRef.current &&
          dateRef.current &&
          today !== dateRef.current &&
          !loading
        ) {

          fetchPanchang(
            cityRef.current
          );

        }

      }, 60000);


    return () =>
      clearInterval(interval);


  }, [loading]);


  // ====================================================
  // UI
  // ====================================================

  return (

    <section className={styles.panchang}>


      {/* ============================================= */}
      {/* TOP PANEL                                     */}
      {/* ============================================= */}

      <div className={styles.topPanel}>


        {/* =========================================== */}
        {/* CITY                                        */}
        {/* =========================================== */}

        <div className={styles.cityPanel}>

          <div className={styles.panelIcon}>

            <LuMapPin />

          </div>


          <div className={styles.panelContent}>

            <span className={styles.panelLabel}>
              अपना शहर चुनें
            </span>


            <CitySelector

              selectedCity={selectedCity}

              onCitySelect={
                handleCitySelect
              }

            />

          </div>

        </div>


        {/* =========================================== */}
        {/* DATE                                        */}
        {/* =========================================== */}

        <div className={styles.datePanel}>

          <div className={styles.dateIcon}>

            <LuCalendarDays />

          </div>


          <div>

            <span className={styles.panelLabel}>
              आज की तिथि
            </span>


            <h2>

              {new Intl.DateTimeFormat(
                "hi-IN",
                {
                  timeZone:
                    "Asia/Kolkata",

                  weekday:
                    "long",

                  day:
                    "numeric",

                  month:
                    "long",

                  year:
                    "numeric",
                }
              ).format(

                new Date(
                  `${getTodayIST()}T12:00:00+05:30`
                )

              )}

            </h2>


            {selectedCity && (

              <p className={styles.locationText}>

                {selectedCity.city},{" "}
                {selectedCity.state}

              </p>

            )}

          </div>

        </div>

      </div>


      {/* ============================================= */}
      {/* LOADING                                       */}
      {/* ============================================= */}

      {loading && (

        <div className={styles.status}>

          पंचांग लोड हो रहा है...

        </div>

      )}


      {/* ============================================= */}
      {/* ERROR                                         */}
      {/* ============================================= */}

      {errorMessage && (

        <div
          className={styles.error}
          role="alert"
        >

          {errorMessage}

        </div>

      )}


      {/* ============================================= */}
      {/* PANCHANG DETAILS                              */}
      {/* ============================================= */}

      {!loading &&
        panchangData && (

          <PanchangDetails

            response={
              panchangData
            }

            date={
              selectedDate
            }

          />

        )}


      {/* ============================================= */}
      {/* EMPTY STATE                                   */}
      {/* ============================================= */}

      {!loading &&
        !panchangData &&
        !errorMessage && (

          <div className={styles.emptyState}>

            अपने शहर का पंचांग देखने के लिए ऊपर शहर चुनें।

          </div>

        )}

    </section>

  );

}


export default Panchang;