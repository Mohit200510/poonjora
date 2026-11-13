
import React, {
  createContext,
  useEffect,
  useState,
} from "react";

export const CityContext = createContext();

export function CityProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    try {
      const savedCity = localStorage.getItem(
        "poonjora-selected-city"
      );

      if (savedCity) {
        setSelectedCity(JSON.parse(savedCity));
      }
    } catch (error) {
      console.error("Unable to restore selected city:", error);
    }
  }, []);

  const updateSelectedCity = (city) => {
    setSelectedCity(city);

    try {
      if (city) {
        localStorage.setItem(
          "poonjora-selected-city",
          JSON.stringify(city)
        );
      } else {
        localStorage.removeItem("poonjora-selected-city");
      }
    } catch (error) {
      console.error("Unable to save selected city:", error);
    }
  };

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        setSelectedCity: updateSelectedCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export default CityContext;
