import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import styles from "./custom-input.module.css";
const SmartInput = forwardRef(
  (
    {
      checkForTheseErrors = {},
      checkOnBlur = false,
      checkOnFocus = false,
      checkOnValueChange = false,
      defaultValue = "",
      isDisabled,
      isRequired,
      name,
      id,
      placeholder,
      onClick,
      onFocus,
      onBlur,
      onChange,
    },
    ref
  ) => {
    const [fieldValue, setFieldValue] = useState(defaultValue);

    const [errorMessages, setErrorMessages] = useState([]);

    useImperativeHandle(ref, () => ({
      setValue(val) {
        setFieldValue(val);
      },
      getValue() {
        return fieldValue;
      },
      getError() {
        return errorMessages.length > 0;
      },
      checkError() {
        return checkForErrors();
      },
    }));

    const handleBlur = (e) => {
      if (typeof onBlur === "function") {
        onBlur(e);
      }
      if (isRequired && checkOnBlur) {
        checkForErrors();
      }
    };
    const handleFocus = (e) => {
      if (typeof onFocus === "function") {
        onFocus(e);
      }
      if (isRequired && checkOnFocus) {
        checkForErrors();
      }
    };
    const handleClick = (e) => {
      if (typeof onClick === "function") {
        onClick(e);
      }
    };
    const handleChange = (e) => {
      setFieldValue(e.target.value);
      if (typeof onChange === "function") {
        onChange(e);
      }
    };
    useEffect(() => {
      if (isRequired && checkOnValueChange) {
        checkForErrors();
      }
    }, [fieldValue]);

    const checkForErrors = () => {
      const errors = checkForTheseErrors(fieldValue);
      setErrorMessages([...errors]);

      return errors.length > 0;
    };

    return (
      <div className={styles["form-layout-autocomplete"]}>
        <div className={styles["form-textbox"]}>
          <input
            className={`${styles["text-input"]} ${
              errorMessages.length ? styles["is-error"] : ""
            } ${isDisabled ? styles["is-disabled"] : ""} ${
              fieldValue !== "" ? styles["text-input-has-entered"] : ""
            }`}
            name={name}
            value={fieldValue}
            disabled={isDisabled}
            onClick={handleClick}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleChange}
            type="text"
            id={id}
          />
          <label className={styles["placeholder-label"]} aria-hidden="true">
            {isRequired ? "*" + placeholder : placeholder}
          </label>
          {errorMessages.length > 0 && (
            <>
              {errorMessages.map((error, index) => (
                <div
                  className={styles["input-field-message-wrapper"]}
                  key={index + error}
                >
                  <span
                    className={`${styles["input-field-message"]} ${
                      errorMessages.length ? styles["input-field-error"] : ""
                    }`}
                  >
                    {error}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
);
export default SmartInput;
