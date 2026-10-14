
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../supabaseClient";
import { LuMapPin, LuCalendarDays } from "react-icons/lu";
import styles from "./Panchang.module.css";
import CitySelector from "./CitySelector";
import PanchangDetails from "./PanchangDetails";

// Get today's date in Indian Standard Time
const getTodayIST = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const get = (type) =>
    parts.find((part) => part.type === type)?.value;

  return `${get("year")}-${get("month")}-${get("day")}`;
};

function Panchang() {
  const [panchangData, setPanchangData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const requestId = useRef(0);
  const cityRef = useRef(null);
  const dateRef = useRef("");

  const fetchPanchang = async (city) => {
    if (!city) return;

    const currentRequest = ++requestId.current;

    setLoading(true);
    setErrorMessage("");
    setPanchangData(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "get-panchang",
        {
          body: {
            latitude: city.latitude,
            longitude: city.longitude,
          },
        }
      );

      if (currentRequest !== requestId.current) return;

      if (error) throw error;

      if (data?.status !== "ok" || !data?.data?.sunrise) {
        throw new Error("Invalid Panchang response");
      }

      const date = data.data.sunrise.slice(0, 10);


// console.log("Prokerala Panchang data:", data.data);
      dateRef.current = date;
      setSelectedDate(date);
      setPanchangData(data);

    } catch (error) {
      if (currentRequest !== requestId.current) return;

      console.error("Panchang error:", error);

      setErrorMessage(
        "पंचांग लोड नहीं हो सका। कृपया पुनः प्रयास करें।"
      );

    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  };

  const handleCitySelect = (city) => {
    cityRef.current = city;
    setSelectedCity(city);
    fetchPanchang(city);
    
  };

  // Automatically fetch fresh Panchang when
  // the calendar date changes in India.
  useEffect(() => {
    const interval = setInterval(() => {
      const today = getTodayIST();

      if (
        cityRef.current &&
        dateRef.current &&
        today !== dateRef.current &&
        !loading
      ) {
        fetchPanchang(cityRef.current);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [loading]);

  
return (
  <section className={styles.panchang}>
    <div className={styles.topPanel}>
      <div className={styles.cityPanel}>
        <div className={styles.panelIcon}>
          <LuMapPin />
        </div>

        <div className={styles.panelContent}>
          <span className={styles.panelLabel}>
            अपना शहर चुनें
          </span>

          <CitySelector onCitySelect={handleCitySelect} />
        </div>
      </div>

      <div className={styles.datePanel}>
        <div className={styles.dateIcon}>
          <LuCalendarDays />
        </div>

        <div>
          <span className={styles.panelLabel}>
            आज की तिथि
          </span>

          <h2>
            {new Intl.DateTimeFormat("hi-IN", {
              timeZone: "Asia/Kolkata",
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(
              new Date(
                `${getTodayIST()}T12:00:00+05:30`
              )
            )}
          </h2>

          {selectedCity && (
            <p className={styles.locationText}>
              {selectedCity.city}, {selectedCity.state}
            </p>
          )}
        </div>
      </div>
    </div>

    {loading && (
      <div className={styles.status}>
        पंचांग लोड हो रहा है...
      </div>
    )}

    {errorMessage && (
      <div className={styles.error} role="alert">
        {errorMessage}
      </div>
    )}

    {!loading && panchangData && (
      <PanchangDetails
        response={panchangData}
        date={selectedDate}
      />
    )}

    {!loading && !panchangData && !errorMessage && (
      <div className={styles.emptyState}>
        अपने शहर का पंचांग देखने के लिए ऊपर शहर चुनें।
      </div>
    )}
  </section>
);

}

export default Panchang;
