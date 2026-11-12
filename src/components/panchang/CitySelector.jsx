
import React, { useEffect, useId, useRef, useState } from "react";
import { supabase } from "../../supabaseClient";
import {
  MapPin,
  Search,
  LoaderCircle,
  ChevronDown,
  Check
} from "lucide-react";
import styles from "./CitySelector.module.css";

export default function CitySelector({
  onCitySelect,
  selectedCity,
  compact = false
}) {
  const selectedText = selectedCity
    ? [selectedCity.city, selectedCity.state]
        .filter(Boolean)
        .join(", ")
    : "";

  const [query, setQuery] = useState(selectedText);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const resultsId = useId();

  // Synchronize the input with the shared city.
  useEffect(() => {
    setQuery(selectedText);
    setOpen(false);
    setCities([]);
  }, [selectedText]);

  // Close the list when clicking outside.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
        setQuery(selectedText);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );
    };
  }, [selectedText]);

  // Load available cities or search by city/state.
  useEffect(() => {
    if (!open) {
      setLoading(false);
      return;
    }

    const search = query.trim();

    let cancelled = false;

    setLoading(true);
    setError(false);
    setCities([]);

    const timer = setTimeout(async () => {
      let request = supabase
        .from("indian_cities")
        .select("id, city, state, latitude, longitude");

      if (search) {
        const safeSearch = search
          .replace(/[(),.%*\\]/g, "")
          .trim();

        if (safeSearch) {
          request = request.or(
            `city.ilike.${safeSearch}%,state.ilike.${safeSearch}%`
          );
        }
      }

      const { data, error: fetchError } = await request
        .order("city")
        .order("state")
        .limit(15);

      if (cancelled) return;

      if (fetchError) {
        console.error("City search failed:", fetchError);
        setError(true);
        setCities([]);
      } else {
        setCities(data || []);
      }

      setLoading(false);
    }, search ? 300 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, open]);

  const handleOpen = () => {
    setQuery("");
    setOpen(true);
  };

  const handleSelect = (city) => {
  const cityName = [city.city, city.state]
    .filter(Boolean)
    .join(", ");

  setQuery(cityName);
  setOpen(false);
  setCities([]);

  // Update shared selected city
  onCitySelect?.(city);

  // Remove focus from search field
  inputRef.current?.blur();
};

  const handleToggle = () => {
    if (open) {
      setOpen(false);
      setQuery(selectedText);
    } else {
      handleOpen();
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      setQuery(selectedText);
      inputRef.current?.blur();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${
        compact ? styles.compact : ""
      }`}
    >
      <div className={styles.searchBox}>
        {compact ? (
          <MapPin size={16} aria-hidden="true" />
        ) : (
          <Search size={18} aria-hidden="true" />
        )}

        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder={
            selectedText || "Search city or state"
          }
          onFocus={() => {
            if (!open) handleOpen();
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          aria-label="Search city or state"
          aria-expanded={open}
          aria-controls={resultsId}
          aria-autocomplete="list"
          autoComplete="off"
        />

        {loading && (
          <LoaderCircle
            size={17}
            className={styles.spinner}
            aria-label="Loading cities"
          />
        )}

        {compact && (
          <button
            type="button"
            className={styles.dropdownToggle}
            aria-label="Show available cities"
            aria-expanded={open}
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleToggle}
          >
            <ChevronDown
              size={16}
              className={open ? styles.rotated : ""}
            />
          </button>
        )}
      </div>

      {open && (
        <div
          id={resultsId}
          className={styles.dropdown}
        >
          {!query.trim() && (
            <p className={styles.listHeading}>
              Available Cities
            </p>
          )}

          {cities.map((city) => (
            <button
              type="button"
              key={city.id}
              className={styles.cityOption}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => handleSelect(city)}
            >
              <MapPin size={16} aria-hidden="true" />

              <span className={styles.cityDetails}>
                <strong>{city.city}</strong>
                <small>{city.state}</small>
              </span>

              {selectedCity?.id === city.id && (
                <Check
                  size={16}
                  className={styles.selectedMark}
                />
              )}
            </button>
          ))}

          {!loading && error && (
            <p className={styles.empty}>
              Unable to load cities. Please try again.
            </p>
          )}

          {!loading && !error && cities.length === 0 && (
            <p className={styles.empty}>
              No matching cities found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
