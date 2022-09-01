import { useState, useEffect } from "react";
import { useCountries } from "../../lib/countriesContext";

import styles from "./input.module.css";
export default function CustomInputDropdown({
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

  setFormErrors,
}) {
  const [isLoading, setIsLoading] = useState(true);
  if (isCountry === true) {
    const [countries, setCountries] = useState([]);
    const { getCountries } = useCountries();
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
      <div className={styles.input_wrapper}>
        <style jsx>{`
          .error_icon_wrapper {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 3%;
            top: 23px;
            transform: translateY(-50%);
          }
          .error_list_wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding-left: 1rem;
          }
          .error_list {
          }
          .error_list i {
            margin-right: 5px;
            color: var(--clr-neutral-800);
          }
          .error_list_item {
            color: var(--clr-neutral-800);
            font-size: var(--font-size-small);
            margin-bottom: var(--spacing-small);
          }
          .failed {
            color: var(--clr-warn) !important;
          }
        `}</style>
        <select
          className={`${styles.input} ${disabled ? styles.disabled : ""}`}
          value={value || ""}
          ref={reference}
          id={id}
          onChange={handleChange}
        >
          <option
            value=""
            disabled=""
            data-is-vat="false"
            data-vat-percentage="0"
            data-substract-vat="false"
            data-code=""
          >
            Choose your country
          </option>

          {!isLoading && optionsJsx}
        </select>
        <label htmlFor={id} className={styles.input_label}>
          {placeholder}{" "}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
        <div className="error_list_wrapper">
          {formErrors[name] && isRequired && reference.current.value === "" && (
            <ul className="error_list">
              <li className={"error_list_item failed"}>
                <i className="fas fa-times failed"></i>
                Field is required
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.input_wrapper}>
      <style jsx>{`
        .error_icon_wrapper {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 3%;
          top: 23px;
          transform: translateY(-50%);
        }
        .error_list_wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding-left: 1rem;
        }
        .error_list {
        }
        .error_list i {
          margin-right: 5px;
          color: var(--clr-neutral-800);
        }
        .error_list_item {
          color: var(--clr-neutral-800);
          font-size: var(--font-size-small);
          margin-bottom: var(--spacing-small);
        }
        .failed {
          color: var(--clr-warn) !important;
        }
      `}</style>
      <select
        className={`${styles.input} ${disabled ? styles.disabled : ""}`}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option value="" selected="" disabled="">
          Choose your country
        </option>
        {children}
      </select>
      <label htmlFor={id} className={styles.input_label}>
        {placeholder} {isRequired && <span className={styles.required}>*</span>}
      </label>
      <div className="error_list_wrapper">
        {formErrors[name] && isRequired && reference.current.value === "" && (
          <ul className="error_list">
            <li className={"error_list_item failed"}>
              <i className="fas fa-times failed"></i>
              Field is required
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
