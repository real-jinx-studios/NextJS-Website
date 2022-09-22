import { useState, useEffect } from "react";
import styles from "./custom-input.module.css";
import { useCountries } from "../../lib/countriesContext";
export default function DropdownCountries({
  disabled,
  children,
  id,
  placeholder,
  isCountry,
  value,
  reference,
  handleChange,
  name,
  isRequired,
  formErrors = {},
  setCountry,
  handleBlur,
}) {
  const [countries, setCountries] = useState([]);
  const { getCountries } = useCountries();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getCountriesCall = async () => {
      const data = await getCountries();
      setCountries(data);
      setIsLoading(false);
      if (value !== "" && typeof setCountry === "function") {
        //find country by name and set it to state
        const country = data.find((country) => country.Name === value);

        if (country) {
          setCountry({
            country: country.Name,
            isVat: country.IsVat || false,
            vat: country.VatRate,
            code: country.Code,
            vatCode: country.VATCode,
            substractVAT: country.SubstractVAT,
          });
        }
      }
    };
    getCountriesCall();
  }, []);

  useEffect(() => {
    console.log(
      "formErrors",
      formErrors,
      reference.current.value,
      name,
      isRequired,
      formErrors[name]
    );
    if (isRequired && !isLoading) {
      setHasError(
        isRequired && formErrors[name] && reference.current.value === ""
      );
      setErrorMessage(formErrors[name]);
    }
  }, [formErrors]);

  const optionsJsx = countries.map((c) => (
    <option
      value={c.Name}
      key={c.Code}
      data-is-vat={c.IsVat}
      data-vat-code={c.VATCode}
      data-vat-percentage={c.VatRate}
      data-substract-vat={c.SubstractVAT}
      data-code={c.Code}
    >
      {c.Name}
    </option>
  ));

  return (
    <div className={styles["form-layout-autocomplete"]}>
      <div className={`${styles["form-textbox"]} `}>
        <select
          className={`${styles["text-input"]} ${styles["dropdown"]} ${
            hasError ? styles["is-error"] : ""
          } ${value !== "" ? styles["text-input-has-entered"] : ""}`}
          value={value || ""}
          ref={reference}
          id={id}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          <option
            value=""
            disabled=""
            data-is-vat="false"
            data-vat-percentage="0"
            data-substract-vat="false"
            data-code=""
          ></option>

          {!isLoading && optionsJsx}
        </select>
        <span className={styles["dropdown-arrow"]} aria-hidden="true"></span>
        <label className={styles["placeholder-label"]} aria-hidden="true">
          {isRequired ? "*" + placeholder : placeholder}
        </label>
        {hasError && (
          <div className={styles["input-field-message-wrapper"]}>
            <span
              className={`${styles["input-field-message"]} ${
                hasError ? styles["input-field-error"] : ""
              }`}
            >
              {errorMessage}
            </span>
          </div>
        )}
      </div>
      <div className={styles["autocomplete"]}></div>
    </div>
  );
}
