import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import styles from "./custom-input.module.css";
import LoaderDots from "../utils/loaderDots";
import sanitizeVAT from "../../lib/sanitizeVAT";
import { cartState, readState } from "../../lib/cartContext";
export default function VatInput(props) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (props.isRequired) {
      setHasError(props.isRequired && props.formErrors[props.name]);
      setErrorMessage(props.formErrors[props.name]);
    }
  }, [props.formErrors]);
  const { dispatch } = cartState();
  const [isVatValid, setIsVatValid] = useState(false);
  const [isVatValidating, setIsVatValidating] = useState(false);
  const [vatValue, setVatValue] = useState(props.default || "");
  const [vatDisabled, setVatDisabled] = useState(
    props.countryReference?.current?.selectedOptions[0]?.dataset?.isVat ===
      "false"
  );

  useEffect(() => {
    if (props.countryReference?.current?.selectedOptions[0]?.dataset?.isVat) {
      setVatDisabled(
        props.countryReference?.current?.selectedOptions[0]?.dataset?.isVat ===
          "false"
      );
    }
  }, [props.countryReference?.current?.selectedOptions[0]?.dataset?.isVat]);

  const handleVatChange = (e) => {
    setVatValue(e.target.value);
  };

  const checkVat = useCallback(
    debounce(async (vatNumber, countryObject) => {
      if (vatNumber !== undefined && vatNumber !== "") {
        const vatValueTemp = sanitizeVAT(vatNumber);

        const response = await fetch("/api/dev/vat", {
          method: "POST",
          body: JSON.stringify({
            vat: vatValueTemp,
            countryCode: countryObject.vatCode,
          }),

          ContentType: "application/json",
        });

        const isValid = await response.json();

        if (isValid?.valid) {
          setIsVatValid(true);
        } else {
          setIsVatValid(false);
        }
        setIsVatValidating(false);
        dispatch({
          type: "SET_VAT",
          payload: {
            vat: {
              isValid: isValid?.valid || false,
              vatNumber: vatValueTemp || "",
            },
          },
        });
        return;
      }
      setIsVatValidating(false);
    }, 500),
    []
  );
  const handleBlur = (e) => {
    if (props.handleBlur) {
      props.handleBlur(e);
    }
  };

  useEffect(() => {
    setIsVatValidating(true);
    checkVat(vatValue, props.country);
  }, [vatValue, props.country]);

  return (
    <div className={styles["form-layout-autocomplete"]}>
      <div className={styles["form-textbox"]}>
        <input
          className={`${styles["text-input"]} ${styles["button-space"]} ${
            hasError ? styles["is-error"] : ""
          } ${vatValue !== "" ? styles["text-input-has-entered"] : ""}   ${
            vatDisabled ? styles["is-disabled"] : ""
          }`}
          name={props.name}
          id={props.id}
          value={!vatDisabled ? vatValue : ""}
          ref={props.reference}
          disabled={
            props.countryReference?.current?.selectedOptions[0]?.dataset
              ?.isVat === "false"
          }
          onClick={props.handleClick}
          onBlur={handleBlur}
          onFocus={props.handleFocus}
          onChange={handleVatChange}
        />
        <label className={styles["placeholder-label"]} aria-hidden="true">
          {props.isRequired ? "*" + props.placeholder : props.placeholder}
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("button clicked");
          }}
          className={styles["button"]}
        >
          {!vatDisabled && isVatValidating && (
            <small className={styles.pending}>
              <LoaderDots size="s" color="warning" />
            </small>
          )}
          {!vatDisabled &&
            isVatValid === false &&
            !isVatValidating &&
            vatValue && <span className={styles.not_valid}>(INVALID)</span>}
          {!vatDisabled &&
            isVatValid === true &&
            !isVatValidating &&
            vatValue && <span className={styles.valid}>(VALID)</span>}
        </button>
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
