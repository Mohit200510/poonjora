
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { MapPin, Search, LoaderCircle } from "lucide-react";
import styles from "./CitySelector.module.css";

export default function CitySelector({ onCitySelect }) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const search = query.trim();

    if (search.length < 2) {
      setCities([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("indian_cities")
        .select("id, city, state, latitude, longitude")
        .ilike("city", `${search}%`)
        .order("city")
        .limit(10);

      if (cancelled) return;

      if (error) {
        console.error("City search failed:", error);
        setCities([]);
      } else {
        setCities(data || []);
      }

      setLoading(false);
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const handleSelect = (city) => {
    setQuery(`${city.city}, ${city.state}`);
    setOpen(false);
    setCities([]);
    onCitySelect?.(city);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <Search size={18} />

        <input
          type="text"
          placeholder="Search your city..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />

        {loading && (
          <LoaderCircle
            size={17}
            className={styles.spinner}
          />
        )}
      </div>

      {open && query.trim().length >= 2 && (
        <div className={styles.dropdown}>
          {cities.map((city) => (
            <button
              type="button"
              key={city.id}
              className={styles.cityOption}
              onClick={() => handleSelect(city)}
            >
              <MapPin size={16} />

              <span>
                <strong>{city.city}</strong>
                <small>{city.state}</small>
              </span>
            </button>
          ))}

          {!loading && cities.length === 0 && (
            <p className={styles.empty}>
              No matching cities found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
