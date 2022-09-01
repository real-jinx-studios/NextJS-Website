import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
const CountriesContext = createContext({});
export function useCountries() {
  return useContext(CountriesContext);
}
export function CountriesProvider({ children }) {
  const [countries, setCountries] = useLocalStorage("countries", []);
  const [countryGlobal, setCountryGlobal] = useState(null);
  async function getCountries() {
    if (countries.length === 0) {
      const res = await fetch("/api/rest/WebSite/countries", {
        method: "POST",
        body: JSON.stringify({
          LoginToken: "",
        }),
      });
      const data = await res.json();
      let cntris = data.Data.Countries;
      // sort by name
      cntris.sort((a, b) => {
        if (a.Name < b.Name) return -1;
        if (a.Name > b.Name) return 1;
        return 0;
      });
      setCountries(cntris);
      return cntris;
    }
    return countries;
  }
  function getCountry(countryCode) {
    return countries.find((country) => country.Code === countryCode);
  }
  function setCountry(countryCode) {
    setCountryGlobal(getCountry(countryCode));
  }
  return (
    <CountriesContext.Provider
      value={{ countries, getCountries, getCountry, setCountry }}
    >
      {children}
    </CountriesContext.Provider>
  );
}
