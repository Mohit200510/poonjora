import React, { createContext, useState } from "react";

export const CityContext = createContext();

export function CityProvider({ children }) {

  const [selectedCity, setSelectedCity] = useState(() => {
    try {
      const savedCity = localStorage.getItem("poonjora-selected-city");

      return savedCity
        ? JSON.parse(savedCity)
        : null;

    } catch {
      return null;
    }
  });


  const updateSelectedCity = (city) => {

    setSelectedCity(city);

    if (city) {
      localStorage.setItem(
        "poonjora-selected-city",
        JSON.stringify(city)
      );
    }

  };


  return (
    <CityContext.Provider
      value={{
        selectedCity,
        setSelectedCity: updateSelectedCity
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export default CityContext;