import React, {
  useEffect,
  useState
} from "react";

import { supabase } from "../../supabaseClient";

import {
  MapPin,
  Search,
  LoaderCircle
} from "lucide-react";

import styles from "./CitySelector.module.css";


export default function CitySelector({
  onCitySelect,
  selectedCity
}) {

  const [query, setQuery] =
    useState("");

  const [cities, setCities] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] =
    useState(false);


  // ====================================================
  // KEEP INPUT SYNCED WITH SHARED SELECTED CITY
  // ====================================================

  useEffect(() => {

    if (!selectedCity) {
      return;
    }

    setQuery(
      `${selectedCity.city}, ${selectedCity.state}`
    );

    setOpen(false);
    setCities([]);

  }, [
    selectedCity?.id,
    selectedCity?.city,
    selectedCity?.state
  ]);


  // ====================================================
  // SEARCH CITIES
  // ====================================================

  useEffect(() => {

    const search = query.trim();


    if (search.length < 2) {

      setCities([]);
      setLoading(false);

      return;
    }


    // If query is simply showing the currently
    // selected city, don't search Supabase again.

    const selectedCityText =
      selectedCity
        ? `${selectedCity.city}, ${selectedCity.state}`
        : "";


    if (search === selectedCityText) {

      setCities([]);
      setLoading(false);

      return;
    }


    let cancelled = false;


    const timer = setTimeout(
      async () => {

        setLoading(true);


        const {
          data,
          error
        } =
          await supabase
            .from("indian_cities")
            .select(
              "id, city, state, latitude, longitude"
            )
            .ilike(
              "city",
              `${search}%`
            )
            .order("city")
            .limit(10);


        if (cancelled) {
          return;
        }


        if (error) {

          console.error(
            "City search failed:",
            error
          );

          setCities([]);

        } else {

          setCities(
            data || []
          );

        }


        setLoading(false);

      },
      300
    );


    return () => {

      cancelled = true;

      clearTimeout(timer);

    };

  }, [
    query,
    selectedCity?.id,
    selectedCity?.city,
    selectedCity?.state
  ]);


  // ====================================================
  // SELECT CITY
  // ====================================================

  const handleSelect = (city) => {

    setQuery(
      `${city.city}, ${city.state}`
    );

    setOpen(false);

    setCities([]);

    onCitySelect?.(city);

  };


  // ====================================================
  // INPUT CHANGE
  // ====================================================

  const handleInputChange = (e) => {

    setQuery(
      e.target.value
    );

    setOpen(true);

  };


  // ====================================================
  // UI
  // ====================================================

  return (

    <div className={styles.wrapper}>

      <div className={styles.searchBox}>

        <Search size={18} />


        <input
          type="text"
          placeholder="Search your city..."
          value={query}

          onChange={
            handleInputChange
          }

          onFocus={() => {

            // Only open dropdown when the user
            // has entered something different
            // from the selected city.

            const selectedCityText =
              selectedCity
                ? `${selectedCity.city}, ${selectedCity.state}`
                : "";


            if (
              query.trim() !==
              selectedCityText
            ) {

              setOpen(true);

            }

          }}
        />


        {loading && (

          <LoaderCircle
            size={17}
            className={
              styles.spinner
            }
          />

        )}

      </div>


      {/* ============================================= */}
      {/* SEARCH RESULTS                                */}
      {/* ============================================= */}

      {open &&
        query.trim().length >= 2 && (

          <div className={styles.dropdown}>


            {cities.map(
              (city) => (

                <button
                  type="button"
                  key={city.id}

                  className={
                    styles.cityOption
                  }

                  onClick={() =>
                    handleSelect(city)
                  }
                >

                  <MapPin size={16} />


                  <span>

                    <strong>
                      {city.city}
                    </strong>

                    <small>
                      {city.state}
                    </small>

                  </span>

                </button>

              )
            )}


            {!loading &&
              cities.length === 0 && (

                <p className={styles.empty}>
                  No matching cities found
                </p>

              )}

          </div>

        )}

    </div>

  );

}