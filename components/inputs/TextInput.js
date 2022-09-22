import { useEffect, useState } from "react";
import styles from "./custom-input.module.css";
export default function TextInput(props) {
  const [fieldValue, setFieldValue] = useState(
    props.default || props.value || ""
  );
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (props.isRequired) {
      setHasError(props.isRequired && props.formErrors[props.name]);
      setErrorMessage(props.formErrors[props.name]);
    }
  }, [props.formErrors]);

  const handleBlur = (e) => {
    if (props.handleBlur) {
      props.handleBlur(e);
    }
  };
  useEffect(() => {
    if (props.value) {
      setFieldValue(props.value);
    }
  }, [props.value]);

  return (
    <div className={styles["form-layout-autocomplete"]}>
      <div className={styles["form-textbox"]}>
        <input
          className={`${styles["text-input"]} ${
            hasError ? styles["is-error"] : ""
          } ${props.isDisabled ? styles["is-disabled"] : ""} ${
            fieldValue !== "" ? styles["text-input-has-entered"] : ""
          }`}
          name={props.name}
          ref={props.reference}
          value={props.value}
          defaultValue={props.default}
          disabled={props.isDisabled}
          onClick={props.handleClick}
          onBlur={handleBlur}
          onFocus={props.handleFocus}
          onChange={(e) => {
            setFieldValue(e.target.value);
            if (typeof props.handleChange === "function") {
              props.handleChange(e);
            }
          }}
          type="text"
        />
        <label className={styles["placeholder-label"]} aria-hidden="true">
          {props.isRequired ? "*" + props.placeholder : props.placeholder}
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
